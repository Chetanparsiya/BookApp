package com.unborn.book.bookapp.service;

import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.entities.Book;

import java.util.Collection;

public interface BookService {
    Collection<BookDto> findAll();

    BookDto findById();

    BookDto createBook();

    BookDto updateBook();

    void deleteBook();
}
