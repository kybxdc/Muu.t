package com.fp.muut.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class HallInfoDTO {
	@JsonProperty("fcltynm")
	private String hall_name;
	
	@JsonProperty("adres")
	private String hall_addr;
	
}
