package com.tiagopinto.papiroapp.controller;

import com.tiagopinto.papiroapp.model.Book;
import com.tiagopinto.papiroapp.model.User;
import com.tiagopinto.papiroapp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class UserController {

    private UserRepository userRepository;

    @GetMapping("/users/{name}")
    public Optional<User> getUserByName (@PathVariable String name) {
        return userRepository.findByName(name);
    }

    @GetMapping("/users")
    public List<User> getUsers (){
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser( @RequestBody User user) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userRepository.save(user));
    }
}
