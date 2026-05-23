package com.jasmeet.book_exchange_platform.service.impl;

import com.jasmeet.book_exchange_platform.dto.CreateBookRequest;
import com.jasmeet.book_exchange_platform.entity.Book;
import com.jasmeet.book_exchange_platform.entity.User;
import com.jasmeet.book_exchange_platform.exception.ResourceNotFoundException;
import com.jasmeet.book_exchange_platform.exception.UnauthorizedActionException;
import com.jasmeet.book_exchange_platform.repository.BookRepository;
import com.jasmeet.book_exchange_platform.repository.UserRepository;
import com.jasmeet.book_exchange_platform.service.BookService;
import com.jasmeet.book_exchange_platform.dto.BookResponse;
import org.springframework.security.core.context.SecurityContextHolder;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jasmeet.book_exchange_platform.dto.UpdateBookRequest;

import java.io.IOException;
import java.util.List;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Override
    public Book addBookWithImage(String title, String author, String genre, String description, String bookCondition, MultipartFile image) {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User owner = userRepository.findByEmail(email)
                .orElseThrow(()->
                        new RuntimeException("User not found"));

        //generate unique file name
        String fileName = System.currentTimeMillis()+"_"+image.getOriginalFilename();

        try {

            Path uploadPath = Paths.get("uploads");

            //create upload directory if not exsists
            if(!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }

            //save image
            Files.copy(image.getInputStream(), uploadPath.resolve(fileName));

            System.out.println(uploadPath.toAbsolutePath());

            System.out.println(
                    uploadPath.resolve(fileName).toAbsolutePath()
            );
        }catch (IOException e){
            throw new RuntimeException("Failed to upload image");
        }

        Book book = Book.builder()
                .title(title)
                .author(author)
                .genre(genre)
                .description(description)
                .bookCondition(bookCondition)
                .availabilityStatus("AVAILABLE")
                .imageUrl(fileName)
                .owner(owner)
                .build();

        return bookRepository.save(book);

    }

    @Override
    public Book addBook(CreateBookRequest request) {

        // Get logged-in user's email
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // Fetch user from database
        User owner = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .genre(request.getGenre())
                .description(request.getDescription())
                .bookCondition(request.getBookCondition())
                .availabilityStatus("AVAILABLE")
                .owner(owner)
                .build();

        return bookRepository.save(book);
    }

    @Override
    public List<BookResponse> getAllBooks() {

        return bookRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public BookResponse getBookById(Long id) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book not found"
                        ));

        return mapToResponse(book);
    }

    @Override
    public void deleteBook(Long id) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book not found"
                        ));

        // Ownership check
        if (!book.getOwner().getId()
                .equals(currentUser.getId())) {

            throw new UnauthorizedActionException(
                    "You can delete only your own books"
            );
        }

        bookRepository.delete(book);
    }

    @Override
    public List<BookResponse> searchBooks(
            String title
    ) {

        return bookRepository
                .findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<Book> filterBooksByGenre(String genre) {

        return bookRepository
                .findByGenreIgnoreCase(genre);
    }

    @Override
    public Page<Book> getBooksWithPagination(
            int page,
            int size
    ) {

        Pageable pageable = PageRequest.of(page, size);

        return bookRepository.findAll(pageable);
    }

    private BookResponse mapToResponse(Book book) {

        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .genre(book.getGenre())
                .description(book.getDescription())
                .bookCondition(book.getBookCondition())
                .availabilityStatus(
                        book.getAvailabilityStatus()
                )
                .imageUrl(book.getImageUrl())
                .ownerName(book.getOwner().getName())
                .ownerEmail(book.getOwner().getEmail())
                .build();
    }

    @Override
    public List<BookResponse> getMyBooks() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return bookRepository
                .findByOwnerEmail(email)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public BookResponse updateBook(Long id, UpdateBookRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found"));

        if (!book.getOwner().getId().equals(currentUser.getId())) {
            throw new UnauthorizedActionException(
                    "You can update only your own books"
            );
        }

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setGenre(request.getGenre());
        book.setDescription(request.getDescription());
        book.setBookCondition(request.getBookCondition());

        Book updatedBook = bookRepository.save(book);

        return mapToResponse(updatedBook);
    }
}