package com.fp.muut.login;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.entity.Customer;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomerService {
	@Autowired
	private final CustomerRepository customerRepository;

	//회원가입
	@Transactional
	public String join(Customer customer) throws IllegalAccessException {
		//validateMemberCheck(customer);
		customerRepository.join(customer);
		return customer.getCustomer_id();
	}
	
	//중복체크
	public void validateMemberCheck(Customer customer) throws IllegalAccessException {
		Customer findMembers = customerRepository.findByLoginId(customer.getCustomer_id());
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
		public Customer findId(String customerId) {
			return customerRepository.findById(customerId);
		}
		
//		public List<Customer> findName(String customerName) {
//			return customerRepository.findByName(customerName);
//		}

	//로그인
		public Customer login(String loginId, String password) {
			Customer customer = customerRepository.findByLoginId(loginId);
			System.out.println(customer.getCustomer_id());
			System.out.println(customer.getCustomer_pw());
			if( customer != null && customer.getCustomer_id().equals(loginId) && customer.getCustomer_pw().equals(password)) {
				System.out.println("로그인서비스"+customer);
						return customer;
				}
			return null;
		}
		
		
	}
	

