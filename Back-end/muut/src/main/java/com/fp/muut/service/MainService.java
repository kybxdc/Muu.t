package com.fp.muut.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.dto.MusicalDTO;
import com.fp.muut.entity.Musical;
import com.fp.muut.repository.MainRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MainService {

    private final MainRepository mainRepository;

    private static final Logger logger = LoggerFactory.getLogger(MainService.class);

    // 모든 뮤지컬 데이터 조회
    public List<Musical> findmusicalDatas() {
        List<Musical> musicals = mainRepository.findAllMusicalData();
        return musicals;
    }
}
