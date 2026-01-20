# Test Scenarios

## Scenario 1: New User Journey

**Goal**: Complete user registration and first trip

1. Open landing page
2. Click "Sign Up"
3. Register with:
   - Username: bikeuser1
   - Email: bike@test.com
   - Password: SecurePass123
4. Login with credentials
5. Click "Start Recording" on dashboard
6. Allow GPS permissions
7. Move around for 1 minute
8. Stop recording
9. View trip summary
10. Check trip in history

**Expected**: User can complete full registration and trip recording flow

## Scenario 2: Route Discovery

**Goal**: Search and view bike routes

1. Open landing page (no login)
2. Go to "Search"
3. Click "Use Current Location"
4. Enter destination coordinates
5. Click "Search"
6. View list of routes
7. Click on a route to view details
8. See segments with different statuses
9. See obstacles on map

**Expected**: Guest user can search and view routes without authentication

## Scenario 3: Path Contribution

**Goal**: Create and share a manual path

1. Login as authenticated user
2. Navigate to manual path entry
3. Click on map to create path (10+ points)
4. Click "Finish Drawing"
5. Enter path name: "My Favorite Route"
6. Create 3 segments with different statuses:
   - Segment 1: OPTIMAL
   - Segment 2: MEDIUM
   - Segment 3: REQUIRES_MAINTENANCE
7. Add 2 obstacles:
   - Obstacle 1: POTHOLE, SEVERE
   - Obstacle 2: DEBRIS, MINOR
8. Check "Make this path public"
9. Save path
10. Search for the path in route search

**Expected**: User can create detailed path with segments and obstacles

## Scenario 4: Multi-Trip Analysis

**Goal**: Record multiple trips and view history

1. Login as user
2. Record Trip 1 (short, 30 seconds)
3. Record Trip 2 (medium, 2 minutes)
4. Record Trip 3 (with weather data)
5. View trip history
6. Compare statistics
7. View each trip detail

**Expected**: All trips saved correctly with accurate statistics

## Scenario 5: Mobile PWA Experience

**Goal**: Test mobile installation and usage

1. Open app on mobile browser
2. Add to home screen
3. Open from home screen (standalone mode)
4. Test bottom navigation
5. Start trip recording with GPS
6. Test map zoom/pan
7. Complete trip

**Expected**: App works as standalone PWA with full functionality

## Scenario 6: Error Handling

**Goal**: Test error scenarios

1. Try login with wrong password
2. Try register with existing email
3. Try accessing trip detail without auth
4. Start trip without GPS permission
5. Create path with only 1 point
6. Submit path without segments

**Expected**: Appropriate error messages shown for each case

## Scenario 7: Session Management

**Goal**: Test JWT and session handling

1. Login as user
2. Close browser
3. Reopen and go to protected page
4. Should still be authenticated
5. Wait for JWT expiration (if configured)
6. Try API call
7. Should redirect to login

**Expected**: JWT persists across sessions, expires correctly

## Scenario 8: Concurrent Recording

**Goal**: Test multiple users recording trips

1. Login as User A on Device 1
2. Start trip recording
3. Login as User B on Device 2
4. Start trip recording
5. Both users move/record for 1 minute
6. Both stop recording
7. Each views their own trip history

**Expected**: Trips recorded separately for each user

## Performance Testing

### Load Test: Trip Coordinate Upload

1. Start trip recording
2. Record for 5 minutes
3. Monitor:
   - Coordinate batch size
   - Network requests
   - Memory usage
4. Stop trip

**Expected**: ~60 coordinates recorded (1 per 5 sec), no memory leaks

### Map Performance

1. Load route with 100+ segments
2. Pan and zoom map
3. Click on obstacles
4. Monitor frame rate

**Expected**: Smooth map interaction, no lag

## Security Testing

### Authentication

1. Try accessing `/trip/dashboard` without login → Redirect to login
2. Try accessing `/profile` without token → Redirect to login
3. Manipulate JWT in localStorage → API calls fail, redirect to login
4. Try XSS in form inputs → Sanitized correctly

### Authorization

1. User A creates trip
2. User B tries to access User A's trip detail
3. Expected: Can view if public, cannot modify

## Accessibility Testing

1. Navigate with keyboard only
2. Use screen reader
3. Test color contrast
4. Test touch targets on mobile (44px minimum)
5. Test with zoom at 200%

## Browser Compatibility

Test on:
- Chrome (desktop + mobile)
- Firefox (desktop + mobile)
- Safari (desktop + mobile)
- Edge (desktop)

Features to verify:
- GPS tracking
- Local storage
- Service Worker
- Geolocation API
- Fetch API

## Regression Testing

After any code changes, verify:

1. Login/Register still works
2. Trip recording saves coordinates
3. Map displays correctly
4. Path creation saves successfully
5. Navigation between pages works
6. Logout clears session
