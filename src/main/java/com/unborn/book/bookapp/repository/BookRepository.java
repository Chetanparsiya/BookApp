package com.unborn.book.bookapp.repository;

import com.unborn.book.bookapp.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long> {
}
