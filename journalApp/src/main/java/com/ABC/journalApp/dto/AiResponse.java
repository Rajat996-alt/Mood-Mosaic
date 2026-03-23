package com.ABC.journalApp.dto;

public class AiResponse {

    private String predictedMood;
    private double confidence;

    public String getPredictedMood() {
        return predictedMood;
    }

    public void setPredictedMood(String predictedMood) {
        this.predictedMood = predictedMood;
    }

    public double getConfidence() {
        return confidence;
    }

    public void setConfidence(double confidence) {
        this.confidence = confidence;
    }
}