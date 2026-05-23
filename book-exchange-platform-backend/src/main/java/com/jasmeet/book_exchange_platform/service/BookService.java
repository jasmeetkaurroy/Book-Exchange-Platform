package com.jasmeet.book_exchange_platform.service;

import com.jasmeet.book_exchange_platform.dto.CreateBookRequest;
import com.jasmeet.book_exchange_platform.dto.UpdateBookRequest;
import com.jasmeet.book_exchange_platform.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import com.jasmeet.book_exchange_platform.dto.BookResponse;

import java.util.List;

public interface BookService {

    Book addBookWithImage(
            String title,
            String author,
            String genre,
            String description,
            String bookCondition,
            MultipartFile image
    );

    Book addBook(CreateBookRequest request);

    List<BookResponse> getAllBooks();

    BookResponse getBookById(Long id);

    void deleteBook(Long id);

    List<BookResponse> searchBooks(String title);

    List<Book> filterBooksByGenre(String genre);

    Page<Book> getBooksWithPagination(int page, int size);

    List<BookResponse> getMyBooks();

    BookResponse updateBook(Long id, UpdateBookRequest request);
}