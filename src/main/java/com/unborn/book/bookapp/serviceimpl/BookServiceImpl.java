package com.unborn.book.bookapp.serviceimpl;

import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.entities.Book;
import com.unborn.book.bookapp.exceptions.ResourceNotFoundException;
import com.unborn.book.bookapp.helper.ExcelHelper;
import com.unborn.book.bookapp.repository.BookRepository;
import com.unborn.book.bookapp.service.BookService;
import com.unborn.book.bookapp.service.IExcelService;
import com.unborn.book.bookapp.service.IService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public Collection<BookDto> findAll() {
        Collection<Book> books = bookRepository.findAll();
        Collection<BookDto> bookDtos = books.stream().map(book -> bookToBookDto(book)).collect(Collectors.toList());
        return bookDtos;
    }

    @Override
    public BookDto findById(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Book", "Book Id", id));
        return bookToBookDto(book);

    }

    @Override
    public BookDto create(BookDto bookDto) {
        Book book = bookDtoToBook(bookDto);
        Book createdBook = bookRepository.save(book);
        return  bookToBookDto(createdBook);
    }

    @Override
    public BookDto update(BookDto bookDto, Long id) {
        Book book = bookRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Book", "Book Id", id));
        book.setAuthor(bookDto.getAuthor());
        book.setTitle(bookDto.getTitle());
        book.setCoverPhotoUrl(bookDto.getCoverPhotoUrl());
        book.setLanguage(bookDto.getLanguage());
        book.setPrice(bookDto.getPrice());
        book.setIsbnNumber(bookDto.getIsbnNumber());
        bookRepository.save(book);
        return bookToBookDto(book);
    }

    @Override
    public void delete(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Book", "Book Id", id));
        bookRepository.deleteById(id);
    }


    public BookDto bookToBookDto(Book book){
        return modelMapper.map(book,BookDto.class);
    }

    public Book bookDtoToBook(BookDto bookDto){
        return modelMapper.map(bookDto, Book.class);
    }
}
