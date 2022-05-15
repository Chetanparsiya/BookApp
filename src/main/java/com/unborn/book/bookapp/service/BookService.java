package com.unborn.book.bookapp.service;

import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.datatransferobject.BookResponseDto;
import com.unborn.book.bookapp.entities.Book;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

public interface BookService extends IService<BookDto>, PageSevice<BookResponseDto> {

}
