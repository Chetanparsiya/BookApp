package com.unborn.book.bookapp.service;

import com.unborn.book.bookapp.entities.Book;

import java.util.Collection;

public interface BookService {
    Collection<Book> findAll();

    Book findById();

    Book createBook();

    Book updateBook();

    void deleteBook();
}
