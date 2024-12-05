package com.fp.muut.entity;

import java.util.ArrayList;
import java.util.List;

import com.fp.muut.entity.embedded.ReviewPK;

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
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_generator5")
    @SequenceGenerator(name = "seq_generator5", sequenceName = "customer_sequence", allocationSize = 1)
	private Long customer_num;
	
	private String customer_id;
	private String customer_pw;
	private String customer_name;
	private String customer_phone;
	private String customer_address;
	
	// customer_grade 외래키 참조
	@ManyToOne
	@JoinColumn(name = "customer_grade")
	@Setter(value = AccessLevel.NONE)
	private Grade grade;
	
	private String customer_total_cash;
	
	// Resrvation 양방향 매핑
//	@OneToMany(mappedBy = "customer")
//	private List<Reservation> reservations = new ArrayList<>();

	// Review 양방향 매핑
//	@OneToMany(mappedBy = "customer")
//	private List<Review> reviews = new ArrayList<>();

	// Review 양방향 매핑
//	@OneToMany(mappedBy = "customer")
//	private List<Expectation> expectations = new ArrayList<>();
	
	public void setDiscound(Grade grade) {
		this.grade = grade;
//		grade.getCustomers().add(this);
	}
	
	// 기본 생성자
    public Customer() {}

	public Customer(Long customer_num, String customer_id, String customer_pw, String customer_name,
			String customer_phone, String customer_address, Grade grade, String customer_total_cash) {
		super();
		this.customer_num = customer_num;
		this.customer_id = customer_id;
		this.customer_pw = customer_pw;
		this.customer_name = customer_name;
		this.customer_phone = customer_phone;
		this.customer_address = customer_address;
		this.grade = grade;
		this.customer_total_cash = customer_total_cash;
	}

    
	
}
