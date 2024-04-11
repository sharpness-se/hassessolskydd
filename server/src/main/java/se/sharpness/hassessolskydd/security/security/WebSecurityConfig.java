// package se.sharpness.hassessolskydd.security.security;

// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// @RequiredArgsConstructor
// public class WebSecurityConfig {



//     @Bean
//     public SecurityFilterChain applicationSecurity(HttpSecurity http) throws Exception {
       

//         http
//           .cors(AbstractHttpConfigurer::disable)
//           .csrf(AbstractHttpConfigurer::disable)
//           .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//           .formLogin(AbstractHttpConfigurer::disable)
//           .securityMatcher("/auth/**") // TODO: Change to /** when auth is implemented correctly
//           .authorizeHttpRequests(registry -> registry
//             .requestMatchers("/").permitAll()
//             //.requestMatchers("/api/customerId/**/").permitAll()
//             //.requestMatchers("/api/customerNumber/**/").permitAll()
//             .requestMatchers("/public/**").permitAll()
//             .requestMatchers("/hello/**").permitAll()
//             .requestMatchers("/auth/login").permitAll()
//             .requestMatchers("/api/order-items").permitAll()
//             .requestMatchers("/admin").hasRole("ADMIN")
//             .anyRequest().authenticated()
//           );
//         return http.build();
//     }

//    /* @Bean
//     public SecurityFilterChain applicationSecurity(HttpSecurity http) throws Exception {
//         http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//         http
//             .cors(AbstractHttpConfigurer::disable)
//             .csrf(AbstractHttpConfigurer::disable)
//             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .formLogin(AbstractHttpConfigurer::disable)
//             .securityMatcher("/**")
//             .authorizeHttpRequests(auth -> auth
//                     .requestMatchers("/").permitAll()
//                     .requestMatchers("/auth/login").permitAll()
//                     .anyRequest().authenticated()
//     );
//         return http.build();
//     } */
//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

   
// }