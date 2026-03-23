from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

class TextRequest(BaseModel):
    text: str


def basic_mapping(label: str) -> str:
    mapping = {
        "joy": "Happy",
        "sadness": "Sad",
        "anger": "Angry",
        "fear": "Anxious",
        "love": "Calm",
        "neutral": "Neutral",
        "disgust": "Angry"
    }
    return mapping.get(label, "Neutral")


def smart_mood_decision(top_label: str, second_label: str) -> str:

    # Special handling for surprise
    if top_label == "surprise":
        if second_label == "joy":
            return "Happy"
        if second_label == "sadness":
            return "Sad"
        if second_label == "fear":
            return "Anxious"
        if second_label == "anger":
            return "Angry"
        return "Neutral"

    return basic_mapping(top_label)


@app.post("/predict")
def predict_emotion(request: TextRequest):

    results = classifier(request.text)[0]
    results = sorted(results, key=lambda x: x["score"], reverse=True)

    top_emotion = results[0]
    second_emotion = results[1]

    final_mood = smart_mood_decision(
        top_emotion["label"],
        second_emotion["label"]
    )

    return {
        "modelTopEmotion": top_emotion["label"],
        "modelSecondEmotion": second_emotion["label"],
        "predictedMood": final_mood,
        "confidence": round(top_emotion["score"], 3),
        "emotionBreakdown": [
            {
                "emotion": r["label"],
                "score": round(r["score"], 3)
            }
            for r in results
        ]
    }