package com.fp.muut.reserve.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;
import com.fp.muut.reserve.repository.ReserveRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReserveService {
	private final ReserveRepository reserveRepository;
	
	public Performance getPerformance(Long performance_id) {
		return reserveRepository.getPerformanceById(performance_id);
	}

	public Musical getMusical(Long performance_id) {
		return reserveRepository.getMusicalById(performance_id);
	}

}
