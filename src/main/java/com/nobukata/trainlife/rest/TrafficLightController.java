package com.nobukata.trainlife.rest;

import com.nobukata.trainlife.dto.TrafficLightDto;
import com.nobukata.trainlife.repository.TrafficLightRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/traffic-lights")
public class TrafficLightController {

    private final TrafficLightRepository trafficLightRepository;

    public TrafficLightController(TrafficLightRepository trafficLightRepository) {
        this.trafficLightRepository = trafficLightRepository;
    }

    @GetMapping("/station/{stationId}")
    public ResponseEntity<List<?>> getTrafficLightsByStationId(@PathVariable Integer stationId,
                                                               @RequestParam(required = true) Boolean isEven) {
        try {
            List<TrafficLightDto> trafficLightList = trafficLightRepository.findTrafficLightsByStationId(stationId, isEven);
            return ResponseEntity.ok(trafficLightList);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
