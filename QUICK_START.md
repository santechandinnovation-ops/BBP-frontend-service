# Quick Start Guide

## Prerequisites

Before running the frontend, ensure these services are running:

1. **API Gateway** on port 8080
2. **User Management Service** on port 8000
3. **Trip Management Service** on port 8002
4. **Path Management Service** on port 8001

All backend services should be connected to their respective databases.

## Installation

```bash
cd frontend-service
pip install -r requirements.txt
```

## Configuration

Edit `.env` file:

```env
API_GATEWAY_URL=http://localhost:8080
JWT_SECRET_KEY=bbp-secret-key-2024
PORT=8004
```

## Run the Service

```bash
uvicorn app.main:app --reload --port 8004
```

The frontend will be available at: http://localhost:8004

## Testing the Application

### 1. Test Guest User Features

1. Open http://localhost:8004
2. Click "Search Routes"
3. Enter coordinates:
   - Origin: 45.4642, 9.1900
   - Destination: 45.4700, 9.2000
4. Click "Use Current Location" to test geolocation
5. Click "Search" to view routes

### 2. Test Registration

1. Go to http://localhost:8004/register
2. Fill in:
   - Username: testuser
   - Email: test@example.com
   - Password: TestPass123 (must have uppercase + number)
3. Click "Sign Up"
4. You should be redirected to login

### 3. Test Login

1. Go to http://localhost:8004/login
2. Enter credentials from registration
3. Click "Login"
4. You should be redirected to trip dashboard

### 4. Test Trip Recording

1. From dashboard, click "Start Recording"
2. Allow GPS permissions
3. You should see:
   - Live map with your position
   - Timer counting up
   - Distance, speed, and points updating
4. Walk/move around for 30 seconds
5. Click "Stop Recording"
6. View trip summary with statistics

### 5. Test Trip History

1. Go to "History" from bottom navigation
2. See list of completed trips
3. Click on a trip to view details
4. Map should show the route taken

### 6. Test Manual Path Creation

1. Go to "Record" → then to "/path/manual" manually or add navigation
2. Click on map to draw a path (at least 2 points)
3. Click "Finish Drawing"
4. Create segments and assign statuses
5. Optionally add obstacles by clicking "Add Obstacle"
6. Save the path

### 7. Test Profile

1. Go to "Profile" from bottom navigation
2. View your user information
3. Click "Logout"
4. You should be redirected to home

## PWA Testing

### Desktop (Chrome)

1. Open http://localhost:8004
2. Click the install icon in address bar
3. App should install as standalone

### Mobile

1. Open http://localhost:8004 in mobile browser
2. Tap "Share" → "Add to Home Screen"
3. Open app from home screen
4. Should open in fullscreen mode

Note: HTTPS is required for GPS in production!

## Common Issues

### GPS Not Working

- Ensure you're on HTTPS (production) or localhost (development)
- Check browser permissions for geolocation
- Try using "Use Current Location" button

### API Errors

- Verify API Gateway is running on port 8080
- Check browser console for CORS errors
- Verify JWT token in localStorage

### Authentication Issues

- Clear localStorage and try again
- Check API Gateway logs for authentication errors
- Verify JWT_SECRET_KEY matches across services

## Browser Console Commands

Useful for debugging:

```javascript
// Check if authenticated
console.log('Authenticated:', isAuthenticated());

// View stored JWT
console.log('Token:', getToken());

// View user data
console.log('User:', getUser());

// Clear auth data
removeToken();

// Test API call
API.users.getProfile().then(console.log);
```

## API Endpoints Used

All requests go through API Gateway:

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/users/profile` - Get user profile
- `POST /api/trips` - Create trip
- `POST /api/trips/{id}/coordinates` - Add GPS point
- `PUT /api/trips/{id}/complete` - Complete trip
- `GET /api/trips` - Get trip history
- `GET /api/trips/{id}` - Get trip details
- `GET /api/paths/search` - Search routes
- `GET /api/paths/{id}` - Get route details
- `POST /api/paths/manual` - Create manual path

## Architecture Flow

```
User Browser
    ↓
Frontend Service (Port 8004)
    ↓ (API calls via fetch)
API Gateway (Port 8080)
    ↓ (Routes to services)
    ├─→ User Service (Port 8000)
    ├─→ Trip Service (Port 8002)
    └─→ Path Service (Port 8001)
```

## Development Tips

1. **Hot Reload**: Use `--reload` flag with uvicorn
2. **Debug Mode**: Check browser console for errors
3. **Network Tab**: Monitor API requests/responses
4. **LocalStorage**: Check Application tab in DevTools

## Production Deployment

See `README.md` for detailed deployment instructions to Railway.

Key points:
- Set `API_GATEWAY_URL` to production gateway URL
- Ensure HTTPS for GPS functionality
- Generate proper PWA icons (see `app/static/icons/.gitkeep`)
