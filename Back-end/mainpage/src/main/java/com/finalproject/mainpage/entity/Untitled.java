package com.finalproject.mainpage.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

//@Entity
@Table(name = "UNTITLED")
@Getter @Setter
public class Untitled {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hall_id")
    private Long hallId; // 공연장 ID

    @Column(name = "y", length = 255)
    private String y; // 임시 컬럼

    @ManyToOne
    @JoinColumn(name = "hall_id", insertable = false, updatable = false)
    private HallInfo hallInfo; // 공연장과의 연관관계
}
