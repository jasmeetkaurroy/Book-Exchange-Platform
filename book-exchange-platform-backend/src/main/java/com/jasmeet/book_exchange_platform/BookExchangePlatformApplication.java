package com.jasmeet.book_exchange_platform;

import org.hibernate.boot.jaxb.SourceType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookExchangePlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookExchangePlatformApplication.class, args);

        System.out.println("hello jassi");
	}


}
