package com.nobukata.trainlife.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "locomotive_depots")
public class LocomotiveDepot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "railway_id")
    private Railway railwayId;
    @Column(name = "short_title")
    private String shortTitle;
    @Column(name = "full_title")
    private String fullTitle;
    private String address;
    private String code;
}
