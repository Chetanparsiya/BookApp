package com.unborn.book.bookapp.serviceimpl;

import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.datatransferobject.UserDto;
import com.unborn.book.bookapp.entities.Book;
import com.unborn.book.bookapp.entities.User;
import com.unborn.book.bookapp.exceptions.ResourceNotFoundException;
import com.unborn.book.bookapp.repository.RoleRepository;
import com.unborn.book.bookapp.repository.UserRepository;
import com.unborn.book.bookapp.service.UserService;
import org.modelmapper.ModelMapper;
import com.unborn.book.bookapp.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired ModelMapper modelMapper;
    @Override
    public Collection<UserDto> findAll() {
        Collection<User> users = userRepository.findAll();
        Collection<UserDto> userDtos = users.stream().map(user -> userToUserDto(user)).collect(Collectors.toList());
        return userDtos;
    }

    @Override
    public UserDto findById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User" , "User ID", id));
        return userToUserDto(user);
    }

    @Override
    public UserDto create(UserDto userDto) {
        User user = userDtoToUser(userDto);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRole(roleRepository.findById(1L).orElseThrow(null));
        User createdUser = userRepository.saveAndFlush(user);
        return userToUserDto(createdUser);
    }

    @Override
    public UserDto update(UserDto userDto, Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User" , "User ID", id));
        user.setContact(userDto.getContact());
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());

        userRepository.save(user);
        return userToUserDto(user);
    }

    @Override
    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User" , "User ID", id));
        userRepository.deleteById(id);
    }

    public UserDto userToUserDto(User user){
        return modelMapper.map(user,UserDto.class);
    }

    public User userDtoToUser(UserDto userDto){
        return modelMapper.map(userDto, User.class);
    }
}
