# Deployment Guide

## Local Development Setup

### 1. Prerequisites

Ensure all backend services are running:

```bash
# Terminal 1: User Service
cd BBP-user-management-service-main
uvicorn app.main:app --port 8000

# Terminal 2: Trip Service  
cd BBP-trip-management-service--main
uvicorn app.main:app --port 8002

# Terminal 3: Path Service
cd BBP-path-management-service-main/project/path-management-service
uvicorn app.main:app --port 8001

# Terminal 4: API Gateway
cd BBP-APIgateway-service
uvicorn app.main:app --port 8080

# Terminal 5: Frontend Service
cd frontend-service
uvicorn app.main:app --port 8004
```

### 2. Access the Application

Open browser: http://localhost:8004

## Railway Deployment

### Step 1: Deploy Backend Services

Deploy in this order:

1. **User Management Service**
   - Repository: BBP-user-management-service-main
   - Port: 8000
   - Environment: DATABASE_URL, JWT_SECRET_KEY

2. **Trip Management Service**
   - Repository: BBP-trip-management-service--main
   - Port: 8002
   - Environment: DATABASE_URL, JWT_SECRET_KEY, OPENWEATHERMAP_API_KEY

3. **Path Management Service**
   - Repository: BBP-path-management-service-main/project/path-management-service
   - Port: 8001
   - Environment: DATABASE_URL, JWT_SECRET_KEY

4. **API Gateway**
   - Repository: BBP-APIgateway-service
   - Port: 8080
   - Environment:
     - USER_SERVICE_URL (URL of User Service)
     - TRIP_SERVICE_URL (URL of Trip Service)
     - PATH_SERVICE_URL (URL of Path Service)
     - JWT_SECRET_KEY

### Step 2: Deploy Frontend Service

1. Create new Railway project
2. Connect to Git repository
3. Select `frontend-service` directory
4. Configure environment variables:
   ```
   API_GATEWAY_URL=https://your-api-gateway.up.railway.app
   ```
5. Deploy

### Step 3: Verify Deployment

1. Open frontend URL
2. Test guest user route search
3. Test registration and login
4. Test trip recording
5. Test manual path creation

## Docker Deployment (Optional)

### Frontend Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ app/
COPY .env .env

EXPOSE 8004

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8004"]
```

### Build and Run

```bash
docker build -t bbp-frontend .
docker run -p 8004:8004 -e API_GATEWAY_URL=http://gateway:8080 bbp-frontend
```

## Production Checklist

### Security
- [ ] Change JWT_SECRET_KEY to strong random value
- [ ] Enable HTTPS (required for GPS)
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set secure cookie flags

### Performance
- [ ] Enable gzip compression
- [ ] Add CDN for static files
- [ ] Enable browser caching
- [ ] Minify JavaScript and CSS
- [ ] Optimize images

### Monitoring
- [ ] Add error tracking (Sentry)
- [ ] Add analytics (Google Analytics, Plausible)
- [ ] Set up uptime monitoring
- [ ] Configure logging
- [ ] Add performance monitoring

### PWA
- [ ] Generate proper PNG icons (192x192, 512x512)
- [ ] Create favicon.ico
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Verify manifest.json

### Testing
- [ ] Run all test scenarios
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test GPS accuracy
- [ ] Load testing

## Environment Variables Reference

### Frontend Service
- `API_GATEWAY_URL` - **Required** - URL of API Gateway
- `JWT_SECRET_KEY` - Optional - For JWT validation
- `PORT` - Optional - Port to run on (default: 8004)

### API Gateway  
- `USER_SERVICE_URL` - **Required** - User service URL
- `TRIP_SERVICE_URL` - **Required** - Trip service URL
- `PATH_SERVICE_URL` - **Required** - Path service URL
- `JWT_SECRET_KEY` - **Required** - JWT secret key
- `RATE_LIMIT_PER_MINUTE` - Optional - Rate limit (default: 60)

### Backend Services
- `DATABASE_URL` - **Required** - PostgreSQL connection string
- `JWT_SECRET_KEY` - **Required** - Must match across all services
- `JWT_ALGORITHM` - Optional - Default: HS256
- `OPENWEATHERMAP_API_KEY` - Required for Trip Service only

## Troubleshooting

### Frontend Can't Connect to API Gateway

1. Check API_GATEWAY_URL in frontend .env
2. Verify API Gateway is running
3. Check browser console for CORS errors
4. Test API Gateway health: `curl http://gateway:8080/health`

### GPS Not Working

1. Ensure HTTPS in production
2. Check browser permissions
3. Test on localhost first
4. Verify geolocation is enabled in browser

### Authentication Fails

1. Verify JWT_SECRET_KEY matches across services
2. Check User Service is running
3. Clear localStorage and retry
4. Check API Gateway logs

### Database Connection Issues

1. Verify DATABASE_URL format
2. Check database is accessible
3. Run migration scripts
4. Test connection with psql

## Scaling Considerations

### Horizontal Scaling

Frontend is stateless and can be scaled horizontally:

```bash
# Railway: Auto-scaling available
# Docker: Use load balancer
docker-compose scale frontend=3
```

### Caching Strategy

Consider adding Redis for:
- Session storage
- API response caching
- Rate limiting

### CDN Integration

Serve static files from CDN:
- JavaScript files
- CSS files  
- Map tiles (optional)
- Images

## Backup and Recovery

### Frontend
- No persistent data
- Configuration in environment variables
- Code in Git repository

### What to Backup
- Database (handled by backend services)
- Environment variables configuration
- SSL certificates

## Support

For issues:
1. Check QUICK_START.md for common issues
2. Review TEST_SCENARIOS.md for testing
3. Check browser console for errors
4. Review API Gateway logs
