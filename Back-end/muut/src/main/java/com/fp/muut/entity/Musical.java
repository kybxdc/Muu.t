package com.fp.muut.entity;

import java.util.ArrayList;
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
public class Musical {
	@Id
	@Column(name = "musical_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_generator1")
    @SequenceGenerator(name = "seq_generator1", sequenceName = "musical_sequence", allocationSize = 1)
	private Long id;
	
	// hall_id 외래키 참조
	@ManyToOne
	@JoinColumn(name = "hall_id")
	@Setter(value = AccessLevel.NONE)
	private Hall_Info hall_Info;
	
	private String musical_title;
	private String musical_description;	
	private String musical_genre;
	private String musical_run_time;
	private String musical_area;
	private String musical_age;
	private String musical_entrpsnm;
	private String musical_image;
	private String musical_seat_grade_info;
	private java.util.Date musical_start_date;
	private java.util.Date musical_end_date;
	private String musical_actor;
	
	// Performance 양방향 매핑
//	@OneToMany(mappedBy = "musical")
//	private List<Performance> performances = new ArrayList<>();
	
	// Review 양방향 매핑
//	@OneToMany(mappedBy = "musical")
//	private List<Review> reviews = new ArrayList<>(); 

	// Expectation 양방향 매핑
//	@OneToMany(mappedBy = "musical")
//	private List<Expectation> expectations = new ArrayList<>(); 
	
	public void setHall_Info(Hall_Info hall_Info) {
		this.hall_Info = hall_Info;
//		hall_Info.getMusicals().add(this);
	}
	
}


