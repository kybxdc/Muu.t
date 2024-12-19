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
public class Musical_Seats {
	// performance_id 외래키 참조
	@Id
	@OneToOne
	@JoinColumn(name="musical_id")
	@Setter(value = AccessLevel.NONE)
	private Musical musical;
	
	private String position;
	
	public void setMusical(Musical musical) {
		this.musical = musical;
//		performance.setPerformance_Seats(this);
	}
}
