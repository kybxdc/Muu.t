package com.fp.muut.reserve.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;
import com.fp.muut.entity.Reservation;
import com.fp.muut.reserve.dto.ReserveCustomerDTO;
import com.fp.muut.reserve.dto.ReserveDTO;
import com.fp.muut.reserve.repository.ReserveRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReserveService {
	private final ReserveRepository reserveRepository;
	
	public ReserveDTO getReserveInfo(Long performance_id) {
		Performance performance = reserveRepository.getPerformanceById(performance_id);
		Musical musical = reserveRepository.getMusicalById(performance_id);
		String hallName = reserveRepository.getHallName(performance_id);
		
		ReserveDTO reserve = new ReserveDTO();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd(E)");
		String date = sdf.format(performance.getPerformance_date());
		
		reserve.setDate(date);
		reserve.setHall_name(hallName);
		reserve.setPoster(musical.getMusical_image());
		reserve.setTitle(musical.getMusical_title());
		reserve.setStart_time(performance.getPerformance_start_time());
		
		return reserve;
	}

	public ReserveCustomerDTO getCustomerInfo(String customer_email) {
		Customer customer = reserveRepository.getCustomerByEmail(customer_email);
		ReserveCustomerDTO customerDto = new ReserveCustomerDTO();
		
		customerDto.setCustomer_email(customer_email);
		customerDto.setCustomer_name(customer.getCustomer_name());
		customerDto.setCustomer_phone(customer.getCustomer_phone());
		
		return customerDto;
	}

	@Transactional
	public void saveReserve(Map<String, Object> reserveData) {
		Reservation reservation = new Reservation();
		Customer customer = null;
		Performance performance = null;
		String payment_amount = null;
		String seat_num = null;
		Date reservation_date = new Date();
		
		for(Map.Entry<String, Object> e : reserveData.entrySet()) {
			switch(e.getKey()) {
			case "customer":
				customer = reserveRepository.getCustomerByEmail((String)e.getValue());
				break;
			case "payment_amount":
				payment_amount=(String)e.getValue();
				break;
			case "seat_num":
				seat_num=(String)e.getValue();
				break;
			case "performance":
				performance = reserveRepository.getPerformanceById(Long.parseLong((String)e.getValue()));
				break;
			}
		}
		reservation.setCustomer(customer);
		reservation.setPayment_amount(payment_amount);
		reservation.setPerformance(performance);
		reservation.setReservation_date(reservation_date);
		reservation.setSeat_num(seat_num);
		
		reserveRepository.saveReserve(reservation);
	}

	public String findSoldSeats(Long performnace_id) {
		return reserveRepository.findSoldSeats(performnace_id);
	}

	public String getReserveSeats(Long reservation_num) {
		return reserveRepository.getReserveSeats(reservation_num);
	}

}
