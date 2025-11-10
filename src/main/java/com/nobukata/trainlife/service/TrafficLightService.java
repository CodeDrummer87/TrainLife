package com.nobukata.trainlife.service;

import com.nobukata.trainlife.dto.TrafficLightDto;
import com.nobukata.trainlife.repository.TrafficLightRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrafficLightService {

    private final TrafficLightRepository trafficLightRepository;

    public TrafficLightService(TrafficLightRepository trafficLightRepository) {
        this.trafficLightRepository = trafficLightRepository;
    }

    public List<TrafficLightDto> findTrafficLightsByStationId(Integer stationId, Boolean isEven) {
        return trafficLightRepository.findTrafficLightsByStationId(stationId, isEven);
    }
}
