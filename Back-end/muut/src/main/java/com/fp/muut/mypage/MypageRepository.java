package com.fp.muut.mypage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.dto.ReservationDTO;
import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Reservation;

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

	public List<ReservationDTO> findAll(String customer_id) {
		return em.createQuery(
				"SELECT new com.fp.muut.dto.ReservationDTO(r.reservation_num, c.customer_name, "+
				"p.performance_date, p.performance_start_time, m.musical_title, m.musical_image) "+
		        "FROM Reservation r " +
		        "JOIN r.customer c " +
		        "JOIN r.performance p " +
		        "JOIN p.musical m " +
		        "WHERE c.customer_id = :customer_id", ReservationDTO.class).setParameter("customer_id", customer_id).getResultList();
				
	}
}
