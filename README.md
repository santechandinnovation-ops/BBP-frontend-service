# BBP Frontend Service

Progressive Web App (PWA) frontend for the Best Bike Paths system.

## Features

- **Guest User**
  - Search bike routes by origin/destination
  - View route details with segments and obstacles
  - Interactive map visualization

- **Authenticated User**
  - Register and login
  - Record bike trips with GPS tracking
  - View trip history and details
  - Create manual paths with segments
  - Report obstacles

## Tech Stack

- **Backend**: FastAPI + Jinja2 templates
- **Frontend**: Vanilla JavaScript + Bootstrap 5
- **Maps**: Leaflet.js + OpenStreetMap tiles
- **PWA**: Service Worker (basic, no offline caching)

## API Communication

The frontend communicates ONLY with the API Gateway service:
- Base URL: `API_GATEWAY_URL` environment variable
- All API calls go through `/api/*` endpoints
- JWT tokens stored in localStorage

## Local Development

### Prerequisites

- Python 3.11+
- API Gateway running on http://localhost:8080

### Setup

```bash
cd frontend-service

# Install dependencies
pip install -r requirements.txt

# Configure environment
# Edit .env file to set API_GATEWAY_URL

# Run the service
uvicorn app.main:app --reload --port 8004
```

Frontend will be available at http://localhost:8004

## Environment Variables

```env
API_GATEWAY_URL=http://localhost:8080
JWT_SECRET_KEY=bbp-secret-key-2024
PORT=8004
```

## Deployment

### Railway

1. Push code to Git repository
2. Create new Railway project
3. Connect repository
4. Configure environment variables:
   - `API_GATEWAY_URL` (URL of deployed API Gateway)
5. Railway auto-deploys using Procfile

## Project Structure

```
frontend-service/
├── app/
│   ├── main.py                 # FastAPI application
│   ├── config/
│   │   └── settings.py         # Configuration
│   ├── routes/
│   │   └── pages.py            # HTML page routes
│   ├── templates/              # Jinja2 templates
│   │   ├── base.html          # Base layout
│   │   ├── auth/              # Login/register
│   │   ├── search/            # Route search
│   │   ├── trip/              # Trip recording
│   │   ├── path/              # Manual path entry
│   │   └── profile/           # User profile
│   └── static/
│       ├── css/               # Custom styles
│       ├── js/                # JavaScript files
│       ├── icons/             # PWA icons
│       ├── manifest.json      # PWA manifest
│       └── sw.js              # Service Worker
├── requirements.txt
├── Procfile
└── README.md
```

## GPS Tracking Implementation

During trip recording:
- GPS coordinates captured every 1-5 seconds
- Batch sent to backend every 5 seconds
- Backend calculates statistics (distance, speed)
- Frontend fetches updated stats every 10 seconds
- Real-time polyline visualization on map

## Manual Path Entry

1. Click on map to draw path
2. Finish drawing
3. Path automatically creates one segment
4. Split segment at specific points
5. Assign status to each segment (OPTIMAL/MEDIUM/SUFFICIENT/REQUIRES_MAINTENANCE)
6. Optionally add obstacles (click map to place)
7. Save with publishable checkbox

## Notes

- No automated path recording implemented
- No offline functionality (service worker is minimal)
- All data fetched from API Gateway
- JWT authentication required for protected features
