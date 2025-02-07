package com.gli.clic;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/")
public class MainController {
    
    @GetMapping
    public String getMain() {
        return "Welcome to main application";
    }
    
}
