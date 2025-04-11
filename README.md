# Coding Challenge: Sales Dashboard with Next.js, FastAPI & LLM Google Gemini API

## Getting Started

1. **Clone or Download** this repository.
2. **Backend Setup**  
   - Navigate to the `backend` directory.  
   - Create a virtual environment (optional but recommended).  
   - Install dependencies:  
     ```bash
     pip install -r requirements.txt
     ```  
   - Run the server:  
     ```bash
     uvicorn main:app --host 0.0.0.0 --port 8000 --reload
     ```  
   - Confirm the API works by visiting `http://localhost:8000/docs`.

3. **Frontend Setup**  
   - Navigate to the `frontend` directory.  
   - Install dependencies:  
     ```bash
     npm install
     ```  
   - Start the development server:  
     ```bash
     npm run dev
     ```  
   - Open `http://localhost:3000` to view your Next.js app.

---

## Overview
### Brief Explanation of Design Choices

1. User-Centric Focus:
The dashboard prominently highlights individual users (e.g., Alice), helping team members focus on their performance and data. This improves personalization and task clarity.

2. Clean, Minimal UI:
The interface uses a soft color palette and ample white space, which enhances readability and reduces cognitive load. Tags like “CRM” and “Negotiation” are styled as pill buttons, offering quick context.

3. Data Visualization:
A donut chart is used for "Deals by Status," which quickly conveys distribution of deal stages (Closed Won, In Progress, Closed Lost) with clear color-coding and dollar values.

4. Component-Based Layout:
The interface is split into modular sections—profile, deals, clients, and analytics—allowing users to easily scan and find information.

5. Interactive Navigation:
Horizontal scrolling chips at the top (with team members’ names) offer easy context switching. This allows for quick browsing across sales team data.

### Potential Improvements

Interaction Cues:
1. Add hover or click effects to interactive elements like deals and user chips to reinforce interactivity.
2. Consider a “View All Deals” or “More Info” link/button to allow deeper navigation into deal details.

Filtering & Search Enhancement:
1. The search bar is prominent, but a filter dropdown for “Deal Status” or “Client Type” near the deals list could improve data interaction.
---