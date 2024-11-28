package com.finalproject.mainpage.querydsl.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//@Entity
@Table(name = "EXPECTATION")
@Getter @Setter
public class Expectation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expectation_id")
    private Long expectationId; // 기대 ID

    @ManyToOne
    @JoinColumn(name = "customer_num")
    private Customer customer; // 고객과의 연관관계

    @ManyToOne
    @JoinColumn(name = "musical_id")
    private Musical musical; // 뮤지컬과의 연관관계

    @Column(name = "expectation_content", length = 1000)
    private String expectationContent; // 기대 내용

    @Column(name = "expectation_date")
    private java.util.Date expectationDate; // 기대 작성 날짜
}
