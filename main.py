from fastapi import FastAPI, File, UploadFile
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from DlibActuator import DlibActuator

app = FastAPI()
dlib = DlibActuator()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process_images")
def process_images(files: List[UploadFile] = File(...)):
    image_paths = []
    for file in files:
        with open(f"./uploads/{file.filename}", "wb") as buffer:
            buffer.write(file.file.read())
        image_paths.append(f"./uploads/{file.filename}")

    result = dlib.process_images(image_paths)

    return result

@app.get("/check_api")
def check_api():
    return {"status": "API is working correctly"}