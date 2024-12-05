package com.fp.muut.seat.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/seat")
public class SeatController {

	@PostMapping("/seatedit")
	public ResponseEntity<String> getCol(@RequestBody Map<String, String> data) {
		String col = data.get("col");
		System.out.println(col);
		return ResponseEntity.ok("좌석정보 받았음");
	}

}
