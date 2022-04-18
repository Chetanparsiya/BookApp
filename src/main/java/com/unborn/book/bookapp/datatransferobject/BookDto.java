package com.unborn.book.bookapp.datatransferobject;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookDto {
    private Long id;
    private String title;
    private String author;
    private String coverPhotoUrl;
    private Long isbnNumber;
    private Double price;
    private String language;
}
