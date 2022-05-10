package com.unborn.book.bookapp.service;

import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.datatransferobject.RoleDto;

import java.util.Collection;

public interface IService <T>{
    Collection<T> findAll();

    T findById(Long id);

    T create(T t);

    T update(T t, Long id);

    void delete(Long id);
}
