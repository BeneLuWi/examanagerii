package com.examanagerii.routing;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RoutingConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/edit")
                .setViewName("forward:/");

        registry.addViewController("/statistics")
                .setViewName("forward:/");

        registry.addViewController("/students")
                .setViewName("forward:/");

        registry.addViewController("/exams")
                .setViewName("forward:/");

        registry.addViewController("/user")
                .setViewName("forward:/");

        registry.addViewController("/admin")
                .setViewName("forward:/");

        registry.addViewController("/class")
                .setViewName("forward:/");
    }

}
