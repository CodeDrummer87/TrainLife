package com.nobukata.trainlife.rest;

import com.nobukata.trainlife.dto.BrakeTestDto;
import com.nobukata.trainlife.service.BrakeTestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/brake-tests")
public class BrakeTestController {

    private final BrakeTestService brakeTestService;

    public BrakeTestController(BrakeTestService brakeTestService) {
        this.brakeTestService = brakeTestService;
    }

    @GetMapping
    public ResponseEntity<List<BrakeTestDto>> getBrakeTestList(
            @RequestParam("depot-id") Integer depotId,
            @RequestParam("is-even-direction") Boolean isEvenDirection) {
        try {
            List<BrakeTestDto> tests = brakeTestService.getBrakeTestList(depotId, isEvenDirection);
            return ResponseEntity.ok(tests);
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
