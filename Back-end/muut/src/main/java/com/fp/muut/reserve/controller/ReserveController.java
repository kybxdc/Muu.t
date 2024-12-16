package com.fp.muut.reserve.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;
import com.fp.muut.reserve.service.ReserveService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reserve/")
@RequiredArgsConstructor
public class ReserveController {
	private final ReserveService reserveService;
	
	@GetMapping("/info/{performance_id}")
	public ResponseEntity<Map<String, Object>> getPerformanceInfo(@PathVariable Long performance_id){
		Performance performance = reserveService.getPerformance(performance_id);
		Musical musical = reserveService.getMusical(performance_id);
		
		Map<String, Object> data = new HashMap<>();
		
		data.put("performance", performance);
		data.put("musical", musical);
		
		return ResponseEntity.ok(data);
	}
}
