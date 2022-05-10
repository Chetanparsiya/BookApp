package com.unborn.book.bookapp.config;

import com.unborn.book.bookapp.entities.Role;
import com.unborn.book.bookapp.serviceimpl.UserDetailsServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider implements Serializable {

    private static final long serialVersionUid = 2569800841756370596L;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.Expirations}")
    private long validityInMiliSeconds ;

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String username, Role role){
        Claims  claims = Jwts.claims().setSubject(username);
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


        return jws;
    }

    @Autowired
    private UserDetailsService userDetailsService;

    public Authentication getAuthentication(String username){
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword() , userDetails.getAuthorities());
    }

    public Claims getClaimsForToken(String token){
       return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }
}
