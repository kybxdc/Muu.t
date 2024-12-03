package com.fp.muut.entity.embedded;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class ReviewPK implements Serializable{
	private Long customer_num;
	private Long musical_id;
}
