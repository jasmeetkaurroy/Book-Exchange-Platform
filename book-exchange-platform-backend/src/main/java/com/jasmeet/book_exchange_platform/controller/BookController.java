package com.jasmeet.book_exchange_platform.controller;

import com.jasmeet.book_exchange_platform.dto.BookResponse;
import com.jasmeet.book_exchange_platform.dto.CreateBookRequest;
import com.jasmeet.book_exchange_platform.dto.UpdateBookRequest;
import com.jasmeet.book_exchange_platform.entity.Book;
import com.jasmeet.book_exchange_platform.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping
    public Book addBook(@RequestBody CreateBookRequest request) {
        return bookService.addBook(request);
    }

    @GetMapping
    public List<BookResponse> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/search")
    public List<BookResponse> searchBooks(@RequestParam String title) {
        return bookService.searchBooks(title);
    }

    @GetMapping("/filter")
    public List<Book> searchBooksByGenre(@RequestParam String genre) {
        return bookService.filterBooksByGenre(genre);
    }

    @GetMapping("/paged")
    public Page<Book> getBooksWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return bookService.getBooksWithPagination(page, size);
    }

    @PostMapping("/upload")
    public Book uploadBook(
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam String genre,
            @RequestParam String description,
            @RequestParam String bookCondition,
            @RequestParam MultipartFile image
    ) {
        return bookService.addBookWithImage(
                title,
                author,
                genre,
                description,
                bookCondition,
                image
        );
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return "Book deleted successfully";
    }

    @GetMapping("/my-books")
    public List<BookResponse> getMyBooks() {
        return bookService.getMyBooks();
    }

    @PutMapping("/{id}")
    public BookResponse updateBook(
            @PathVariable Long id,
            @RequestBody UpdateBookRequest request
    ) {
        return bookService.updateBook(id, request);
    }

    @GetMapping("/{id}")
    public BookResponse getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

}