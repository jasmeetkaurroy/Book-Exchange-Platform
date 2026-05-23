package com.jasmeet.book_exchange_platform.repository;

import com.jasmeet.book_exchange_platform.entity.ExchangeRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeRequestRepository extends JpaRepository<ExchangeRequest, Long> {

    List<ExchangeRequest> findByOwnerEmail(String email);

    List<ExchangeRequest> findByRequesterEmail(String email);

    boolean existsByRequesterIdAndBookIdAndStatus(
            Long requesterId,
            Long bookId,
            String status
    );
}
