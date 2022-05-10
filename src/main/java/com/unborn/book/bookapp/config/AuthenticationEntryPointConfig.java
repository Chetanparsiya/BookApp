package com.unborn.book.bookapp.config;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class AuthenticationEntryPointConfig extends BasicAuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        JSONObject  jsonObject = new JSONObject();
       try {
           response.addHeader("WWW-Authenticate", "Basic Realm "+ getRealmName() );
           response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
           response.setContentType("application/json");
           response.getWriter().println(jsonObject.put("exception","HTTP Status 401 -" + authException.getMessage()));
       }catch (JSONException e){
           e.printStackTrace();

       }

    }

    @Override
    public void afterPropertiesSet() {
        setRealmName("Unborn");
        super.afterPropertiesSet();
    }
}
