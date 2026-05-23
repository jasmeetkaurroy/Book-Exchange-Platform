package com.jasmeet.book_exchange_platform.repository;

import com.jasmeet.book_exchange_platform.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository
        extends JpaRepository<Book, Long> {

    // Search by title
    List<Book> findByTitleContainingIgnoreCase(String title);

    // Filter by genre
    List<Book> findByGenreIgnoreCase(String genre);

    // Pagination
    Page<Book> findAll(Pageable pageable);

    List<Book> findByOwnerEmail(String email);
}