package com.fp.muut.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Performance {
	@Id
	@Column(name="performance_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_generator3")
    @SequenceGenerator(name = "seq_generator3", sequenceName = "performance_sequence", allocationSize = 1)
	private Long id;
	
	// musical_id 외래키 참조
	@ManyToOne
	@JoinColumn(name="musical_id")
	@Setter(value = AccessLevel.NONE)
	private Musical musical;
	
	// hall_id 외래키 참조
	@ManyToOne
	@JoinColumn(name="hall_id")
	@Setter(value = AccessLevel.NONE)
	private Hall_Info hall_Info;
	
	private java.util.Date performance_date;
	private String performance_start_time;
	
	// Reservation 양방향 매핑
//	@OneToMany(mappedBy = "performance")
//	private List<Reservation> reservations = new ArrayList<>();
	
	public void setMusical(Musical musical) {
		this.musical = musical;
//		musical.getPerformances().add(this);
	}
	
	public void setHall_Info(Hall_Info hall_Info){
		this.hall_Info = hall_Info;
//		hall_Info.getPerformances().add(this);
	}
	
}
