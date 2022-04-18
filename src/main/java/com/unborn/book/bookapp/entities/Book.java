package com.unborn.book.bookapp.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@Entity
@NoArgsConstructor
public class Book {
    private Long id;
    private String title;
    private String author;
    private String coverPhotoUrl;
    private Long isbnNumber;
    private Double price;
    private String language;
}
