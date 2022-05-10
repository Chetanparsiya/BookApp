package com.unborn.book.bookapp.serviceimpl;

import com.unborn.book.bookapp.entities.User;
import com.unborn.book.bookapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new UsernameNotFoundException("Email "+ email+ "Not Found");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),getGrantedAuthoriy(user));
    }

    private Collection<GrantedAuthority> getGrantedAuthoriy(User user){
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        if(user.getRole().getName().equalsIgnoreCase(("admin"))){
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }
}
