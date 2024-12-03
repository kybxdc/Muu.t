package com.fp.muut.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.fp.muut.dto.MusicalDTO;
import com.fp.muut.entity.Musical;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MainRepository {
	private final EntityManager em;

	// 모든 뮤지컬 데이터 조회
	public List<Musical> findAllMusicalData() {
		return em.createQuery("SELECT m FROM Musical m", Musical.class)
				 .getResultList();
	}

}
