package com.fp.muut.postcomponent;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fp.muut.entity.Grade;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GradeService {
	
	private final GradeRepository gradeRepository;
	
	@Transactional
	public void save(Grade grade) {
		if(gradeRepository.findGrade(grade)!=null) {
			return;
		}else {
			gradeRepository.save(grade);
		}
	}
}
