package com.nobukata.trainlife.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TrainSecuringRequestDto {

    private final String key;
    private final Integer weight;
    private final BrakeShoesDto brakeShoes;
    private final Boolean isLoadedTrain;
    private final Boolean isSelectiveBraking;
}
