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
@Table(name = "stations_locomotive_depots")
public class StationsLocomotiveDepots {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station stationId;

    @ManyToOne
    @JoinColumn(name = "locomotive_depot_id")
    private LocomotiveDepot locomotiveDepotId;
}
