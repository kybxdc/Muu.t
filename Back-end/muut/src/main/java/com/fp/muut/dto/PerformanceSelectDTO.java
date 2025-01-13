package com.fp.muut.dto;

import java.util.Date;

import lombok.Data;

@Data
public class PerformanceSelectDTO {
	private Long performance_id;
	private Date performance_date;
	private String performance_start_time;
	
	public PerformanceSelectDTO(Long performance_id, Date performance_date, String performance_start_time) {
	    this.performance_id = performance_id;
	    this.performance_date = performance_date;
	    this.performance_start_time = performance_start_time;
	}

}
