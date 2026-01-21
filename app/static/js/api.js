async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 401) {
            removeToken();
            window.location.href = '/login';
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            
            // Handle Pydantic validation errors (array of error objects)
            if (Array.isArray(errorData.detail)) {
                const messages = errorData.detail.map(err => {
                    const field = err.loc ? err.loc.join('.') : 'field';
                    return `${field}: ${err.msg}`;
                });
                throw new Error(messages.join('; '));
            }
            
            throw new Error(errorData.detail || errorData.message || 'Request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

const API = {
    auth: {
        register: (data) => apiRequest('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        }),

        login: (email, password) => apiRequest('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),

        logout: () => apiRequest('/api/auth/logout', {
            method: 'POST'
        })
    },

    users: {
        getProfile: () => apiRequest('/api/users/profile'),

        updateProfile: (data) => apiRequest('/api/users/profile', {
            method: 'PUT',
            body: JSON.stringify(data)
        })
    },

    trips: {
        create: (startTime) => apiRequest('/api/trips', {
            method: 'POST',
            body: JSON.stringify({ startTime })
        }),

        addCoordinate: (tripId, coordinate) => apiRequest(`/api/trips/${tripId}/coordinates`, {
            method: 'POST',
            body: JSON.stringify(coordinate)
        }),

        addCoordinatesBatch: (tripId, coordinates) => apiRequest(`/api/trips/${tripId}/coordinates/batch`, {
            method: 'POST',
            body: JSON.stringify({ coordinates })
        }),

        complete: (tripId, endTime) => apiRequest(`/api/trips/${tripId}/complete`, {
            method: 'PUT',
            body: JSON.stringify({ endTime })
        }),

        getHistory: () => apiRequest('/api/trips'),

        getDetail: (tripId) => apiRequest(`/api/trips/${tripId}`),

        delete: (tripId) => apiRequest(`/api/trips/${tripId}`, {
            method: 'DELETE'
        })
    },

    paths: {
        search: (params) => {
            const query = new URLSearchParams(params).toString();
            return apiRequest(`/api/paths/search?${query}`);
        },

        getDetail: (pathId) => apiRequest(`/api/paths/${pathId}`),

        createManual: (data) => apiRequest('/api/paths/manual', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }
};
