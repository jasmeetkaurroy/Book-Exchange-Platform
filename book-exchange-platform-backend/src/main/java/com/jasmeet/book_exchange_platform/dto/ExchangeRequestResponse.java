package com.jasmeet.book_exchange_platform.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExchangeRequestResponse {

    private Long id;

    private String status;

    private String bookTitle;

    private String requesterName;

    private String ownerName;
}