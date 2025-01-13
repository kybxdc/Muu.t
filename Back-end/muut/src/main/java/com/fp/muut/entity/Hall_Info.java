package com.fp.muut.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Hall_Info {
	@Id
	@Column(name="hall_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_generator2")
    @SequenceGenerator(name = "seq_generator2", sequenceName = "hall_info_sequence", allocationSize = 1)
	private Long id;
	
	private String hall_name;
	private String hall_image;
	private String hall_addr;
	
	@Column(length = 1000)
	private String hall_seat_info;
	
	// 임시
	private String hall_API_id;
	private String hall_la;
	private String hall_lo;
	
	
	// Musical 양방향 매핑
//	@OneToMany(mappedBy = "hall_Info")
//	private List<Musical> musicals = new ArrayList<>();
	
	// Performance 양방향 매핑
//	@OneToMany(mappedBy = "hall_Info")
//	private List<Performance> performances = new ArrayList<>();
	
	// Seat_Position 양방향 매핑
	@OneToOne(mappedBy = "hall_Info")
	private Seat_Position seat_Position;
}
