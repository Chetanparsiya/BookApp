package com.unborn.book.bookapp.service;

import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.entities.Book;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

public interface BookService {
    Collection<BookDto> findAll();

    BookDto findById(Long id);

    BookDto createBook(BookDto bookDto);

    BookDto updateBook(BookDto bookDto, Long id);

    void deleteBook(Long id);

    Collection<BookDto> importExcel(MultipartFile file);
}
