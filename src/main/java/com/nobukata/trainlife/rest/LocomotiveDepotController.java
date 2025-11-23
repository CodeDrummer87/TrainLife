package com.nobukata.trainlife.rest;

import com.nobukata.trainlife.dto.DepotListDto;
import com.nobukata.trainlife.service.LocomotiveDepotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/locomotive-depots")
public class LocomotiveDepotController {

    private final LocomotiveDepotService locomotiveDepotService;

    public LocomotiveDepotController(LocomotiveDepotService locomotiveDepotService) {
        this.locomotiveDepotService = locomotiveDepotService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<DepotListDto>> getDepotList() {
        try {
            List<DepotListDto> depots = locomotiveDepotService.getLocomotiveDepots();
            return ResponseEntity.ok(depots);
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
