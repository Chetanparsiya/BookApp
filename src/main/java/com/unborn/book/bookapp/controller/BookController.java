package com.unborn.book.bookapp.controller;

import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.entities.Book;
import com.unborn.book.bookapp.exceptions.ApiResponse;
import com.unborn.book.bookapp.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("api/v1/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;
    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBook(@PathVariable Long id){
        return new ResponseEntity<BookDto>(bookService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<Collection<BookDto>> getBooks(){
        return new ResponseEntity<Collection<BookDto>>(bookService.findAll(), HttpStatus.OK);
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BookDto> createBooks(@RequestBody BookDto bookDto){
        return new ResponseEntity<BookDto>(bookService.create(bookDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BookDto> updateBooks(@RequestBody BookDto bookDto,@PathVariable Long id){
        return new ResponseEntity<BookDto>(bookService.update(bookDto,id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> deleteBook(@PathVariable Long id){
        bookService.delete(id);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Book with id: "+id, true),HttpStatus.OK);
    }
}
