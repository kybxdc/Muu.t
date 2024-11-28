package com.finalproject.mainpage.querydsl.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//@Entity
@Table(name = "MUSICAL_DETAIL")
@Getter @Setter
public class MusicalDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "performance_id")
    private Long performanceId; // 공연 ID

    @ManyToOne
    @JoinColumn(name = "musical_id")
    private Musical musical; // 뮤지컬과의 연관관계

    @ManyToOne
    @JoinColumn(name = "hall_id")
    private HallInfo hallInfo; // 공연장과의 연관관계

    @Column(name = "performance_date")
    private java.util.Date performanceDate; // 공연 날짜

    @Column(name = "performance_start_time", length = 100)
    private String performanceStartTime; // 공연 시작 시간

}