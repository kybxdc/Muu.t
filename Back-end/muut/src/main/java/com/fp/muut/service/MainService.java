package com.fp.muut.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.dto.MusicalDTO;
import com.fp.muut.repository.MainRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MainService {
	private final MainRepository mainRepository;

	// 모든 뮤지컬 데이터 조회
	public List<MusicalDTO> findmusicalDatas() {
		return mainRepository.findAllMusicalData();
	}

}
