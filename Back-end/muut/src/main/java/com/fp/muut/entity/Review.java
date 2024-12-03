package com.fp.muut.entity;

import java.time.LocalDateTime;

import com.fp.muut.entity.embedded.ReviewPK;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Review {
	
	// 복합키 설정
	@EmbeddedId
	private ReviewPK reviewPK;
	
	// musical_id를 외래키로 가져와서 복합키에 설정
	@MapsId("musical_id")
	@ManyToOne
	@JoinColumn(name = "musical_id")
	@Setter(value = AccessLevel.NONE)
	private Musical musical;

	// customer_num을 외래키로 가져와서 복합키에 설정
	@MapsId("customer_num")
	@ManyToOne
	@JoinColumn(name = "customer_num")
	@Setter(value = AccessLevel.NONE)
	private Customer customer;
	
	private int review_score;
	private String review_content;
	private LocalDateTime review_date;
	
	public void setMusical(Musical musical) {
		this.musical = musical;
		musical.getReviews().add(this);
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
		customer.getReviews().add(this);
	}
	
}
