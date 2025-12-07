package com.nobukata.trainlife.util;

import com.nobukata.trainlife.dto.TrainSecuringRequestDto;
import org.springframework.stereotype.Component;

@Component
public class TrainSecuringCalculator {

    public String calculateTrainSecuring(TrainSecuringRequestDto dto) {

        float loadFactor = dto.getIsLoadedTrain() ? 0.3F : 0.8F;
        int brakingFactor = dto.getIsSelectiveBraking() ? 2 : 4;
        float brakeShoeHoldingWeight = dto.getIsLoadedTrain() ? 333.333F : 125F;
        int availableBrakeShoes = dto.getBrakeShoes().getServiceable() - dto.getBrakeShoes().getBroken();

        float result = (float)Math.ceil(availableBrakeShoes * 100 / loadFactor);

        if (result >= dto.getWeight()) {
            result = (float)Math.ceil(dto.getWeight() / brakeShoeHoldingWeight);
            return (int)result + "ТБ (" + (dto.getIsLoadedTrain() ? "гружёный)" : "порожний)");
        } else {
            result = dto.getWeight() - result;
            result = (float) Math.ceil(result * 0.8F / 100F);
            result = (float) Math.ceil(result / brakingFactor);

            String trainLoadingType = dto.getIsLoadedTrain() ? "гружёный" : "порожний";
            String brakingType = dto.getIsSelectiveBraking() ? "" : "не";
            return (availableBrakeShoes) + "ТБ - " + (int) result + "РТ (" +
                    trainLoadingType + ", " + brakingType + "разд. торм-е)";
        }
    }
}
