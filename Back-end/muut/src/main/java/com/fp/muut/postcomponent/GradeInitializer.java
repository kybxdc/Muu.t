package com.fp.muut.postcomponent;

import org.springframework.stereotype.Component;

import com.fp.muut.entity.Grade;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GradeInitializer {
	private final GradeService gradeService;
	
	@PostConstruct
	public void initGrade() {
		Grade grade = new Grade();
		Grade grade2 = new Grade();
		Grade grade3 = new Grade();
		Grade grade4 = new Grade();
		Grade grade5 = new Grade();
		grade.setCustomer_grade("BASIC");
		grade.setDiscount_rate("0");
		grade2.setCustomer_grade("FAMILY");
		grade2.setDiscount_rate("5");
		grade3.setCustomer_grade("VIP");
		grade3.setDiscount_rate("10");
		grade4.setCustomer_grade("VVIP");
		grade4.setDiscount_rate("15");
		grade5.setCustomer_grade("ADMIN");
		grade5.setDiscount_rate("30");
		
		gradeService.save(grade);
		gradeService.save(grade2);
		gradeService.save(grade3);
		gradeService.save(grade4);
		gradeService.save(grade5);
	}
}
