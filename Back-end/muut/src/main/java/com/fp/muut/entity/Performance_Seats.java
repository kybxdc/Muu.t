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
public class Performance_Seats {
	// performance_id 외래키 참조
	@Id
	@OneToOne
	@JoinColumn(name="performance_id")
	@Setter(value = AccessLevel.NONE)
	private Performance performance;
	
	private String position;
	
	public void setPerformance(Performance performance) {
		this.performance = performance;
//		performance.setPerformance_Seats(this);
	}
}
