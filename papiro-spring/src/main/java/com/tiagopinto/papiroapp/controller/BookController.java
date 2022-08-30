package com.tiagopinto.papiroapp.controller;

import com.tiagopinto.papiroapp.model.Book;
import com.tiagopinto.papiroapp.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class BookController {

    private BookRepository bookRepository;

    @GetMapping("/books")
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @GetMapping("/book/{id}")
    public Optional<Book> getBook(@PathVariable Long id) {
        return bookRepository.findById(id);
    }

}
