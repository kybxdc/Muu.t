package com.fp.muut.login;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fp.muut.entity.Customer;

import jakarta.persistence.EntityManager;

@Repository
public class CustomerRepository {

	@Autowired
	private EntityManager em;

	//저장
	public void join(Customer customer) {
		em.persist(customer);
	}
	
	//조회
	public Customer findOne(String customerId) {
		return em.find(Customer.class, customerId);
	}

	//전체조회
	public List<Customer> findAll(){
		return em.createQuery("select c from Customer c", Customer.class).getResultList();
	}
	
//	//이름으로 조회
//	public List<Customer> findByName(String customer_name){
//		return em.createQuery("select c from Customer c where c.customer_name = :customer_name", Customer.class).setParameter("customerNmae", customer_name).getResultList();
//	}
	
	//아이디로 조회
		public List<Customer> findById(String customer_id){
			return em.createQuery("select c from Customer c where c.customer_id = :customer_id", Customer.class).setParameter("customerId", customer_id).getResultList();
		}

	//로그인
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
