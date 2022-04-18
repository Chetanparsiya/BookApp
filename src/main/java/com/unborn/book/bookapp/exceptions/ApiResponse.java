package com.unborn.book.bookapp.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class ApiResponse {

    private String message;
    private Boolean success;

}
