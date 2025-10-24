// Spotify API Integration for Recently Played Tracks
// Note: This requires a backend proxy or serverless function for secure API calls

const SPOTIFY_CONFIG = {
    clientId: 'd86bdfa8de9f4bafa26c2ce85a8e20ac',
    // Client secret should NEVER be exposed in frontend code
    // This implementation uses a fallback approach
    redirectUri: window.location.origin + '/hobbies/music',
    scopes: ['user-read-recently-played'],
};

// Initialize Spotify integration on music page
document.addEventListener('DOMContentLoaded', function() {
    const spotifyContainer = document.getElementById('spotify-recently-played');
    if (!spotifyContainer) return;

    // Check if we're on the music hobby page
    if (!window.location.pathname.includes('/hobbies/music')) return;

    loadSpotifyTracks();
});

async function loadSpotifyTracks() {
    const container = document.getElementById('spotify-recently-played');
    const fallback = document.getElementById('music-fallback');

    try {
        // Check if we have an access token
        const accessToken = getAccessToken();

        if (!accessToken) {
            // No token available - show fallback
            showFallback(container, fallback);
            return;
        }

        // Fetch recently played tracks
        const tracks = await fetchRecentlyPlayed(accessToken);

        if (tracks && tracks.length > 0) {
            displaySpotifyTracks(tracks, container);
        } else {
            showFallback(container, fallback);
        }
    } catch (error) {
        console.error('Error loading Spotify tracks:', error);
        showFallback(container, fallback);
    }
}

function getAccessToken() {
    // Check localStorage for cached token
    const cached = localStorage.getItem('spotify_access_token');
    const expiry = localStorage.getItem('spotify_token_expiry');

    if (cached && expiry && Date.now() < parseInt(expiry)) {
        return cached;
    }

    // Check URL for token (after OAuth redirect)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (token) {
        // Cache the token
        localStorage.setItem('spotify_access_token', token);
        localStorage.setItem('spotify_token_expiry', Date.now() + (parseInt(expiresIn) * 1000));
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        return token;
    }

    return null;
}

async function fetchRecentlyPlayed(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recently played tracks');
    }

    const data = await response.json();
    return data.items;
}

function displaySpotifyTracks(tracks, container) {
    container.innerHTML = '';

    tracks.forEach(item => {
        const track = item.track;
        const playedAt = new Date(item.played_at);
        const timeAgo = getTimeAgo(playedAt);

        const card = document.createElement('div');
        card.className = 'spotify-track-card';
        card.onclick = () => window.open(track.external_urls.spotify, '_blank');

        card.innerHTML = `
            <div class="spotify-album-art" style="background-image: url('${track.album.images[0]?.url || ''}');">
                <div class="spotify-play-icon">
                    <i class="fab fa-spotify"></i>
                </div>
            </div>
            <div class="spotify-track-info">
                <div class="track-name">${track.name}</div>
                <div class="track-artist">${track.artists.map(a => a.name).join(', ')}</div>
                <div class="track-played-at">${timeAgo}</div>
            </div>
        `;

        container.appendChild(card);
    });
}

function showFallback(container, fallback) {
    container.innerHTML = `
        <div class="spotify-auth-prompt">
            <i class="fab fa-spotify" style="font-size: 3rem; color: #1DB954; margin-bottom: 1rem;"></i>
            <h3>Connect Your Spotify</h3>
            <p>Authorize access to see your recently played tracks</p>
            <button onclick="authorizeSpotify()" class="spotify-auth-btn">
                <i class="fab fa-spotify"></i> Connect Spotify
            </button>
            <p style="margin-top: 1rem; font-size: 0.85rem; color: #999;">
                Or view my favorite artists below
            </p>
        </div>
    `;

    // Show fallback content
    if (fallback) {
        fallback.style.display = 'flex';
    }
}

function authorizeSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?` +
        `client_id=${SPOTIFY_CONFIG.clientId}&` +
        `response_type=token&` +
        `redirect_uri=${encodeURIComponent(SPOTIFY_CONFIG.redirectUri)}&` +
        `scope=${encodeURIComponent(SPOTIFY_CONFIG.scopes.join(' '))}`;

    window.location.href = authUrl;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
}

// Add CSS for auth prompt
const style = document.createElement('style');
style.textContent = `
    .spotify-auth-prompt {
        width: 100%;
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .spotify-auth-prompt h3 {
        margin: 0 0 0.5rem 0;
        color: #2c3e50;
    }

    .spotify-auth-prompt p {
        color: #7f8c8d;
        margin-bottom: 1.5rem;
    }

    .spotify-auth-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 2rem;
        background: #1DB954;
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .spotify-auth-btn:hover {
        background: #1ed760;
        transform: scale(1.05);
    }

    .spotify-auth-btn i {
        font-size: 1.5rem;
    }
`;
document.head.appendChild(style);

