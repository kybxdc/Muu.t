package com.fp.muut.dto;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.fp.muut.admin.AdminRepository;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PerformanceDTO {

		private Long id;
		private String musical_title;
		private java.util.Date performance_date;
		private String performance_start_time;

		@Autowired
		private AdminRepository adminRepository;
		
		 public PerformanceDTO(Long performance_id, java.util.Date performance_date, String performance_start_time) {
			 this.id = performance_id;
		     this.performance_date = performance_date;
		     this.performance_start_time = performance_start_time;
		    }

//		private String getMusicalTitle(Long musical_id) {
//			return adminRepository.getTitle(musical_id);
//	        
//		}
	
		
	}