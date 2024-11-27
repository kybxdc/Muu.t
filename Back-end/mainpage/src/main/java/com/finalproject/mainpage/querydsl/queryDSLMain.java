package com.finalproject.mainpage.querydsl;

import com.finalproject.mainpage.querydsl.entity.Musical;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.text.SimpleDateFormat;
import java.util.Date;

public class queryDSLMain {

	public static void main(String[] args) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
		EntityManager em = emf.createEntityManager();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		
		try {
			// API에서 XML 데이터 가져오기
            String response = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><dbs> ~~~ </dbs>";

            // XML 파싱
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new java.io.ByteArrayInputStream(response.getBytes("UTF-8")));
            doc.getDocumentElement().normalize();

            NodeList nList = doc.getElementsByTagName("db");
            for (int i = 0; i < nList.getLength(); i++) {
                Node node = nList.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;

                    Musical musical = new Musical();
                    musical.setMusicalTitle(getTagValue("prfnm", element));
                    musical.setMusicalGenre(getTagValue("genrenm", element));
                    musical.setMusicalRunTime(getTagValue("prfruntime", element));
                    musical.setMusicalArea(getTagValue("area", element));
                    musical.setMusicalAge(getTagValue("prfage", element));
                    musical.setMusicalEntrpsnm(getTagValue("entrpsnm", element));
                    musical.setMusicalImage(getTagValue("poster", element));
                    musical.setMusicalSeatGradeInfo(getTagValue("pcseguidance", element));
                    musical.setActor(getTagValue("prfcast", element));

                    // 날짜 형식 변환
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd");
                    Date startDate = formatter.parse(getTagValue("prfpdfrom", element));
                    Date endDate = formatter.parse(getTagValue("prfpdto", element));
                    musical.setMusicalStartDate(startDate);
                    musical.setMusicalEndDate(endDate);

                    // 엔티티 매니저를 통해 DB에 데이터 저장
                    em.persist(musical);
                }
            }
			
			tx.commit();
		}catch (Exception e) {
			e.printStackTrace();
			tx.rollback();
		}finally {
			em.close();
			emf.close();
		}
	}
}
