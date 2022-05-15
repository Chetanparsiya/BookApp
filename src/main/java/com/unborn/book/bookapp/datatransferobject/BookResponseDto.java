package com.unborn.book.bookapp.datatransferobject;

import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
public class BookResponseDto {
    private Collection<BookDto> content;

    private int pageNumber;

    private int pageSize;

    private Long totalElements;

    private int totalPages;

    private boolean isLastPage;
}
