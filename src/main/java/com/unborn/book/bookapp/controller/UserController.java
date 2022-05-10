package com.unborn.book.bookapp.controller;

import com.unborn.book.bookapp.config.JwtTokenProvider;
import com.unborn.book.bookapp.datatransferobject.BookDto;
import com.unborn.book.bookapp.datatransferobject.UserDto;
import com.unborn.book.bookapp.entities.Role;
import com.unborn.book.bookapp.entities.User;
import com.unborn.book.bookapp.exceptions.ApiResponse;
import com.unborn.book.bookapp.repository.UserRepository;
import com.unborn.book.bookapp.service.BookService;
import com.unborn.book.bookapp.service.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("api/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping(value = "/regis")
    public ResponseEntity<String> getme(){
        return new ResponseEntity<String>("Chetan", HttpStatus.OK);
    }
    @PostMapping(value="/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public  ResponseEntity<String> register(@RequestBody UserDto userDto){
        JSONObject jsonObject = new JSONObject();
        try{
            UserDto userDto1 = userService.create(userDto);
            if(userDto1!=null){
                jsonObject.put("sucess", "User" + userDto1.getName() + "Saved Succesfully"  );
                return new ResponseEntity<String>(jsonObject.toString(),HttpStatus.OK);
            }

        }catch (JSONException e){
            try {
                jsonObject.put("exception", e.getMessage());
            }catch (JSONException ex){
                ex.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(),HttpStatus.UNAUTHORIZED);
        }
        return null;
    }
    @PostMapping(value="/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
    public  ResponseEntity<String> createAuthenticationToken(@RequestBody UserDto userDto){

        JSONObject jsonObject = new JSONObject();
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getEmail(),userDto.getPassword()));
            if(authentication.isAuthenticated()) {
                jsonObject.put("name", authentication.getName());
                jsonObject.put("authorities", authentication.getAuthorities());
                String email = userDto.getEmail();
                Role role = userRepository.findByEmail(email).getRole();
                jsonObject.put("token", jwtTokenProvider.createToken(email, role));
                return new ResponseEntity<String>(jsonObject.toString(),HttpStatus.OK);
            }

        }catch (JSONException e){
            try {
                jsonObject.put("exception", e.getMessage());
            }catch (JSONException ex){
                ex.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(),HttpStatus.UNAUTHORIZED);
        }
        return null;
    }


}
