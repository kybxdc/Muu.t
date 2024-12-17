package com.fp.muut.admin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.dto.MusicalDTO;
import com.fp.muut.dto.MusicalListDTO;
import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Hall_Info;
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
	public List<MusicalListDTO> findAll(){
		List<Musical> ml = em.createQuery("select m from Musical m", Musical.class).getResultList();
		List<MusicalListDTO> musicalList = new ArrayList<>();
		for (Musical m : ml) {
		    MusicalListDTO dto = new MusicalListDTO(m);
		    musicalList.add(dto);
		}
		return musicalList;
	}
	
	//이름으로 조회(뮤지컬 검색용)
	public  List<Musical> findByName(String musical_title){
		return em.createQuery("select m from Musical m where m.musical_title = :musical_title", Musical.class).setParameter("musical_title", musical_title).getResultList();
	}
	
	//아이디로 조회(공연상세 중복체크용)
		public Performance findById(long performance_id){
			return em.createQuery("select p from Performance p where p.performance_id = :performance_id", Performance.class).setParameter("performance_id", performance_id).getSingleResult();
		}
		
		//뮤지컬 제목 검색
		public  Musical findByNumber(String musical_title){
			return em.createQuery("select m from Musical m where m.musical_title = :musical_title", Musical.class).setParameter("musical_title", musical_title).getSingleResult();
		}
		
		//공연장 검색
		public Hall_Info findByhall(String hall_name){
			System.out.println("레파지토리 홀네임 : "+hall_name);
			return em.createQuery("select h from Hall_Info h where h.hall_name = :hall_name", Hall_Info.class).setParameter("hall_name", hall_name).getSingleResult();
		}

		public List<Performance> showList(long selectedMusicalId) {
			System.out.println("레파지토리 : "+selectedMusicalId);
			return em.createQuery("select p from Performance p where p.musical.id = :musical_id", Performance.class).setParameter("musical_id", selectedMusicalId).getResultList();
		}
		
		
		
		
		
}
