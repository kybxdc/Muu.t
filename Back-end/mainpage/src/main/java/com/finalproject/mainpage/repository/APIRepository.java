package com.finalproject.mainpage.repository;

import java.io.IOException;

import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.finalproject.mainpage.dto.Dbs;
import com.finalproject.mainpage.dto.MusicalDTO;
import com.finalproject.mainpage.querydsl.entity.Musical;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class APIRepository {
	private final EntityManager em;
	
	public void save(String musicalId) throws IOException{
		String url = "http://www.kopis.or.kr/openApi/restful/pblprfr/"+musicalId+"?service=3ca6587ae8704899b3e865e74484f3bb";

        // RestTemplate을 사용하여 API 요청
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        
        // XmlMapper를 사용하여 XML 문자열을 객체로 변환
        XmlMapper xmlMapper = new XmlMapper();
        Dbs dbs = xmlMapper.readValue(response, Dbs.class);
        
		Musical musical = new Musical();
		if (dbs != null && dbs.getMuDTOlist() != null) {
            for (MusicalDTO mdto : dbs.getMuDTOlist()) {
            	musical.setMusicalTitle(mdto.getMusicalTitle());
            	// hall_id는 임시. 수정 필요
            	musical.setHallId(1L);
            	musical.setMusicalGenre(mdto.getMusicalGenre());
            	musical.setMusicalRunTime(mdto.getMusicalRunTime());
            	musical.setMusicalArea(mdto.getMusicalArea());
            	musical.setMusicalAge(mdto.getMusicalAge());
            	musical.setMusicalEntrpsnm(mdto.getMusicalEntrpsnm());
            	musical.setMusicalImage(mdto.getMusicalImage());
            	musical.setMusicalSeatGradeInfo(mdto.getMusicalSeatGradeInfo());
            	musical.setActor(mdto.getActor());
            	musical.setMusicalStartDate(mdto.getMusicalStartDate());
            	musical.setMusicalEndDate(mdto.getMusicalEndDate());
            }
		}
        
        em.persist(musical);
	}
	
}
