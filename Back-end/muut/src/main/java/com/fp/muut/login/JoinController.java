package com.fp.muut.login;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.entity.Customer;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@Controller
@RequiredArgsConstructor
public class JoinController {
	
	private final CustomerRepository customerRepository;
	private final CustomerService loginService;
		
	//회원가입
	@PostMapping("/join")
	public String add(@RequestBody Customer customer) throws IllegalAccessException {
		loginService.join(customer);
		System.out.println(customer);
		return "redirect:/";
	}
	
	//로그인
//	@PostMapping("/login")
//	public String login(@RequestBody Map<String, String> loginData, HttpServletRequest request) {
//		System.out.println(loginData);
//		String customer_id = loginData.get("customer_id");
//		String customer_pw = loginData.get("customer_pw");
//		Customer customer = loginService.login(customer_id, customer_pw);
//	    if(customer == null) {
//	        return "login/loginForm";
//	    }
//	    // 로그인 성공 (세션에 로그인 정보 저장)
//	    HttpSession session = request.getSession();
//	    session.setAttribute("loginMember", customer);
//	    return "redirect:" + redirectURL;
//	}
	
	@PostMapping("/login")
	public Customer login(@RequestBody Map<String, String> loginData) {
		System.out.println(loginData);
		String customer_id = loginData.get("customer_id");
		String customer_pw = loginData.get("customer_pw");
		Customer customer = loginService.login(customer_id, customer_pw);
		if(customer == null) {
			return null;
		}
		System.out.println(customer);
		return customer;
	}
	
	//로그아웃
		@PostMapping("/logout")
			public String logoutV2(HttpServletRequest request) {
				//세션 삭제
				HttpSession session = request.getSession(false);
				if(session != null) {
					session.invalidate();
				}
				return "redirect:/";
			}
	
	//로그인 후 1시간 이내 반응 없을 시 자동로그아웃
		@GetMapping("/home") //
		public String home(HttpSession session) {
		    if (session == null || session.getAttribute("user") == null) {
		        return "redirect:/login";
		    }
		    return "home";
		}
}