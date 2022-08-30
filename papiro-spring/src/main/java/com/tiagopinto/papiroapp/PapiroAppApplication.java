package com.tiagopinto.papiroapp;

import com.tiagopinto.papiroapp.model.Book;
import com.tiagopinto.papiroapp.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PapiroAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(PapiroAppApplication.class, args);
	}

	@Bean
	CommandLineRunner initDataBase(BookRepository bookRepository) {
		return args -> {
			bookRepository.deleteAll();

			for (int i = 0; i < 20; i++) {
				Book b = new Book();
				b.setTitle("Book "+i);
				b.setAuthor("Tiago");
				b.setCover("https://angularforms.dev/assets/images/angular-form-essentials-book.png");

				bookRepository.save(b);
			}


		};
	}

}
