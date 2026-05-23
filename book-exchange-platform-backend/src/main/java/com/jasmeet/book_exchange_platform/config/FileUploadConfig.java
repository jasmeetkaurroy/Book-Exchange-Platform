package com.jasmeet.book_exchange_platform.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class FileUploadConfig
        implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry
    ) {

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations( "file:///C:/Users/JassiArshu/OneDrive/Documents/SpringBoot/book-exchange-platform/book-exchange-platform-backend/uploads/"
                );
    }
}
