package com.unborn.book.bookapp;

import com.unborn.book.bookapp.entities.Role;
import com.unborn.book.bookapp.entities.User;
import com.unborn.book.bookapp.repository.BookRepository;
import com.unborn.book.bookapp.repository.RoleRepository;
import com.unborn.book.bookapp.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BookappApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BookRepository bookRepository;
	public static void main(String[] args) {
		SpringApplication.run(BookappApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper(){
		return  new ModelMapper();
	}


	@Override
	public void run(String... args) throws Exception {
		Role role = new Role();
		role.setName("admin");
		roleRepository.save(role);

		User user1= new User();
		user1.setRole(roleRepository.findById(1L).orElse(null));
		user1.setEmail("chetan@gmail.com");
		user1.setPassword(new BCryptPasswordEncoder().encode("chetan"));
		user1.setName("Chetan");
		user1.setContact("231231");
		userRepository.save(user1);

		User user2= new User();
		user1.setRole(roleRepository.findById(1L).orElse(null));
		user1.setEmail("chetanp@gmail.com");
		user1.setPassword(new BCryptPasswordEncoder().encode("chetan1"));
		user1.setName("Chetan P");
		user1.setContact("2312321");
		userRepository.save(user2);



	}
}
