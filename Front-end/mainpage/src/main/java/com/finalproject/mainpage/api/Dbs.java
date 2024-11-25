package com.finalproject.mainpage.api;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import java.util.List;
/*
	KOPIS API에서 XML 데이터를 받아 Java 객체로 변환하기 위해 
	전체 XML을 감싸는 상위 클래스를 작성합니다.
 */

// Dbs 클래스는 XML의 루트 요소 <dbs>를 나타내며, <db> 요소들의 리스트를 가집니다.
public class Dbs {
	//<db> 요소가 리스트로 포함되도록 매핑
    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "db")
    private List<PerformanceData> db;

    public List<PerformanceData> getDb() {
        return db;
    }

    public void setDb(List<PerformanceData> db) {
        this.db = db;
    }
}

