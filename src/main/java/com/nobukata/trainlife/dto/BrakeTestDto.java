package com.nobukata.trainlife.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BrakeTestDto {

    private final Integer id;
    private final String requiredSpeed;
    private final String section;
    private final String point;
}
