package com.nobukata.trainlife.rest;

import com.nobukata.trainlife.dto.StationTitleDto;
import com.nobukata.trainlife.repository.StationRepository;
import com.nobukata.trainlife.service.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stations")
public class StationController {

    private final StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    @GetMapping("/allocations/{allocationId}/station-list")
    public ResponseEntity<List<StationTitleDto>> getAllStations(@PathVariable int allocationId) {
        try {
            List<StationTitleDto> stations = stationService.getAllStations(allocationId);
            return ResponseEntity.ok(stations);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/allocations/{allocationId}/base-station-list")
    public ResponseEntity<List<StationTitleDto>> getBaseStations(@PathVariable int allocationId) {
        try {
            List<StationTitleDto> stations = stationService.getBaseStations(allocationId);
            return ResponseEntity.ok(stations);
        } catch(Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
