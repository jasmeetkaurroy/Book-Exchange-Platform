package com.jasmeet.book_exchange_platform.service;

import com.jasmeet.book_exchange_platform.dto.ExchangeRequestResponse;

import java.util.List;

public interface ExchangeRequestService {

    ExchangeRequestResponse sendRequest(Long bookId);

    List<ExchangeRequestResponse> getIncomingRequests();

    List<ExchangeRequestResponse> getMyRequests();

    ExchangeRequestResponse acceptRequest(Long requestId);

    ExchangeRequestResponse rejectRequest(Long requestId);
}