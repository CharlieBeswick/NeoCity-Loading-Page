/**
 * NeoCity Loading Screen - JavaScript
 * Handles YouTube video URL configuration and query parameter parsing
 */

// ============================================
// CONFIGURATION
// ============================================

// Default YouTube video URL/ID
// You can change this to any YouTube video ID or full embed URL
// Examples:
//   - Video ID only: "dQw4w9WgXcQ"
//   - Full embed URL: "https://www.youtube.com/embed/dQw4w9WgXcQ"
const DEFAULT_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

// Default addon collection URL (Steam Workshop collection)
// NeoCity RP content collection
const ADDON_COLLECTION_URL = "https://steamcommunity.com/sharedfiles/filedetails/?id=3602848095";

// ============================================
// FUNCTIONS
// ============================================

/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - Full embed URL: https://www.youtube.com/embed/VIDEO_ID
 * - Watch URL: https://www.youtube.com/watch?v=VIDEO_ID
 * - Short URL: https://youtu.be/VIDEO_ID
 * - Just the video ID: VIDEO_ID
 */
function extractYouTubeId(urlOrId) {
    if (!urlOrId) return null;
    
    // If it's already just an ID (no slashes or special chars), return it
    if (!urlOrId.includes('/') && !urlOrId.includes('?')) {
        return urlOrId;
    }
    
    // Try to extract from embed URL
    let match = urlOrId.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
    
    // Try to extract from watch URL
    match = urlOrId.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
    
    // Try to extract from youtu.be short URL
    match = urlOrId.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
    
    return null;
}

/**
 * Builds a YouTube embed URL from a video ID
 */
function buildEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Gets the YouTube video URL to use
 * Priority:
 * 1. Query parameter "video" (if present and valid)
 * 2. DEFAULT_VIDEO_URL
 */
function getVideoUrl() {
    // Check for query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const videoParam = urlParams.get('video');
    
    if (videoParam) {
        // Try to extract video ID from the parameter
        const videoId = extractYouTubeId(videoParam);
        if (videoId) {
            return buildEmbedUrl(videoId);
        }
        // If extraction failed, try using the param directly as embed URL
        if (videoParam.includes('youtube.com/embed/')) {
            return videoParam;
        }
    }
    
    // Fall back to default
    // If default is already a full embed URL, use it
    if (DEFAULT_VIDEO_URL.includes('youtube.com/embed/')) {
        return DEFAULT_VIDEO_URL;
    }
    
    // If default is just an ID, build embed URL
    const defaultId = extractYouTubeId(DEFAULT_VIDEO_URL);
    if (defaultId) {
        return buildEmbedUrl(defaultId);
    }
    
    // Last resort: return default as-is
    return DEFAULT_VIDEO_URL;
}

/**
 * Initializes the YouTube player with the correct video URL
 */
function initializeYouTubePlayer() {
    const player = document.getElementById('youtubePlayer');
    if (!player) {
        console.warn('YouTube player iframe not found');
        return;
    }
    
    const videoUrl = getVideoUrl();
    player.src = videoUrl;
    
    console.log('YouTube player initialized with URL:', videoUrl);
}

/**
 * Sets the addon collection button URL
 */
function initializeAddonButton() {
    const button = document.getElementById('addonButton');
    if (!button) {
        console.warn('Addon collection button not found');
        return;
    }
    
    button.href = ADDON_COLLECTION_URL;
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeYouTubePlayer();
    initializeAddonButton();
    
    console.log('NeoCity Loading Screen initialized');
});

