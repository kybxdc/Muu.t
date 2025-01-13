package com.fp.muut.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReservationDTO {
	
	private Long reservation_num;
	private String customer_name;
	private java.util.Date performance_date;
	private String performance_start_time;
	private String musical_title;
	private String musical_image;
	
	
	public ReservationDTO(Long reservation_num, String customer_name, Date performance_date,
			String performance_start_time, String musical_title, String musical_image) {
		super();
		this.reservation_num = reservation_num;
		this.customer_name = customer_name;
		this.performance_date = performance_date;
		this.performance_start_time = performance_start_time;
		this.musical_title = musical_title;
		this.musical_image = musical_image;
	}

}
