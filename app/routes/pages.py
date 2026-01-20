from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@router.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("auth/login.html", {"request": request})

@router.get("/register", response_class=HTMLResponse)
async def register_page(request: Request):
    return templates.TemplateResponse("auth/register.html", {"request": request})

@router.get("/search", response_class=HTMLResponse)
async def search_page(request: Request):
    return templates.TemplateResponse("search/search.html", {"request": request})

@router.get("/search/route/{route_id}", response_class=HTMLResponse)
async def route_detail_page(route_id: str, request: Request):
    return templates.TemplateResponse("search/route_detail.html", {"request": request, "route_id": route_id})

@router.get("/trip/dashboard", response_class=HTMLResponse)
async def trip_dashboard(request: Request):
    return templates.TemplateResponse("trip/dashboard.html", {"request": request})

@router.get("/trip/record", response_class=HTMLResponse)
async def trip_record(request: Request):
    return templates.TemplateResponse("trip/record.html", {"request": request})

@router.get("/trip/summary/{trip_id}", response_class=HTMLResponse)
async def trip_summary(trip_id: str, request: Request):
    return templates.TemplateResponse("trip/summary.html", {"request": request, "trip_id": trip_id})

@router.get("/trip/history", response_class=HTMLResponse)
async def trip_history(request: Request):
    return templates.TemplateResponse("trip/history.html", {"request": request})

@router.get("/trip/detail/{trip_id}", response_class=HTMLResponse)
async def trip_detail(trip_id: str, request: Request):
    return templates.TemplateResponse("trip/detail.html", {"request": request, "trip_id": trip_id})

@router.get("/path/manual", response_class=HTMLResponse)
async def manual_path_entry(request: Request):
    return templates.TemplateResponse("path/manual_entry.html", {"request": request})

@router.get("/profile", response_class=HTMLResponse)
async def profile_page(request: Request):
    return templates.TemplateResponse("profile/profile.html", {"request": request})
