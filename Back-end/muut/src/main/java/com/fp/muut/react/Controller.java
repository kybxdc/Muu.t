package com.fp.muut.react;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.entitybak.Customer;
import com.fp.muut.login.CustomerRepository;

@RestController
@RequestMapping("/api")
public class Controller {
	
	private final CustomerRepository customerRepository = new CustomerRepository();
	
	@GetMapping("/greeting")
	public String getGreeting() {
		return "Hi ~~";
	}
	
	@PostMapping("/join")
	public String add(@RequestBody Customer customer) {
		customerRepository.save(customer);
		return "redirect:/";
	}
}
