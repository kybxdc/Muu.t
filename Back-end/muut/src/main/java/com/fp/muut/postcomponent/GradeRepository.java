package com.fp.muut.postcomponent;

import org.springframework.stereotype.Repository;

import com.fp.muut.entity.Grade;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class GradeRepository {
	private final EntityManager em;
	
	public void save(Grade grade) {
		em.persist(grade);
	}

	public Grade findGrade(Grade grade) {
		return em.find(Grade.class,grade.getCustomer_grade());
	}
}
