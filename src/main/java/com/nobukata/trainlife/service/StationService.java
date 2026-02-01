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

    public List<StationTitleDto> getAllStations(Integer depotId) {
        return stationRepository.findAllStationsByAllocationId(depotId);
    }

    public List<StationTitleDto> getBaseStations(Integer depotId) {
        return stationRepository.findStationsWithTurnoutByAllocationId(depotId);
    }

    public List<StationTitleDto> getObservedStations(Integer depotId) {
        return stationRepository.findObservedStations(depotId);
    }
}
