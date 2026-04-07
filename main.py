from transformers import AutoImageProcessor, SiglipForImageClassification
from PIL import Image
import torch

model_name = "prithivMLmods/deepfake-detector-model-v1"

model = SiglipForImageClassification.from_pretrained(model_name)
processor = AutoImageProcessor.from_pretrained(model_name)

def detect_ai_image(path):
    image = Image.open(path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=1)[0]

    fake_prob = probs[0].item()
    real_prob = probs[1].item()

    if fake_prob > real_prob:
        return {
            "label": "AI Generated",
            "confidence": round(fake_prob * 100)
        }
    else:
        return {
            "label": "Real Image",
            "confidence": round(real_prob * 100)
        }