package com.fp.muut.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class MusicalDTO {
	@JsonProperty("mt20id") 
    private String musicalId;
	
	@JsonProperty("prfnm")
	private String musicalTitle;
	
	@JsonProperty("styurls")
	private List<String> musicalDescription;

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
	private Date musicalStartDate;
	
	@JsonProperty("prfpdto")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private Date musicalEndDate;
	
	@JsonProperty("prfcast")
	private String actor;
		
	@JsonProperty("mt10id")
	private String hall_API_id;
	
	private String hall_name;
	private String hall_addr;
}
