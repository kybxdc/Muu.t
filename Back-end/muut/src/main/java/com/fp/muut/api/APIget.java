package com.fp.muut.api;

import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fp.muut.dto.Dbs;

public class APIget {
	private String response;
	
	public void run() {
        // 서비스 키와 URL 설정
        String url = "http://www.kopis.or.kr/openApi/restful/pblprfr/PF132238?service=3ca6587ae8704899b3e865e74484f3bb";

        // RestTemplate을 사용하여 API 요청
        RestTemplate restTemplate = new RestTemplate();
        response = restTemplate.getForObject(url, String.class);
        
        


        // 콘솔에 XML 데이터 출력
//        System.out.println("Received XML Data: \n" + response);
    }

	public String getResponse() {
		return response;
	}

}
