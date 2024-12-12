package com.fp.muut.admin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Grade;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AdminService {
	@Autowired
	private final AdminRepository adminRepository;

	//회원가입
	@Transactional
	public Long update(Performance performance) {
		
		adminRepository.update(performance);
		return performance.getId();
	}
	
//	//중복체크
//	public void validateShowCheck(Performance performance) throws IllegalAccessException {
//		Performance findShows = adminRepository.findById(performance.getId());
//		if(findShows != null) {
//			throw new IllegalAccessException("이미 존재하는 공연입니다.");
//		}
//	}	
//	

	// 뮤지컬 조회
	//@Transactional(readOnly = true)
		public List<Musical> findId(String musical_title) {
			return adminRepository.findByName(musical_title);
		}
		

		//뮤지컬 전체목록 조회
		public List<Musical> findMusicals() {
			return adminRepository.findAll();
		}
	
		
	}
	

