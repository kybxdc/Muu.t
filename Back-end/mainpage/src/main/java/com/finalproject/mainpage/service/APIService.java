package com.finalproject.mainpage.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finalproject.mainpage.repository.APIRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class APIService {
	private final APIRepository testRepository;
	
	@Transactional
	public void save() {
		testRepository.save();
	}
	
}
