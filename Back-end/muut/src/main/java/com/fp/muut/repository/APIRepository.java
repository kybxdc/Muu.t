package com.fp.muut.repository;

import org.springframework.stereotype.Repository;

import com.fp.muut.entity.Hall_Info;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class APIRepository {
    private final EntityManager em;
    
    // 뮤지컬 정보 저장
    public void save(Musical musical) {
        em.persist(musical);
    }
    
    // 홀 정보 저장
    public void save_hallInfo(Hall_Info hallInfo) {
        em.persist(hallInfo);
    }
    
    /*=================김영범 테스트용 공연 더미데이터===============*/
    public void save_performan(Performance performance) {
    	em.persist(performance);
    }
    /*=================김영범 테스트용 공연 더미데이터===============*/
    
    public Hall_Info findHallByID(String hall_API_id) {
        return em.createQuery("SELECT h FROM Hall_Info h WHERE h.hall_API_id = :hall_API_id", Hall_Info.class)
                 .setParameter("hall_API_id", hall_API_id)
                 .getResultStream()
                 .findFirst()
                 .orElse(null);
    }

}

