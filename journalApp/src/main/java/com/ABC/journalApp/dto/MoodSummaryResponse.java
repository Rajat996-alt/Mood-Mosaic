package com.ABC.journalApp.dto;

public class MoodSummaryResponse {

    private long happy;
    private long sad;
    private long angry;
    private long anxious;   // NEW
    private long calm;
    private long neutral;

    public MoodSummaryResponse(
            long happy,
            long sad,
            long angry,
            long anxious,
            long calm,
            long neutral
    ) {
        this.happy = happy;
        this.sad = sad;
        this.angry = angry;
        this.anxious = anxious;
        this.calm = calm;
        this.neutral = neutral;
    }

    public long getHappy() { return happy; }
    public long getSad() { return sad; }
    public long getAngry() { return angry; }
    public long getAnxious() { return anxious; }
    public long getCalm() { return calm; }
    public long getNeutral() { return neutral; }
}