package com.auction.controller;

import com.auction.model.User;
import com.auction.security.JwtUtil;
import com.auction.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User u = service.login(user.getUsername(), user.getPassword());
        return jwtUtil.generateToken(u.getUsername(), u.getRole());
    }

}