package com.fp.muut.login;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.entity.Customer;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@Service
public class CustomerService {

	private final CustomerRepository customerRepository;
	
	public Customer login(String loginId, String password) {
		Customer customer = customerRepository.findByLoginId(loginId);
		if( customer != null && customer.getCustomerId().equals(loginId) && customer.getCustomerPw().equals(password)) {
					return customer;
			}
		return null;
	}
	
	}
