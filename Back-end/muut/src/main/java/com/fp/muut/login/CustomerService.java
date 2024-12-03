package com.fp.muut.login;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.entitybak.Customer;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomerService {
	@Autowired
	private final CustomerRepository customerRepository;

	//회원가입
	@Transactional
	public String join(Customer customer) throws IllegalAccessException {
		validateMemberCheck(customer);
		customerRepository.join(customer);
		return customer.getCustomerId();
	}
	
	//중복체크
	public void validateMemberCheck(Customer customer) throws IllegalAccessException {
		Customer findMembers = customerRepository.findByLoginId(customer.getCustomerId());
		if(findMembers!= null) {
			throw new IllegalAccessException("이미 존재하는 회원입니다.");
		}
	}	
	
	// 전체 회원 조회
	//@Transactional(readOnly = true)
	public List<Customer> findMembers(){
		return customerRepository.findAll();
	}
		
	// 회원 단 건 조회
	//@Transactional(readOnly = true)
		public List<Customer> findId(String customerId) {
			return customerRepository.findById(customerId);
		}
		
//		public List<Customer> findName(String customerName) {
//			return customerRepository.findByName(customerName);
//		}

	//로그인
		public Customer login(String loginId, String password) {
			Customer customer = customerRepository.findByLoginId(loginId);
			if( customer != null && customer.getCustomerId().equals(loginId) && customer.getCustomerPw().equals(password)) {
						return customer;
				}
			return null;
		}
		
		
	}
	

