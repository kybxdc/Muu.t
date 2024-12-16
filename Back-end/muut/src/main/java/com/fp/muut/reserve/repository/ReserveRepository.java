package com.fp.muut.reserve.repository;

import org.springframework.stereotype.Repository;

import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReserveRepository {

	private final EntityManager em;

	public Performance getPerformanceById(Long performance_id) {
		return em.find(Performance.class, performance_id);
	}

	public Musical getMusicalById(Long performance_id) {
		return em.createQuery("select p.musical from Performance p where p.id=:performance_id",Musical.class)
				.setParameter("performance_id", performance_id).getSingleResult();
	}
	
	
}
