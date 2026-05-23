package com.jasmeet.book_exchange_platform.controller;

import com.jasmeet.book_exchange_platform.dto.AuthResponse;
import com.jasmeet.book_exchange_platform.dto.LoginRequest;
import com.jasmeet.book_exchange_platform.dto.RegisterRequest;
import com.jasmeet.book_exchange_platform.entity.User;
import com.jasmeet.book_exchange_platform.service.UserService;
import com.jasmeet.book_exchange_platform.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {

    private final UserServiceImpl userServiceImpl;

    @PostMapping("/register")
    public User register(@Valid @RequestBody RegisterRequest request) {

        return userServiceImpl.registerUser(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        return userServiceImpl.loginUser(request);
    }
}
