package com.unborn.book.bookapp.datatransferobject;

import com.unborn.book.bookapp.entities.Role;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String Name;
    private String email;
    private String password;
    private String contact;
    private Role role;
}
