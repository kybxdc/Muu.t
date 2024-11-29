package com.finalproject.mainpage.api;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.finalproject.mainpage.entity.Musical;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

public class KopisApiRunner2 {

    public void run() {
        try {
	        String url = "http://www.kopis.or.kr/openApi/restful/pblprfr/PF132238?service=3ca6587ae8704899b3e865e74484f3bb";
	    	
	    	EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
			EntityManager em = emf.createEntityManager();
			EntityTransaction tx = em.getTransaction();
			tx.begin();
			
		
			Musical musical = new Musical();
			musical.setMusicalTitle("title");
            // hall_id는 임시. 수정 필요
            musical.setHallId(1L);
            musical.setMusicalGenre("123");
            musical.setMusicalRunTime("123");
            musical.setMusicalArea("123");
            musical.setMusicalAge("123");
            musical.setMusicalEntrpsnm("123");
            musical.setMusicalImage("123");
            musical.setMusicalSeatGradeInfo("123");
            musical.setActor("123");

            // 날짜 형식 변환
//            SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd");
//            Date startDate = formatter.parse(getTagValue("prfpdfrom", element));
//            Date endDate = formatter.parse(getTagValue("prfpdto", element));
//            musical.setMusicalStartDate(startDate);
//            musical.setMusicalEndDate(endDate);
            
			em.persist(musical);
			
			tx.commit();
		}catch (Exception e) {
			e.printStackTrace();
		}
    }
}

