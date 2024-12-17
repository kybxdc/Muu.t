package com.fp.muut.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.fp.muut.dto.MusicalAndHallDTO;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MainRepository {
	private final EntityManager em;

	// 모든 뮤지컬과 연관된 홀 데이터를 조회
	public List<MusicalAndHallDTO> findAllMusicalData() {
	    return em.createQuery(
	        "SELECT new com.fp.muut.dto.MusicalAndHallDTO(" +
	        "    m.id, m.musical_title, m.musical_description, m.musical_genre, " +
	        "    m.musical_run_time, m.musical_area, m.musical_age, m.musical_entrpsnm, " +
	        "    m.musical_image, m.musical_seat_grade_info, m.musical_start_date, " +
	        "    m.musical_end_date, m.musical_actor, h.hall_name, h.hall_addr" +
	        ") " +
	        "FROM Musical m " +
	        "LEFT JOIN m.hall_Info h", 
	        MusicalAndHallDTO.class
	    ).getResultList();
	}


}
