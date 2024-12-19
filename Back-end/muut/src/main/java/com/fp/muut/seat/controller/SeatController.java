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
	
	@GetMapping("getseat/musical/{musical_id}")
	public ResponseEntity<Object> getSeatByPerformance(@PathVariable Long musical_id){
		Long hall_id = seatService.getSeatDataByMusical(musical_id);
		return getSeat(hall_id);
	} 
	
	@PostMapping("/saveposition/h/{hall_id}")
	public ResponseEntity<String> savePosition(@RequestBody String seats, @PathVariable Long hall_id) {

		seatService.saveSeats(hall_id, seats,"h");
		
		return ResponseEntity.ok("좌석위치 잘 넣었음");
	}
	
	@PostMapping("/saveposition/m/{musical_id}")
	public ResponseEntity<String> savePositions(@RequestBody String seats, @PathVariable Long musical_id) {

		seatService.saveSeats(musical_id, seats,"m");
		
		return ResponseEntity.ok("좌석위치 잘 넣었음");
	}
	
	@GetMapping("/getseatposition/{musical_id}")
	public ResponseEntity<String> getPosition(@PathVariable Long musical_id){
		String seatData = seatService.findSeatByMusicalId(musical_id, "non_grade");
		
		if(seatData!=null) {
			return ResponseEntity.ok(seatData);
		}
		
		return ResponseEntity.status(500).body("좌석 불러오기 실패");
	}
	
	@GetMapping("/getseatposition/grade/{performance_id}")
	public ResponseEntity<String> getGradePosition(@PathVariable Long performance_id){
		
		Long musical_id = seatService.findMusicalByPerformanceId(performance_id);
		String seatData = seatService.findSeatByMusicalId(musical_id, "grade");
		
		if(seatData!=null) {
			return ResponseEntity.ok(seatData);
		}
		
		return ResponseEntity.status(500).body("좌석 불러오기 실패");
	}
	
}
