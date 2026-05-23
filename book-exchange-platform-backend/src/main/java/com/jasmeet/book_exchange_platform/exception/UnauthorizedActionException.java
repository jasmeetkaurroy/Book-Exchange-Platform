package com.jasmeet.book_exchange_platform.exception;

public class UnauthorizedActionException
        extends RuntimeException {

    public UnauthorizedActionException(String message) {

        super(message);
    }
}