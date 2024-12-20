package com.fp.muut.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReservationInfoDTO {

	private Long reservation_num;
	private String customer_name;
	private java.util.Date reservation_date;
	private java.util.Date performance_date;
	private String performance_start_time;
	private String hall_name;
	private String musical_title;
	
	public ReservationInfoDTO(Long reservation_num, String customer_name, Date reservation_date, Date performance_date,
			String performance_start_time, String hall_name, String musical_title) {
		super();
		this.reservation_num = reservation_num;
		this.customer_name = customer_name;
		this.reservation_date = reservation_date;
		this.performance_date = performance_date;
		this.performance_start_time = performance_start_time;
		this.hall_name = hall_name;
		this.musical_title = musical_title;
	}

}
