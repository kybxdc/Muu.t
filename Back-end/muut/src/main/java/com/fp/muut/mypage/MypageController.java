package com.fp.muut.mypage;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.entity.Customer;
import com.fp.muut.login.CustomerRepository;
import com.fp.muut.login.CustomerService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mypage")
@Controller
@RequiredArgsConstructor
public class MypageController {

	@Autowired
	private MypageService mypagesevice;
	private CustomerRepository customerRepository;
	
	//회원 정보 조회
	@GetMapping("/customer")
	public Customer getCustomer(HttpSession session) {
		Customer loginCustomer = (Customer) session.getAttribute("loginCustomer");
		String customer_id = loginCustomer.getCustomer_id();
		return mypagesevice.getCustomer(customer_id);
	}
	
	//회원정보변경
	@PostMapping("/update")
	public Customer updateCustomer(@RequestBody Map<String, String> updatedData, HttpServletRequest request) {
		
		Customer customer =
		mypagesevice.updateCustomer(updatedData, request);
		if (customer != null) {
	        // 세션 업데이트: 수정된 정보로 세션에 저장
	        HttpSession session = request.getSession();
	        session.setAttribute("loginCustomer", customer);
	        return customer;
	    } else {
	        return null;
	    }
	}
	
}