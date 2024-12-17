package com.fp.muut.dto;

import java.util.Date;

import com.fp.muut.entity.Musical;

import lombok.Getter;
import lombok.Setter;
@Getter @Setter
public class MusicalListDTO {
	
	private Long id;
	private String musical_title;
	private String musical_area;
	private Date musical_start_date;
	private Date musical_end_date;
	
	 public MusicalListDTO(Musical musical) {
	        this.id = musical.getId();
	        this.musical_title = musical.getMusical_title();
	        this.musical_area = musical.getMusical_area();
	        this.musical_start_date = musical.getMusical_start_date();
	        this.musical_end_date = musical.getMusical_end_date();
	    }
}
