package com.finalproject.mainpage.react;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Controller {
	
	@GetMapping("/greeting")
	public String getGreeting() {
		return "Hi ~~";
	}
}
