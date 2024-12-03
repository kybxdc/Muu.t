package com.fp.muut.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class dbs_hallInfo {
	@JsonProperty("db")
    @JacksonXmlElementWrapper(useWrapping = false)
	private List<HallInfoDTO> HIDTOlist;
}
