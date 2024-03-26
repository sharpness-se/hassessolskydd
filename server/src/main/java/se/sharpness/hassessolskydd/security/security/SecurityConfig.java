// package se.sharpness.hassessolskydd.security.security;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
// import org.springframework.security.web.authentication.logout.LogoutHandler;
// import org.springframework.web.servlet.support.ServletUriComponentsBuilder;



// import java.io.IOException;

// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Value("${okta.oauth2.issuer}")
//     private String issuer;
//     @Value("${okta.oauth2.client-id}")
//     private String clientId;

//     @Bean
//     public SecurityFilterChain configure(HttpSecurity http) throws Exception {
//         http
//                 .authorizeHttpRequests(authorize -> authorize
//                         .requestMatchers("/", "/images/**").permitAll()
//                         .requestMatchers("/").permitAll()
//                         .anyRequest().authenticated())
//                 .oauth2Login(oauth2 -> oauth2.successHandler(oauth2AuthenticationSuccessHandler()))
//                 .logout(logout -> logout
//                         .addLogoutHandler(logoutHandler()));

//         return http.build();
//     }
//         private AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler() {
//         return (request, response, authentication) -> {
//             // Redirect to the root URL upon successful login
//             response.sendRedirect("/");
//         };
//     }

//     private LogoutHandler logoutHandler() {
//         return (request, response, authentication) -> {
//             try {
//                 String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
//                 response.sendRedirect(issuer + "v2/logout?client_id=" + clientId + "&returnTo=" + baseUrl);
//             } catch (IOException e) {
//                 throw new RuntimeException(e);
//             }
//         };
//     }
// }