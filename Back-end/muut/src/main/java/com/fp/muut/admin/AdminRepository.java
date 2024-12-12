package com.fp.muut.admin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AdminRepository {

	@Autowired
	private EntityManager em;

	//공연 상세 저장
	public void update(Performance performance) {
		em.persist(performance);
	}

	//전체조회
	public List<Musical> findAll(){
		return em.createQuery("select m from Musical m", Musical.class).getResultList();
	}
	
	//이름으로 조회(뮤지컬 검색용)
	public  List<Musical> findByName(String musical_title){
		return em.createQuery("select m from Musical m where m.musical_title = :musical_title", Musical.class).setParameter("musical_title", musical_title).getResultList();
	}
	
	//아이디로 조회(공연상세 중복체크용)
		public Performance findById(long performance_id){
			return em.createQuery("select p from Performance p where p.performance_id = :performance_id", Performance.class).setParameter("performance_id", performance_id).getSingleResult();
		}
}
