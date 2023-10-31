package Sharpness.hassessolskydd.security.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import Sharpness.hassessolskydd.security.security.UserPrincipal;

@RestController
@RequiredArgsConstructor
public class HelloController {

    @GetMapping("/hello")
    public String greeting() {
        return "Hello, World!";
    }

    @GetMapping("/secured")
    public String secured(@AuthenticationPrincipal UserPrincipal principal) {
        return "Secured Hello " + principal.getEmail() + " with ID " + principal.getUserId();
    }


}
