package com.unborn.book.bookapp.controller;

import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.entities.Book;
import com.unborn.book.bookapp.exceptions.ApiResponse;
import com.unborn.book.bookapp.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("api/v1/books")
public class BookController {

    @Autowired
    private BookService bookService;
    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBook(@PathVariable Long id){
        return new ResponseEntity<BookDto>(bookService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Collection<BookDto>> getBooks(){
        return new ResponseEntity<Collection<BookDto>>(bookService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<BookDto> createBooks(@RequestBody BookDto bookDto){
        return new ResponseEntity<BookDto>(bookService.createBook(bookDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDto> updateBooks(@RequestBody BookDto bookDto,@PathVariable Long id){
        return new ResponseEntity<BookDto>(bookService.updateBook(bookDto,id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBook(@PathVariable Long id){
        return new ResponseEntity<ApiResponse>(new ApiResponse("Book with id: "+id, true),HttpStatus.OK);
    }
}
