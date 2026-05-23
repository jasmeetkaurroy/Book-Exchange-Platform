package com.jasmeet.book_exchange_platform.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exchange_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //user who requested the exchange
    @ManyToOne
    @JoinColumn(name = "requester_id")
    private User requester;

    //book owner
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    //requested book
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private String status;

    @Column(length = 1000)
    private String message;

}
