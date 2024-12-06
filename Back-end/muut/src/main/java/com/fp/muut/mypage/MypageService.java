package com.fp.muut.mypage;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.fp.muut.entity.Customer;
import com.fp.muut.login.CustomerRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MypageService {

	@Autowired
	private MypageRepository mypageRepository;
	@Autowired
	private CustomerRepository customerRepository;
	
	public Customer getCustomer(String customer_id) {
		return mypageRepository.getCustomer(customer_id);
	}

	@Transactional
	public Customer updateCustomer(@RequestBody Map<String, String> updatedData, HttpServletRequest request) {
		Customer customer = customerRepository.findById(updatedData.get("customer_id"));
		customer.setCustomer_name(updatedData.get("customer_name"));
		customer.setCustomer_pw(updatedData.get("customer_pw"));
		customer.setCustomer_phone(updatedData.get("customer_phone"));
		customer.setCustomer_address(updatedData.get("customer_address"));
		
		mypageRepository.save(customer);
		return customer;

	}
}