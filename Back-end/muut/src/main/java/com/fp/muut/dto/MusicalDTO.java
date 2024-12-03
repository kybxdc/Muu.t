package com.fp.muut.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class MusicalDTO {
	@JsonProperty("prfnm")
	private String musicalTitle;
	
	@JsonProperty("styurls")
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
	
}
