package com.finalproject.mainpage.api;

import com.finalproject.mainpage.querydsl.entity.Musical;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class KopisApiRunner {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void run() {
        try {
            // API 호출 및 데이터 처리
            String url = "http://www.kopis.or.kr/openApi/restful/pblprfr/PF132238?service=3ca6587ae8704899b3e865e74484f3bb";
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            // XML 파싱
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(response.getBytes("UTF-8")));
            doc.getDocumentElement().normalize();

            NodeList nList = doc.getElementsByTagName("db");
            for (int i = 0; i < nList.getLength(); i++) {
                Node node = nList.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;

                    Musical musical = new Musical();
                    musical.setMusicalTitle(getTagValue("prfnm", element));
                    // hall_id는 임시. 수정 필요
                    musical.setHallId(1L);
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
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("API 데이터 저장 중 오류 발생", e);
        }
    }

    private String getTagValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag).item(0).getChildNodes();
        Node node = nodeList.item(0);
        return node == null ? null : node.getNodeValue();
    }
}

