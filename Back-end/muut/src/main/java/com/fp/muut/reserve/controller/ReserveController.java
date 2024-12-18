package com.fp.muut.reserve.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("uuid")
	public String getUUID() {
		return java.util.UUID.randomUUID().toString();
	}
	
	@PostMapping("save")
	public ResponseEntity<String> saveReserve(@RequestBody Map<String, Object> reserveData) {
		reserveService.saveReserve(reserveData);
		
		return ResponseEntity.ok("예약정보 저장 성공");
	}
	
	@GetMapping("/sold/{performance_id}")
	public ResponseEntity<Object> checkSoldSeats(@PathVariable Long performance_id) {
		List<String> soldSeats = reserveService.findSoldSeats(performance_id);
		return ResponseEntity.ok(soldSeats);
	}
	
}
