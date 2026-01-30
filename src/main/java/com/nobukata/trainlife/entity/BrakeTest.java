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
@Table(name = "brake_tests")
public class BrakeTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "railway_section")
    private String section;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station stationId;

    @Column(name = "is_even_direction")
    private Boolean isEvenDirection;
    @Column(name = "required_speed")
    private String requiredSpeed;
    private String point;
}
