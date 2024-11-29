package com.finalproject.mainpage.repository;

import org.springframework.stereotype.Repository;
import com.finalproject.mainpage.entity.Musical;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class APIRepository {
    private final EntityManager em;

    public void save(Musical musical) {
        em.persist(musical);
    }
}

