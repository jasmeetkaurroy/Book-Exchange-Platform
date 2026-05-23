package com.jasmeet.book_exchange_platform.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookResponse {

    private Long id;

    private String title;

    private String author;

    private String genre;

    private String description;

    private String bookCondition;

    private String availabilityStatus;

    private String imageUrl;

    private String ownerName;

    private String ownerEmail;
}
