package com.fp.muut.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fp.muut.dto.PerformanceDummyData;
import com.fp.muut.dto.PerformanceReserveDTO;
import com.fp.muut.dto.PerformanceSelectDTO;
import com.fp.muut.entity.Hall_Info;
import com.fp.muut.entity.Musical;
import com.fp.muut.entity.Performance;
import com.fp.muut.repository.PerformanceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PerformanceService {
	private final PerformanceRepository performanceRepository;

	@Transactional
	public void savePf() {
		try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        List<PerformanceDummyData> dummyDataList = objectMapper.readValue(
	            getClass().getClassLoader().getResourceAsStream("dummy_performances.json"),
	            new TypeReference<List<PerformanceDummyData>>() {}
	        );

	        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	        for (PerformanceDummyData dummyData : dummyDataList) {
	            Performance performance = new Performance();
	            Musical musical = performanceRepository.findMuById(dummyData.getMusicalId());

	            if (musical == null) {
	                System.err.println("Invalid musicalId: " + dummyData.getMusicalId());
	                continue;
	            }

	            // 날짜에서 시간 제거
	            Calendar calendar = Calendar.getInstance();
	            calendar.setTime(dummyData.getPerformanceDate());
	            calendar.set(Calendar.HOUR_OF_DAY, 0);
	            calendar.set(Calendar.MINUTE, 0);
	            calendar.set(Calendar.SECOND, 0);
	            calendar.set(Calendar.MILLISECOND, 0);

	            performance.setMusical(musical);
	            performance.setHall_Info(musical.getHall_Info());
	            performance.setPerformance_date(calendar.getTime());
	            performance.setPerformance_start_time(dummyData.getPerformanceStartTime());

	            performanceRepository.savePf(performance);
	        }

	        System.out.println("더미 데이터가 성공적으로 저장되었습니다.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        System.err.println("더미 데이터 저장 중 오류 발생.");
	    }
    }

	public List<PerformanceSelectDTO> findPf(PerformanceReserveDTO request) {
		Long musical_id = request.getMusicalId();
		Date performance_date = request.getDate();
		
		List<PerformanceSelectDTO> performances = performanceRepository.findPfByIdAndDate(musical_id, performance_date);
		return performances;
	}

}
