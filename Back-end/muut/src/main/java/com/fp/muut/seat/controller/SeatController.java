package com.fp.muut.seat.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fp.muut.seat.service.SeatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seat")
@RequiredArgsConstructor
public class SeatController {

	private final SeatService seatService;
	
	@PostMapping("/seatinfo")
	public ResponseEntity<String> getCol(@RequestBody Map.Entry<String, Object> seats) {
		
		seatService.saveInfo(seats);
		
		return ResponseEntity.ok("좌석정보 받았음");
	}
	
	@GetMapping("/getseat/{hall_id}")
	public ResponseEntity<Object> getSeat(@PathVariable Long hall_id) {
		return ResponseEntity.ok(seatService.getSeat(hall_id));
	}
	
	@PostMapping("/saveposition/{hall_id}")
	public ResponseEntity<String> postMethodName(@RequestBody String seats, @PathVariable Long hall_id) {

		seatService.saveSeats(hall_id, seats);
		
		return ResponseEntity.ok("좌석위치 잘 넣었음");
	}
	
//	@GetMapping("")
//	public Response
	
}
