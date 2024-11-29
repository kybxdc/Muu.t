package com.finalproject.mainpage.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class MusicalDTO {
	@JsonProperty("prfnm")
	private String musicalTitle;
	
	@JsonProperty("sty")
	private String musicalDescription;

	@JsonProperty("genrenm")
	private String musicalGenre;
	
	@JsonProperty("prfruntime")
	private String musicalRunTime;
	
	@JsonProperty("area")
	private String musicalArea;
	
	@JsonProperty("prfage")
	private String musicalAge;
	
	@JsonProperty("entrpsnm")
	private String musicalEntrpsnm;
	
	@JsonProperty("poster")
	private String musicalImage;
	
	@JsonProperty("pcseguidance")
	private String musicalSeatGradeInfo;
	
	@JsonProperty("prfpdfrom")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private java.util.Date musicalStartDate;
	
	@JsonProperty("prfpdto")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private java.util.Date musicalEndDate;
	
	@JsonProperty("prfcast")
	private String actor;
	
	
	public void setMusicalTitle(String musicalTitle) {
		this.musicalTitle = musicalTitle;
	}
	
	public void setMusicalDescription(String musicalDescription) {
		this.musicalDescription = musicalDescription;
	}
	
	public void setMusicalGenre(String musicalGenre) {
		this.musicalGenre = musicalGenre;
	}
	
	public void setMusicalRunTime(String musicalRunTime) {
		this.musicalRunTime = musicalRunTime;
	}
	
	public void setMusicalArea(String musicalArea) {
		this.musicalArea = musicalArea;
	}
	
	public void setMusicalAge(String musicalAge) {
		this.musicalAge = musicalAge;
	}
	
	public void setMusicalEntrpsnm(String musicalEntrpsnm) {
		this.musicalEntrpsnm = musicalEntrpsnm;
	}
	
	public void setMusicalImage(String musicalImage) {
		this.musicalImage = musicalImage;
	}
	
	public void setMusicalSeatGradeInfo(String musicalSeatGradeInfo) {
		this.musicalSeatGradeInfo = musicalSeatGradeInfo;
	}
	
	public void setMusicalStartDate(java.util.Date musicalStartDate) {
		this.musicalStartDate = musicalStartDate;
	}
	
	
	public void setMusicalEndDate(java.util.Date musicalEndDate) {
		this.musicalEndDate = musicalEndDate;
	}
	
	public void setActor(String actor) {
		this.actor = actor;
	}
	
	
}
