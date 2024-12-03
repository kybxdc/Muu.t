package com.fp.muut.login;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fp.muut.entitybak.Customer;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class JoinController {
	
	// 이거 만들어두긴했는데 굳이 필요 없을것 같음
	
	private final CustomerRepository customerRepository;
	
	//@ModelAttribute("member") Member member == model.addAttribute("member",new member);
	@GetMapping("/join")
	public String addForm(@ModelAttribute("customer") Customer customer) {
		return "customer/addMemberForm";
	}
	
	@PostMapping("/join")
	public String add(@ModelAttribute("customer") Customer customer) {
		customerRepository.save(customer);
		return "redirect:/";
	}
	
}
