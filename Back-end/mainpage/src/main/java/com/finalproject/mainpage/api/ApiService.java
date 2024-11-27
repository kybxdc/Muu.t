package com.finalproject.mainpage.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiService {

    private final ApiKeyConfig apiKeyConfig;
    private final RestTemplate restTemplate;

    @Autowired
    public ApiService(ApiKeyConfig apiKeyConfig) {
        this.apiKeyConfig = apiKeyConfig;
        this.restTemplate = new RestTemplate(); // RestTemplate 객체 생성
    }

    public String getPerformanceData(String performanceId) {
        String serviceKey = apiKeyConfig.getServiceKey();
        String apiUrl = "http://localhost:9090/api/performance?performanceId=" + performanceId + "&serviceKey=" + serviceKey;

        // RestTemplate을 사용해 API 호출 및 응답 받기
        String response = restTemplate.getForObject(apiUrl, String.class);
        return response;
    }
}

