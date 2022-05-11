package com.unborn.book.bookapp.datatransferobject;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private Date generateTime;
    private String username;
    private String name;
    private Date expiryTime;
    private String exception;
}
