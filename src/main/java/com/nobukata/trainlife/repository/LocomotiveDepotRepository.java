package com.nobukata.trainlife.repository;

import com.nobukata.trainlife.dto.DepotListDto;
import com.nobukata.trainlife.entity.LocomotiveDepot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LocomotiveDepotRepository extends JpaRepository<LocomotiveDepot, Integer> {

    @Query("""
           SELECT NEW com.nobukata.trainlife.dto.DepotListDto(d.id, d.shortTitle, r.abbreviation)
           FROM LocomotiveDepot d
           JOIN d.railway r
           """)
    List<DepotListDto> findAllDepots();
}