package se.sharpness.hassessolskydd;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {

    registry.addViewController("/{spring:\\w+}").setViewName("forward:/");

    registry.addViewController("/api/**").setViewName("forward:/api");
  }

  // @Override
  // public void addCorsMappings(CorsRegistry registry) {
  //   registry.addMapping("/**")
  //     .allowedOrigins("http://localhost:3000")
  //     .allowedMethods("GET", "POST", "PUT")
  //     .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization")
  //     .allowCredentials(true);
  // }


}
