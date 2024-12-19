package com.fp.muut.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReservationInfoDTO {

	private Long reservation_num;
	private String musical_title;
	private String hall_name;
	private java.util.Date performance_date;
	private String performance_start_time;
	private java.util.Date reservation_date;
	private String payment_amount;
	private String customer_name;
	
	public ReservationInfoDTO(Long reservation_num, String musical_title, String hall_name, Date performance_date,
			String performance_start_time, Date reservation_date, String payment_amount, String customer_name) {
		super();
		this.reservation_num = reservation_num;
		this.musical_title = musical_title;
		this.hall_name = hall_name;
		this.performance_date = performance_date;
		this.performance_start_time = performance_start_time;
		this.reservation_date = reservation_date;
		this.payment_amount = payment_amount;
		this.customer_name = customer_name;
	}

}
