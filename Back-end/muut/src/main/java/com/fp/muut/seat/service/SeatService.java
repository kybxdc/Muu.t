package com.fp.muut.seat.service;

import java.util.Map.Entry;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fp.muut.seat.repository.SeatRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeatService {

	private final SeatRepository seatRepository;
	
	@Transactional
	public void saveInfo(Entry<String, Object> seats) {
		int hall_id = Integer.valueOf(seats.getKey());
		
		ObjectMapper objectMapper = new ObjectMapper();
		String seatData=null;
		try {
			seatData = objectMapper.writeValueAsString(seats.getValue());
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		if(seatData!=null) {
			seatRepository.saveInfo(hall_id, seatData);
		}
		
	}

	public Object getSeat(Long hall_id) {
		String str_seatData = seatRepository.get(hall_id);
		
		ObjectMapper objectMapper = new ObjectMapper();
		Object json_seatData = null;
		try {
			json_seatData = objectMapper.readValue(str_seatData, Object.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return json_seatData;
	}

	@Transactional
	public void saveSeats(Long hall_id, String seats) {
		seatRepository.saveSeats(hall_id, seats);
	}
	
	
}
