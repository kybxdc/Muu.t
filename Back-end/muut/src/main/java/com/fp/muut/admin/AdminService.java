package com.fp.muut.admin;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.fp.muut.dto.HallListDTO;
import com.fp.muut.dto.MusicalDTO;
import com.fp.muut.dto.MusicalListDTO;
import com.fp.muut.dto.PerformanceDTO;
import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Grade;
import com.fp.muut.entity.Hall_Info;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;
import com.fp.muut.login.CustomerRepository;
import com.fp.muut.mypage.MypageRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AdminService {
	@Autowired
	private final AdminRepository adminRepository;
	@Autowired
	private final CustomerRepository customerRepository;
	@Autowired
	private final MypageRepository mypageRepository;

	//상세정보 입력
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
		public List<Musical> findId(String musical_title) {
			return adminRepository.findByName(musical_title);
		}
		

		//뮤지컬 전체목록 조회
		public List<MusicalListDTO> findMusicals() {
			return adminRepository.findAll();
		}
	
		//뮤지컬 제목 검색
		public  Musical findByNumber(String musical_title){
			return adminRepository.findByNumber(musical_title);
		}
		
		//공연장 전체 목록 조회 검색
		public List<HallListDTO> halls(){
			return adminRepository.findAllHall();
		}
				
		//공연장 검색
		public Hall_Info findByhall(String hall_name){
			return adminRepository.findByhall(hall_name);
		}
		
		//뮤지컬 상세정보 조회
		public List<PerformanceDTO> showList(long selectedMusicalId) {
			return adminRepository.showList(selectedMusicalId);
		}
		
		//회원 정보 수정
		@Transactional
		public Customer updateCustomer(Map<String, String> updatedData, HttpServletRequest request) {
				Customer customer = customerRepository.findByNum(updatedData.get("customer_num"));
				customer.setCustomer_id(updatedData.get("customer_id"));
				customer.setCustomer_name(updatedData.get("customer_name"));
				customer.setCustomer_pw(updatedData.get("customer_pw"));
				customer.setCustomer_phone(updatedData.get("customer_phone"));
				customer.setCustomer_address(updatedData.get("customer_address"));
				customer.setCustomer_status(updatedData.get("customer_status"));
				//customer.setDiscound(null);
				
				mypageRepository.save(customer);
				
				return customer;
			}

		//뮤지컬 상세정보수정
		@Transactional
		public Performance updateShow(Map<String, String> updatedData, HttpServletRequest request) {
			
			Performance performance = adminRepository.findById(updatedData.get("id"));
     		String performanceDateStr = updatedData.get("performance_date");
     		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
             try {
                 // String → java.util.Date 변환
                 java.util.Date performanceDate = dateFormat.parse(performanceDateStr);
                 System.out.println("Converted Date: " + performanceDate);
                 performance.setPerformance_date(performanceDate);
                 performance.setPerformance_start_time(updatedData.get("performance_start_time"));
                 adminRepository.update(performance);
                 
             } catch (ParseException e) {
                 System.out.println("Date parsing error: " + e.getMessage());
             }
             return performance;
		}
		
		//뮤지컬 회차 삭제
		@Transactional
		public void deleteShow(String selectedId) {
			adminRepository.deleteById(selectedId);
		}
		
		
		
	}
	

