package com.fp.muut.mypage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.entity.Customer;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
public class MypageRepository {
	@Autowired
	private EntityManager em;
	//회원정보 받아오기
	public Customer getCustomer(String customer_id){
		return em.createQuery("select c from Customer c where c.customer_id = :customer_id", Customer.class).setParameter("customer_id", customer_id).getSingleResult();
	}
	
	//저장
	public void save(Customer customer) {
		em.merge(customer);
		em.flush();
	}
}
