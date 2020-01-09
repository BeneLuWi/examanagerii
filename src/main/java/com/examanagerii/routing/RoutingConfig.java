package com.examanagerii.routing;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RoutingConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/statistics")
                .setViewName("forward:/");

        registry.addViewController("/exams")
                .setViewName("forward:/");

        registry.addViewController("/admin")
                .setViewName("forward:/");

        registry.addViewController("/classes")
                .setViewName("forward:/");

        registry.addViewController("/results")
                .setViewName("forward:/");
    }

}
