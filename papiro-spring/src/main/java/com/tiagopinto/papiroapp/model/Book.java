package com.tiagopinto.papiroapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Column(nullable = false)
    @JsonProperty("title")
    private String title;

    @JsonProperty("author")
    @Column(nullable = false)
    private String author;

    @JsonProperty("isbn")
    @Column
    private String isbn;

    @JsonProperty("categories")
    @Column
    private String[] categories;


    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "book-ratings")
    private List<Rating> ratings = new ArrayList<>();



    @JsonProperty("rank")
    @Column(columnDefinition = "double default 0.0")
    private Double rank;

    @JsonProperty("cover")
    @Column(nullable = false)
    private String cover;
}
