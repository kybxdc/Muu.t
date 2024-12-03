package com.fp.muut.login;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class CustomerLoginDto {
	
	private String customer_id;
	private String customer_pw;
	
	
	

}
