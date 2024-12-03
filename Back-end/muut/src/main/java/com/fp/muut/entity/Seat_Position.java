package com.fp.muut.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Seat_Position {
	// hall_id 외래키 참조
	@Id
	@OneToOne
	@JoinColumn(name="hall_id")
	@Setter(value = AccessLevel.NONE)
	private Hall_Info hall_Info;
	
	// json 데이터로 넣을 예정
	private String position;

	
	public void setHall_Info(Hall_Info hall_Info) {
		this.hall_Info = hall_Info;
		hall_Info.setSeat_Position(this);
	}
	
}
