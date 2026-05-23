package com.jasmeet.book_exchange_platform.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String genre;

    @Column(length = 1000)
    private String description;

    private String bookCondition;

    private String availabilityStatus;

    // Relationship with User
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    private String imageUrl;
}
