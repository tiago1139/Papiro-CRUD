package com.tiagopinto.papiroapp.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiagopinto.papiroapp.exceptions.ResourceNotFoundException;
import com.tiagopinto.papiroapp.model.Book;
import com.tiagopinto.papiroapp.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@CrossOrigin("http://localhost:4200")
public class BookController {

    private static String imagePath = ".."+ File.separator + ".." + File.separator+
                                        ".." + File.separator+
                                        "resources"+ File.separator + "images";
    private BookRepository bookRepository;

    @GetMapping("/books")
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @GetMapping("/book/{id}")
    public Optional<Book> getBook(@PathVariable Long id) {
        return bookRepository.findById(id);
    }



    @PostMapping(value = "/books", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Book> createBook(@RequestParam("cover") MultipartFile file,
                                           @RequestParam("book") String book) throws JsonProcessingException {

        Book b = new ObjectMapper().readValue(book, Book.class);

        Path test = Paths.get("src/main/resources/images").toAbsolutePath();
        System.out.println(test);

        System.out.println(b.getTitle());
        System.out.println(b.getAuthor());
        System.out.println(b.getIsbn());

        try {
            if(!file.isEmpty()) {
                byte[] bytes = file.getBytes();
                Path currentDir = Paths.get(".");
                String temp = Paths.get("src/main/resources/images").toAbsolutePath().toString();
                long rows = bookRepository.findLastId();
                System.out.println(rows);

                Path path = Paths.get(temp+File.separator
                        +String.valueOf(rows+1)+"_cover.jpg");


                Files.write(path, bytes);

                File f = new File(String.valueOf(path));

                String imageUrl = "http://localhost:8080/api/images"+File.separator
                        +String.valueOf(rows+1)+"_cover.jpg";

                b.setCover(imageUrl);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookRepository.save(b));
    }
    @PutMapping("/book/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book) throws ResourceNotFoundException {

        Book b = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + id));



        return ResponseEntity.status(HttpStatus.OK)
                .body(bookRepository.save(book));
    }

    @DeleteMapping("/book/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {

        bookRepository.deleteById(id);

        return ResponseEntity.noContent().build();

    }
}
