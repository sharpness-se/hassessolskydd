package se.sharpness.hassessolskydd.security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        // Construct the Auth0 authorization URL with necessary parameters
        
        String authUrl = "https://dev-8jl4nya4dzypdch8.eu.auth0.com/authorize" +
                "?response_type=code" +
                "&client_id=ZhDpd21sxSf0jK476c3F6GgqdsajQGav" +
                "&scope=profile email openid" +
                "&state=my_state" +
                "&redirect_uri=" + URLEncoder.encode("http://localhost:8080/", "UTF-8") +
                "&scope=openid%20profile%20email"+
                "&nonce=alsdfnöoaewnlkjandsvöiubaewi";

        // Redirect the user's browser to the Auth0 authorization URL
        response.sendRedirect(authUrl);
    }

    @GetMapping("/callback")
    public String callback(@RequestParam("code") String code) {
        // Handle the callback from Auth0 after authentication
        // Here you can exchange the authorization code for an access token
        // and perform any necessary authentication-related tasks
        System.out.println("Authorization Code "+code);
        return "redirect:/"; // Redirect to a success page or dashboard
    }
}