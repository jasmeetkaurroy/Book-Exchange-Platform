package com.jasmeet.book_exchange_platform.service.impl;

import com.jasmeet.book_exchange_platform.dto.ExchangeRequestResponse;
import com.jasmeet.book_exchange_platform.entity.Book;
import com.jasmeet.book_exchange_platform.entity.ExchangeRequest;
import com.jasmeet.book_exchange_platform.entity.User;
import com.jasmeet.book_exchange_platform.exception.ResourceNotFoundException;
import com.jasmeet.book_exchange_platform.exception.UnauthorizedActionException;
import com.jasmeet.book_exchange_platform.repository.BookRepository;
import com.jasmeet.book_exchange_platform.repository.ExchangeRequestRepository;
import com.jasmeet.book_exchange_platform.repository.UserRepository;
import com.jasmeet.book_exchange_platform.service.ExchangeRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExchangeRequestServiceImpl implements ExchangeRequestService {

    private final ExchangeRequestRepository exchangeRequestRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public ExchangeRequestResponse sendRequest(Long bookId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User requester = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Book not found"));

        boolean alreadyRequested =
                exchangeRequestRepository
                        .existsByRequesterIdAndBookIdAndStatus(
                                requester.getId(),
                                book.getId(),
                                "PENDING"
                        );

        if (alreadyRequested) {
            throw new RuntimeException(
                    "You already have a pending request for this book"
            );
        }

        if (book.getOwner().getId().equals(requester.getId())) {
            throw new UnauthorizedActionException(
                    "You cannot request your own book"
            );
        }

        ExchangeRequest request = ExchangeRequest.builder()
                .requester(requester)
                .owner(book.getOwner())
                .book(book)
                .status("PENDING")
                .build();

        ExchangeRequest savedRequest =
                exchangeRequestRepository.save(request);

        return mapToResponse(savedRequest);
    }

    @Override
    public List<ExchangeRequestResponse> getIncomingRequests() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return exchangeRequestRepository
                .findByOwnerEmail(email)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ExchangeRequestResponse> getMyRequests() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return exchangeRequestRepository
                .findByRequesterEmail(email)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ExchangeRequestResponse acceptRequest(Long requestId) {

        User currentUser = getCurrentUser();

        ExchangeRequest request = exchangeRequestRepository
                .findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Request not found"));

        if (!request.getOwner().getId().equals(currentUser.getId())) {
            throw new UnauthorizedActionException(
                    "Only book owner can accept this request"
            );
        }

        request.setStatus("ACCEPTED");

        Book book = request.getBook();
        book.setAvailabilityStatus("UNAVAILABLE");
        bookRepository.save(book);

        ExchangeRequest savedRequest =
                exchangeRequestRepository.save(request);

        return mapToResponse(savedRequest);
    }

    @Override
    public ExchangeRequestResponse rejectRequest(Long requestId) {

        User currentUser = getCurrentUser();

        ExchangeRequest request = exchangeRequestRepository
                .findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Request not found"));

        if (!request.getOwner().getId().equals(currentUser.getId())) {
            throw new UnauthorizedActionException(
                    "Only book owner can reject this request"
            );
        }

        request.setStatus("REJECTED");

        ExchangeRequest savedRequest =
                exchangeRequestRepository.save(request);

        return mapToResponse(savedRequest);
    }

    private User getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    private ExchangeRequestResponse mapToResponse(
            ExchangeRequest request
    ) {

        return ExchangeRequestResponse.builder()
                .id(request.getId())
                .status(request.getStatus())
                .bookTitle(request.getBook().getTitle())
                .requesterName(request.getRequester().getName())
                .ownerName(request.getOwner().getName())
                .build();
    }
}