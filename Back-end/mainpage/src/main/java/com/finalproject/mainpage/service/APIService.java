package com.finalproject.mainpage.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finalproject.mainpage.repository.APIRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class APIService {
	private final APIRepository apirepository;
	
	@Transactional
	public void save() throws IOException {
		int musicalIdStart = 132238;
		String musicalId = "";
		for(int i=0;i<10;i++) {
			musicalId = "PF"+(musicalIdStart+i);
			apirepository.save(musicalId);
		}
	}
	
}
