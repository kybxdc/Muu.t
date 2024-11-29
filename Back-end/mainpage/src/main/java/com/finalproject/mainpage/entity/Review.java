package com.finalproject.mainpage.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//@Entity
@Table(name = "REVIEW")
@Getter @Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId; // 리뷰 ID

//    @ManyToOne
    @JoinColumn(name = "customer_num")
    private Customer customer; // 고객과의 연관관계

//    @ManyToOne
    @JoinColumn(name = "musical_id")
    private Musical musical; // 뮤지컬과의 연관관계

    @Column(name = "review_score")
    private int reviewScore; // 리뷰 점수

    @Column(name = "review_content", length = 1000)
    private String reviewContent; // 리뷰 내용

    @Column(name = "review_date")
    private java.util.Date reviewDate; // 리뷰 날짜
}
