package com.unborn.book.bookapp.service;

import java.util.Collection;

public interface PageSevice <T>{

    T findAll(int pageSize, int pageNumber,String sortBy, String sortDir);
}
