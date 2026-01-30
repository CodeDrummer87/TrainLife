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
@Table(name = "brake_tests_locomotive_depots")
public class BrakeTestsLocomotiveDepots {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "brake_test_id")
    private BrakeTest brakeTest;

    @ManyToOne
    @JoinColumn(name = "locomotive_depot_id")
    private LocomotiveDepot locomotiveDepot;

}
