package com.jasmeet.book_exchange_platform.dto;

import lombok.Data;

@Data
public class CreateBookRequest {

    private String title;

    private String author;

    private String genre;

    private String description;

    private String bookCondition;
}
