package com.nobukata.trainlife.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BrakeShoesDto {

        @NotNull
        @Min(value = 4, message = "Количество тормозных башмаков не может быть менее 4-х")
        @Max(value = 40, message = "Количество тормозных башмаков не может быть более 40")
        private final Integer serviceable;
        private final Integer broken;
}
