package com.jasmeet.book_exchange_platform.service;

import com.jasmeet.book_exchange_platform.dto.AuthResponse;
import com.jasmeet.book_exchange_platform.dto.LoginRequest;
import com.jasmeet.book_exchange_platform.dto.RegisterRequest;
import com.jasmeet.book_exchange_platform.entity.User;

public interface UserService {

     User registerUser(RegisterRequest request);

     AuthResponse loginUser(LoginRequest request);
}
