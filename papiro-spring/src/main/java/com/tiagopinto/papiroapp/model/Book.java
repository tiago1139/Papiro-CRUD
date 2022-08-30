package com.tiagopinto.papiroapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column
    private String isbn;

    @Column
    private String category;

    @Column
    private int upVote;

    @Column
    private int downVote;

    @Column
    private int rank;

    @Column
    private String cover;
}
