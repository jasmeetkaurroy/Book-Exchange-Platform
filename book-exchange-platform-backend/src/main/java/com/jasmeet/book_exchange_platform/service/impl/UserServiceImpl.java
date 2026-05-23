package com.jasmeet.book_exchange_platform.service.impl;

import com.jasmeet.book_exchange_platform.dto.AuthResponse;
import com.jasmeet.book_exchange_platform.dto.LoginRequest;
import com.jasmeet.book_exchange_platform.dto.RegisterRequest;
import com.jasmeet.book_exchange_platform.entity.User;
import com.jasmeet.book_exchange_platform.exception.ResourceNotFoundException;
import com.jasmeet.book_exchange_platform.repository.UserRepository;
import com.jasmeet.book_exchange_platform.security.JwtService;
import com.jasmeet.book_exchange_platform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    @Override
    public User registerUser(RegisterRequest request){

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .city(request.getCity())
                .role("USER")
                .build();

        return userRepository.save(user);
    }

    @Override
    public AuthResponse loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!matches) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);
    }
}
