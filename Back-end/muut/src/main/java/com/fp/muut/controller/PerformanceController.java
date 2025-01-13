package com.fp.muut.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fp.muut.dto.PerformanceReserveDTO;
import com.fp.muut.dto.PerformanceSelectDTO;
import com.fp.muut.entity.Performance;
import com.fp.muut.repository.APIRepository;
import com.fp.muut.service.PerformanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PerformanceController {
	private final PerformanceService performanceService; 
	
	// Performance 더미 데이터 저장
	@GetMapping("/savePerformance")
	public ModelAndView savePerformance() {
		performanceService.savePf();
		return new ModelAndView("savePf");
	}
	
	// 상세페이지의 회차선택 칸에 performance 데이터 전송
	@PostMapping("/setPerformance/BookingTime")
    public List<PerformanceSelectDTO> savePerformanceDate(@RequestBody PerformanceReserveDTO request){
		return performanceService.findPf(request);
	}
}
