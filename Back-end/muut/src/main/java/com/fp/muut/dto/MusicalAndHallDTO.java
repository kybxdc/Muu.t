package com.fp.muut.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class MusicalAndHallDTO {
	private Long id;
	private String musical_title;
	private String musical_description;	
	private String musical_genre;
	private String musical_run_time;
	private String musical_area;
	private String musical_age;
	private String musical_entrpsnm;
	private String musical_image;
	private String musical_seat_grade_info;
	private Date musical_start_date;
	private Date musical_end_date;
	private String musical_actor;
	private String hall_name;
	private String hall_addr;
	private String hall_la;
	private String hall_lo;
}


