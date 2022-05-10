package com.unborn.book.bookapp.serviceimpl;

import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.datatransferobject.RoleDto;
import com.unborn.book.bookapp.datatransferobject.UserDto;
import com.unborn.book.bookapp.entities.Book;
import com.unborn.book.bookapp.entities.Role;
import com.unborn.book.bookapp.entities.User;
import com.unborn.book.bookapp.exceptions.ResourceNotFoundException;
import com.unborn.book.bookapp.repository.RoleRepository;
import com.unborn.book.bookapp.service.IService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements IService<RoleDto> {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Collection<RoleDto> findAll() {
        Collection<Role> roles = roleRepository.findAll();
        Collection<RoleDto> roleDtos = roles.stream().map(role -> roleToRoleDto(role)).collect(Collectors.toList());
        return roleDtos;
    }

    @Override
    public RoleDto findById(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role" , "Role ID", id));
        return roleToRoleDto(role);
    }

    @Override
    public RoleDto create(RoleDto roleDto) {
        Role role = roleRepository.save(roleDtoToRole(roleDto));
        return roleToRoleDto(role);
    }

    @Override
    public RoleDto update(RoleDto roleDto, Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role" , "Role ID", id));
        role.setName(roleDto.getName());
        return roleToRoleDto(role);
    }

    @Override
    public void delete(Long id) {
        Role role = roleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role" , "Role ID", id));
        roleRepository.deleteById(id);
    }
    public RoleDto roleToRoleDto(Role role){
        return modelMapper.map(role, RoleDto.class);
    }

    public Role roleDtoToRole(RoleDto roleDto){
        return modelMapper.map(roleDto, Role.class);
    }
}
