package com.finalproject.mainpage.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import java.util.List;
/*
	KOPIS API에서 XML 데이터를 받아 Java 객체로 변환하기 위해 
	데이터를 담을 DTO(Data Transfer Object) 클래스를 작성합니다.
	XML 데이터의 구조와 일치하도록 필드와 어노테이션을 정의합니다.
 	**@JacksonXmlProperty**와 **@JacksonXmlElementWrapper**를 사용하여 
 	XML 데이터를 매핑합니다.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class PerformanceData {
	// 공연ID
    @JacksonXmlProperty(localName = "mt20id")
    private String mt20id;
    
	// 공연명
    @JacksonXmlProperty(localName = "prfnm")
    private String prfnm;

	// 공연시작일
    @JacksonXmlProperty(localName = "prfpdfrom")
    private String prfpdfrom;

	// 공연종료일
    @JacksonXmlProperty(localName = "prfpdto")
    private String prfpdto;

	// 공연시설명(공연장명)
    @JacksonXmlProperty(localName = "fcltynm")
    private String fcltynm;

	// 공연출연진
    @JacksonXmlProperty(localName = "prfcast")
    private String prfcast;

	// 공연제작진
    @JacksonXmlProperty(localName = "prfcrew")
    private String prfcrew;

	// 공연 런타임
    @JacksonXmlProperty(localName = "prfruntime")
    private String prfruntime;
    
    // 공연 관람 연령
    @JacksonXmlProperty(localName = "prfage")
    private String prfage;
    
    // 기획제작사
    @JacksonXmlProperty(localName = "entrpsnm")
    private String entrpsnm;
    
    // 티켓가격
    @JacksonXmlProperty(localName = "pcseguidance")
    private String pcseguidance;
    
    // 포스터이미지경로
    @JacksonXmlProperty(localName = "poster")
    private String poster;
    
    // 줄거리
    @JacksonXmlProperty(localName = "sty")
    private String sty;
    
    // 지역
    @JacksonXmlProperty(localName = "area")
    private String area;
    
    // 공연시설ID
    @JacksonXmlProperty(localName = "mt10id")
    private String mt10id;
    
    // 공연시간
    @JacksonXmlProperty(localName = "dtguidance")
    private String dtguidance;

	// 소개이미지목록    
    @JacksonXmlElementWrapper(localName = "styurls")
    @JacksonXmlProperty(localName = "styurl")
    private List<String> styurls;

    // Getter와 Setter
    public String getMt20id() {
        return mt20id;
    }

    public void setMt20id(String mt20id) {
        this.mt20id = mt20id;
    }

    public String getPrfnm() {
        return prfnm;
    }

    public void setPrfnm(String prfnm) {
        this.prfnm = prfnm;
    }

    public String getPrfpdfrom() {
        return prfpdfrom;
    }

    public void setPrfpdfrom(String prfpdfrom) {
        this.prfpdfrom = prfpdfrom;
    }

    public String getPrfpdto() {
        return prfpdto;
    }

    public void setPrfpdto(String prfpdto) {
        this.prfpdto = prfpdto;
    }

    public String getFcltynm() {
        return fcltynm;
    }

    public void setFcltynm(String fcltynm) {
        this.fcltynm = fcltynm;
    }

    public String getPrfcast() {
        return prfcast;
    }

    public void setPrfcast(String prfcast) {
        this.prfcast = prfcast;
    }

    public String getPrfcrew() {
        return prfcrew;
    }

    public void setPrfcrew(String prfcrew) {
        this.prfcrew = prfcrew;
    }

    public List<String> getStyurls() {
        return styurls;
    }

    public void setStyurls(List<String> styurls) {
        this.styurls = styurls;
    }
    
    public String getPrfruntime() {
        return prfruntime;
    }

    public void setPrfruntime(String prfruntime) {
        this.prfruntime = prfruntime;
    }

	public String getPrfage() {
		return prfage;
	}

	public void setPrfage(String prfage) {
		this.prfage = prfage;
	}

	public String getEntrpsnm() {
		return entrpsnm;
	}

	public void setEntrpsnm(String entrpsnm) {
		this.entrpsnm = entrpsnm;
	}

	public String getPcseguidance() {
		return pcseguidance;
	}

	public void setPcseguidance(String pcseguidance) {
		this.pcseguidance = pcseguidance;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	public String getSty() {
		return sty;
	}

	public void setSty(String sty) {
		this.sty = sty;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getMt10id() {
		return mt10id;
	}

	public void setMt10id(String mt10id) {
		this.mt10id = mt10id;
	}

	public String getDtguidance() {
		return dtguidance;
	}

	public void setDtguidance(String dtguidance) {
		this.dtguidance = dtguidance;
	}
}
