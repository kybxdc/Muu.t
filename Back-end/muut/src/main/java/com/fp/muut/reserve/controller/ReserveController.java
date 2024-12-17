package com.fp.muut.reserve.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.reserve.dto.ReserveCustomerDTO;
import com.fp.muut.reserve.dto.ReserveDTO;
import com.fp.muut.reserve.service.ReserveService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reserve/")
@RequiredArgsConstructor
public class ReserveController {
	private final ReserveService reserveService;
	
	@GetMapping("/info/{performance_id}")
	public ResponseEntity<Object> getPerformanceInfo(@PathVariable Long performance_id){
		ReserveDTO reserve = reserveService.getReserveInfo(performance_id);
		
		return ResponseEntity.ok(reserve);
	}
	
	@GetMapping("{customer_email}")
	public ReserveCustomerDTO getUserDto(@PathVariable String customer_email) {
		ReserveCustomerDTO customer = reserveService.getCustomerInfo(customer_email);
		return customer;
	}
}
