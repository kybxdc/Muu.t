package com.fp.muut.repository;

import org.springframework.stereotype.Repository;

import com.fp.muut.entitybak.Musical;

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

