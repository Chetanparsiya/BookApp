package com.unborn.book.bookapp.config;

import io.jsonwebtoken.Claims;
import org.hibernate.annotations.Filter;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JwtTokenFilter extends OncePerRequestFilter {

    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider){
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorizations");
        if(token!=null) {
            try {

                Claims claims = jwtTokenProvider.getClaimsForToken(token);
                if (!claims.getExpiration().before(new Date())) {
                    Authentication authentication = jwtTokenProvider.getAuthentication(claims.getSubject());
                    if (authentication.isAuthenticated()) {
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }


            } catch (Exception e) {
                try {
                    JSONObject jsonObject = new JSONObject();
                    SecurityContextHolder.clearContext();
                    response.setContentType("application/json");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().println(jsonObject.put("exceptions", "Expired or Invalid JWT Token" + e.getMessage()));
                } catch (IOException | JSONException ex) {
                    ex.printStackTrace();
                }
                return;
            }
        }
        filterChain.doFilter(request,response);
    }
}
