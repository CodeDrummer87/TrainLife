package com.nobukata.trainlife.service;

import com.nobukata.trainlife.dto.StationTitleDto;
import com.nobukata.trainlife.repository.StationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationService {

    private final StationRepository stationRepository;

    public StationService(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    public List<StationTitleDto> getAllStations(Integer allocationId) {
        return stationRepository.findAllStationsByAllocationId(allocationId);
    }

    public List<StationTitleDto> getBaseStations(Integer allocationId) {
        return stationRepository.findStationsWithTurnoutByAllocationId(allocationId);
    }
}
