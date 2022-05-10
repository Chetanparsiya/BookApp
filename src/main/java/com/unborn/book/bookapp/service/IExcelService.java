package com.unborn.book.bookapp.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IExcelService <T> {

    public List<T> importExcel(MultipartFile multipartFile);
}
