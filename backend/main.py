from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import json
import google.generativeai as genai
from dotenv import load_dotenv
import os
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI model
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    logger.error("OPENAI_API_KEY not found in environment variables.")
    raise RuntimeError("API key missing")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.0-flash")

# Load dummy data
DUMMY_DATA = {"salesReps": []}
try:
    with open("dummyData.json", "r") as f:
        DUMMY_DATA = json.load(f)
except FileNotFoundError:
    logger.warning("dummyData.json not found. Using empty default.")
except json.JSONDecodeError:
    logger.error("Error decoding dummyData.json. Using empty default.")

# Routes

@app.get("/api/data")
def get_data():
    """Return the complete dummy data."""
    return DUMMY_DATA

@app.get("/api/sales-reps")
def get_sales_reps():
    """Return a list of sales representatives."""
    return {"salesReps": DUMMY_DATA.get("salesReps", [])}

@app.get("/api/sales-reps/{rep_id}")
def get_sales_rep_by_id(rep_id: int):
    """Return a specific sales representative by ID."""
    sales_reps = DUMMY_DATA.get("salesReps", [])
    rep = next((rep for rep in sales_reps if rep.get("id") == rep_id), None)

    if rep:
        return {"salesRep": rep}
    raise HTTPException(status_code=404, detail="Sales representative not found")

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    """Accept a question and return a response from the AI model."""
    try:
        body = await request.json()
        user_question = body.get("question")

        if not user_question:
            raise HTTPException(status_code=400, detail="No question provided")

        response = model.generate_content(user_question)
        return {"answer": response.text}

    except HTTPException as http_ex:
        raise http_ex

    except Exception as e:
        logger.exception("AI processing failed")
        return JSONResponse(
            content={"error": f"An error occurred: {str(e)}"},
            status_code=500
        )

# Run the app
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
