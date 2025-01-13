package com.fp.muut.entity;

import com.fp.muut.entity.embedded.ExpectationPK;

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
public class Expectation {
	@EmbeddedId
	private ExpectationPK expectationPK;
	
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
	
	private String expectation_content;
	private java.util.Date expectation_date;
	
	public void setMusical(Musical musical) {
		this.musical = musical;
//		musical.getExpectations().add(this);
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
//		customer.getExpectations().add(this);
	}
	
}
