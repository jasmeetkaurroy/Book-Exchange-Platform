package com.jasmeet.book_exchange_platform.controller;

import com.jasmeet.book_exchange_platform.dto.ExchangeRequestResponse;
import com.jasmeet.book_exchange_platform.service.ExchangeRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exchange")
@RequiredArgsConstructor
public class ExchangeRequestController {

    private final ExchangeRequestService exchangeRequestService;

    @PostMapping("/request/{bookId}")
    public ExchangeRequestResponse sendRequest(
            @PathVariable Long bookId
    ) {

        return exchangeRequestService.sendRequest(bookId);
    }

    @GetMapping("/incoming")
    public List<ExchangeRequestResponse> getIncomingRequests() {

        return exchangeRequestService.getIncomingRequests();
    }

    @GetMapping("/my-requests")
    public List<ExchangeRequestResponse> getMyRequests() {

        return exchangeRequestService.getMyRequests();
    }

    @PutMapping("/accept/{requestId}")
    public ExchangeRequestResponse acceptRequest(
            @PathVariable Long requestId
    ) {

        return exchangeRequestService.acceptRequest(requestId);
    }

    @PutMapping("/reject/{requestId}")
    public ExchangeRequestResponse rejectRequest(
            @PathVariable Long requestId
    ) {

        return exchangeRequestService.rejectRequest(requestId);
    }
}