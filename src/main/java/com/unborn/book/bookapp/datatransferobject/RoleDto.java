package com.unborn.book.bookapp.datatransferobject;

import com.unborn.book.bookapp.entities.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;


@Getter
@Setter
public class RoleDto {

    private Long id;

    private String name;

    private Set<User> users;
}
