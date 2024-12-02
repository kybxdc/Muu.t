package com.fp.muut.login;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.fp.muut.entity.Customer;

@Repository
public class CustomerRepository {

	private static Map<Long, Customer> store = new HashMap<>();
	private static long sequence = 0L;
	
	public Customer save(Customer customer) {
		customer.setCustomerNum(++sequence);
		store.put(customer.getCustomerNum(), customer);
		return customer;
	}
	
	public Customer findById(Long id) {
		return store.get(id);
	}
	
	public List<Customer> findAll(){
		return new ArrayList<>(store.values());
	}
	
	public Customer findByLoginId(String loginId) {
		List<Customer> all = findAll();
		for (Customer m : all) {
			if(m.getCustomerId().equals(loginId)) {
				return m;
			}
		}
		return null;
	}
}