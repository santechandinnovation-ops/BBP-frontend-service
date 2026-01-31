# BBP Frontend Service

Web frontend for the Best Bike Paths (BBP) application.

## Overview

A server-side rendered web application built with FastAPI and Jinja2 templates. Provides the user interface for searching bike paths, recording trips, and managing user profiles.

## Features

- **Path Search**: Find bike-friendly routes between locations
- **Trip Recording**: GPS-based trip tracking with live map
- **Trip History**: View past trips with statistics
- **User Authentication**: Login/register functionality
- **PWA Support**: Installable as a Progressive Web App

## Tech Stack

- FastAPI
- Jinja2 Templates
- Leaflet.js (maps)
- Bootstrap 5
- Vanilla JavaScript

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/login` | User login |
| `/register` | User registration |
| `/search` | Path search |
| `/trip/record` | Record new trip |
| `/trip/history` | Trip history |
| `/trip/dashboard` | Trip dashboard |
| `/profile` | User profile |

## Project Structure

```
app/
├── main.py
├── routes/
│   └── pages.py
├── static/
│   ├── css/
│   ├── js/
│   └── icons/
└── templates/
    ├── base.html
    ├── auth/
    ├── search/
    ├── trip/
    └── profile/
```

## Running Locally

```bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8004
```

## Deployment

Deployed on Railway. See `Procfile` for startup command.
