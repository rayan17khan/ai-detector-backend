from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import cv2
import numpy as np

app = FastAPI()

# Enable CORS (for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "working 🚀"}

# AI detection function (fast method)
def detect_ai_image(path):
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    edges = cv2.Canny(gray, 100, 200)
    variance = np.var(gray)
    edge_density = np.sum(edges) / (edges.shape[0] * edges.shape[1])

    score = (variance * 0.6) + (edge_density * 1000 * 0.4)
    confidence = int(min(max(score / 10, 50), 95))

    if score < 500:
        return {"label": "AI Generated", "confidence": confidence}
    else:
        return {"label": "Real Image", "confidence": confidence}

@app.post("/detect/")
async def detect(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = detect_ai_image(file_path)

    return result