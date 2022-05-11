package com.unborn.book.bookapp.config;

import com.unborn.book.bookapp.datatransferobject.JwtResponse;
import com.unborn.book.bookapp.entities.Role;
import com.unborn.book.bookapp.entities.User;
import com.unborn.book.bookapp.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider implements Serializable {

    private static final long serialVersionUid = 2569800841756370596L;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.Expirations}")
    private long validityInMiliSeconds ;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;
    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public JwtResponse createToken(String username, Role role){
        Claims  claims = Jwts.claims().setSubject(username);
        User user =  userRepository.findByEmail(username);
        claims.put("auth", role.getName());
        Date date = new Date();
        String jws = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime()+validityInMiliSeconds))
                .signWith(
                        SignatureAlgorithm.HS256,
                        secretKey
                )
                .compact();
        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setToken(jws);
        jwtResponse.setExpiryTime(new Date(date.getTime() + validityInMiliSeconds));
        jwtResponse.setGenerateTime(date);
        jwtResponse.setException("");
        jwtResponse.setName(user.getName());
        jwtResponse.setUsername(user.getEmail());
        return jwtResponse;
    }



    public Authentication getAuthentication(String username){
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword() , userDetails.getAuthorities());
    }

    public Claims getClaimsForToken(String token){
       return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }
}
