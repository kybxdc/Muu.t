package com.fp.muut.reserve.service;

import java.text.SimpleDateFormat;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.entity.Customer;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;
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

}
