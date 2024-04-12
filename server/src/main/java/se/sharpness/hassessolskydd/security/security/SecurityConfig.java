package se.sharpness.hassessolskydd.security.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.jsonwebtoken.io.IOException;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${okta.oauth2.issuer}")
    private String issuer;
    @Value("${okta.oauth2.client-id}")
    private String clientId;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
        
                .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/", "/images/**").permitAll()
                    .requestMatchers("/").permitAll()
                    .requestMatchers("/auth/login").permitAll()
                        .anyRequest().authenticated())
                        .csrf(csrf -> csrf.disable())
                    .oauth2ResourceServer(server -> server // Configure OAuth2 Resource Server
                        .jwt(Customizer.withDefaults())
                    ) // Use JWT for token validation
                    .oauth2Login(oauth2 -> oauth2.successHandler(oauth2AuthenticationSuccessHandler()))
                .logout(logout -> logout
                        .addLogoutHandler(logoutHandler()));   
        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler() {
        return (request, response, authentication) -> {
            // Redirect to the root URL upon successful login
            response.sendRedirect("/");
        };
    }
    
    @Bean
    public LogoutHandler logoutHandler() throws IOException {
        return (request, response, authentication) -> {
            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            try {
                response.sendRedirect(issuer + "v2/logout?client_id=" + clientId + "&returnTo=" + baseUrl);
            } catch (IOException e) {
                // Handle the IOException here
                throw new RuntimeException(e); // Or handle it appropriately
            } catch (java.io.IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        };
    }
    
}
//     @Bean
//     public SecurityFilterChain configure(HttpSecurity http) throws Exception {
//         http
//                 .cors(cors -> cors.configurationSource(request -> {
//                     CorsConfiguration corsConfig = new CorsConfiguration();
//                     corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:8080","*")); // Specify allowed origins
//                     corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE")); // Specify allowed methods
//                     corsConfig.setAllowedHeaders(Arrays.asList("*")); // Specify allowed headers
//                     return corsConfig;
//                 }))
//                 // .cors(AbstractHttpConfigurer::disable)
//                 .csrf(csrf -> csrf.disable())
//                 .authorizeHttpRequests(authorize -> authorize
//                         .requestMatchers("/", "/images/**").permitAll()
//                         .requestMatchers("/").permitAll()
//                         .requestMatchers("/auth/login").permitAll()
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
//             } catch (java.io.IOException e) {
//                 // TODO Auto-generated catch block
//                 e.printStackTrace();
//             }
//         };
//     }
// }