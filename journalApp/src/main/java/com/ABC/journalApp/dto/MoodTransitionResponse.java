package com.ABC.journalApp.dto;

import java.util.Map;

public class MoodTransitionResponse {

    private Map<String, Long> transitions;

    public MoodTransitionResponse(Map<String, Long> transitions) {
        this.transitions = transitions;
    }

    public Map<String, Long> getTransitions() {
        return transitions;
    }
}