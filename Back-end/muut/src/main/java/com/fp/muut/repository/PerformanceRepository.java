package com.fp.muut.repository;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.fp.muut.entity.Hall_Info;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PerformanceRepository {
	private final EntityManager em;

	public void savePf(Performance performance) {
		em.persist(performance);
	}
	
	public Musical findMuById(Long musical_id) {
		return em.createQuery("SELECT m FROM Musical m WHERE m.id = :musical_id", Musical.class)
                .setParameter("musical_id", musical_id)
                .getResultStream()
                .findFirst()
                .orElse(null);
	}

	public List<Performance> findPfByIdAndDate(Long musical_id, Date performance_date) {
	    return em.createQuery(
	        "SELECT p FROM Performance p WHERE p.musical.id = :musical_id AND p.performance_date = :performance_date", 
	        Performance.class
	    )
	    .setParameter("musical_id", musical_id)
	    .setParameter("performance_date", performance_date)
	    .getResultList();
	}


}
