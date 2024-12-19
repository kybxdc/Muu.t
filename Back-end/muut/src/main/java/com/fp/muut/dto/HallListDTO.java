package com.fp.muut.dto;

import com.fp.muut.entity.Hall_Info;
import com.fp.muut.entity.Musical;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class HallListDTO {
	private Long id;
	private String hall_name;
	
	public HallListDTO(Hall_Info hall) {
        this.id = hall.getId();
        this.hall_name = hall.getHall_name();
    }
}
