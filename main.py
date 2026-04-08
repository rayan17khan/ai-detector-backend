from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "API running 🚀"}

def detect_ai_image(path):
    confidence = random.randint(70, 95)

    if confidence > 80:
        return {"label": "AI Generated", "confidence": confidence}
    else:
        return {"label": "Real Image", "confidence": confidence}

@app.post("/detect/")
async def detect(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return detect_ai_image(file_path)