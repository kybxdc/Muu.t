package com.finalproject.mainpage.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiKeyConfig {

    @Value("${api.service.key}")
    private String serviceKey;

    public String getServiceKey() {
        return serviceKey;
    }
}

