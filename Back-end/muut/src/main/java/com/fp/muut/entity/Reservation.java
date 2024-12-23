package com.fp.muut.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Reservation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reservation_num;
	
	// customer_num 외래키 참조
	@ManyToOne
	@JoinColumn(name = "customer_num")
	@Setter(value = AccessLevel.NONE)
	private Customer customer;
	
	private java.util.Date reservation_date;
	private String payment_amount;
	private String seat_num;
	
	// performance_id 외래키 참조
	@ManyToOne
	@JoinColumn(name = "performance_id")
	@Setter(value = AccessLevel.NONE)
	private Performance performance;
	
	public void setPerformance(Performance performance) {
		this.performance = performance;
//		performance.getReservations().add(this);
	}
	
	public void setCustomer(Customer customer) {
		this.customer = customer;
//		customer.getReservations().add(this);
	}	
}
