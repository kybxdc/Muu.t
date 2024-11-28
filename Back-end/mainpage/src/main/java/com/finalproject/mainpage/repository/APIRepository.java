package com.finalproject.mainpage.repository;

import org.springframework.stereotype.Repository;

import com.finalproject.mainpage.querydsl.entity.Musical;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class APIRepository {
	private final EntityManager em;
	
	public void save() {
		Musical musical = new Musical();
		musical.setMusicalTitle("title");
        // hall_id는 임시. 수정 필요
        musical.setHallId(1L);
        musical.setMusicalGenre("1234");
        musical.setMusicalRunTime("123");
        musical.setMusicalArea("123");
        musical.setMusicalAge("123");
        musical.setMusicalEntrpsnm("123");
        musical.setMusicalImage("123");
        musical.setMusicalSeatGradeInfo("123");
        musical.setActor("123");
        
        em.persist(musical);
	}
	
}
