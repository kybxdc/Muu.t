package com.finalproject.mainpage.querydsl.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "DISCOUNT")
@Getter @Setter
public class Discount {
    @Id
    @Column(name = "customer_grade", length = 100)
    private String customerGrade; // 등급명

    @Column(name = "discount_rate", length = 100)
    private String discountRate; // 할인율

    @OneToMany(mappedBy = "discount")
    private List<Customer> customers = new ArrayList<>(); // 고객 목록
}
