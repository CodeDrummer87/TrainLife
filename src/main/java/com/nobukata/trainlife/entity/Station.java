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
@Table(name = "stations")
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    @Column(name = "railway_id")
    private Integer railwayId;
    private String code;
    @Column(name = "has_turnout_point")
    private Boolean hasTurnoutPoint;
    @Column(name = "is_observed")
    private Boolean isObserved;
}
