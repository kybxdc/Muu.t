package com.fp.muut.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Grade {
	@Id
	private String customer_grade;
	
	private String discount_rate;

	// Customer 양방향 매핑
//	@OneToMany(mappedBy = "grade")
//	private List<Customer> customers = new ArrayList<>();
	
	  public String getDiscountRate() {
	        switch (customer_grade) {
		        case "ADMIN":
	                return "30";    
		        case "VVIP":
	                return "15"; 
	            case "VIP":
	                return "10"; 
	            case "FAMILY":
	                return "5";
	            default:
	                return "0";
	        }
	    }
}
