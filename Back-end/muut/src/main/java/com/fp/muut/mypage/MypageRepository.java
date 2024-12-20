package com.fp.muut.mypage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.dto.ReservationDTO;
import com.fp.muut.dto.ReservationDetailDTO;
import com.fp.muut.dto.ReservationInfoDTO;
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

	public ReservationInfoDTO findbyInfo(long reservation_num) {
		return em.createQuery("SELECT new com.fp.muut.dto.ReservationInfoDTO(r.reservation_num, c.customer_name, r.reservation_date, " +
	              "p.performance_date, p.performance_start_time, hi.hall_name, m.musical_title) " +
	              "FROM Reservation r " +
	              "JOIN r.customer c " +  // RESERVATION과 CUSTOMER 연결
	              "JOIN r.performance p " +  // RESERVATION과 PERFORMANCE 연결
	              "JOIN p.hall_Info hi " +  // PERFORMANCE와 HALL_INFO 연결
	              "JOIN p.musical m " +
	              "WHERE r.reservation_num =: reservation_num", ReservationInfoDTO.class).setParameter("reservation_num", reservation_num).getSingleResult();
	}

	public ReservationDetailDTO findbyDetail(long reservation_num) {
		return null;
	}
}
