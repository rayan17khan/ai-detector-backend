from fastapi import FastAPI, UploadFile, File
import shutil

app = FastAPI()

def detect_ai_image(path):
    return "✅ Likely Real Image"

@app.get("/")
def home():
    return {"message": "API is running 🚀"}

@app.post("/detect/")
async def detect(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = detect_ai_image(file_path)

    return {"result": result}