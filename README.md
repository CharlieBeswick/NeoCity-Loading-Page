# NeoCity Loading Screen

A static loading screen website for the NeoCity Garry's Mod gamemode. This site is designed to be deployed to Netlify (or any static hosting service) and used as the server's loading screen.

## What is this?

This folder contains a standalone static website (HTML, CSS, JavaScript) that displays information about NeoCity while players are loading into the server. It includes:

- Hero section with NeoCity branding
- Gamemode description and features
- **Critical addon collection warning** (to prevent errors)
- Work-in-progress status
- Embedded YouTube trailer/devlog video

## Local Testing

To test the site locally:

1. Open `index.html` in your web browser (double-click the file, or use a local server)
2. For better testing (especially for query parameters), you can use a simple HTTP server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```
3. Navigate to `http://localhost:8000` (or the port your server uses)

## Configuration

### Changing the Addon Collection Link

Edit `script.js` and modify the `ADDON_COLLECTION_URL` constant:

```javascript
const ADDON_COLLECTION_URL = "https://steamcommunity.com/sharedfiles/filedetails/?id=YOUR_COLLECTION_ID";
```

Replace `YOUR_COLLECTION_ID` with your actual Steam Workshop collection ID.

### Changing the YouTube Video

You have two options:

#### Option 1: Edit the default in `script.js`

Edit `script.js` and modify the `DEFAULT_VIDEO_URL` constant:

```javascript
// Using just the video ID:
const DEFAULT_VIDEO_URL = "YOUR_VIDEO_ID";

// Or using the full embed URL:
const DEFAULT_VIDEO_URL = "https://www.youtube.com/embed/YOUR_VIDEO_ID";
```

#### Option 2: Use a query parameter

You can override the default video by adding a `?video=` parameter to the URL:

```
https://your-site.netlify.app/?video=YOUR_VIDEO_ID
```

The script supports various YouTube URL formats:
- Video ID: `?video=dQw4w9WgXcQ`
- Full embed URL: `?video=https://www.youtube.com/embed/dQw4w9WgXcQ`
- Watch URL: `?video=https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Short URL: `?video=https://youtu.be/dQw4w9WgXcQ`

## Deployment to Netlify

### Method 1: Drag and Drop

1. Go to [Netlify](https://www.netlify.com/) and sign in
2. Drag the entire `neocity_loading_site` folder onto the Netlify dashboard
3. Netlify will automatically deploy your site and give you a URL

### Method 2: Git Integration

1. Create a Git repository containing this folder
2. Connect your repository to Netlify
3. Netlify will automatically deploy on every push

### Method 3: Netlify CLI

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Navigate to the neocity_loading_site folder
cd neocity_loading_site

# Deploy
netlify deploy --prod
```

## Setting Up in Garry's Mod

Once your site is deployed on Netlify, you'll get a URL like `https://your-site-name.netlify.app`.

To use this as your server's loading screen, set the `sv_loadingurl` convar in your server configuration:

```
sv_loadingurl "https://your-site-name.netlify.app"
```

You can also set this in your server's `server.cfg` or `autoexec.cfg` file.

**Note:** Make sure your Netlify site is publicly accessible (not behind authentication) for players to see it.

## File Structure

```
neocity_loading_site/
├── index.html      # Main HTML structure
├── style.css       # All styling (dark sci-fi theme)
├── script.js       # JavaScript for video URL handling
└── README.md       # This file
```

## Customization

### Colors and Theme

Edit the CSS variables at the top of `style.css`:

```css
:root {
    --bg-dark: #0a0a0f;
    --accent-teal: #00c8ff;
    --error-red: #ff3333;
    /* ... etc */
}
```

### Content

Edit the text content directly in `index.html`. All sections are clearly marked with comments.

## Browser Support

This site uses modern CSS features (CSS Grid, Flexbox, CSS Variables) and should work in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

For older browsers, some visual effects may not display correctly, but the core functionality will work.

## Notes

- This is a **static site** - no server-side code required
- All paths are relative, so it works when deployed to any subdirectory
- The site is responsive and should look good on most screen sizes
- The flashing "ERROR" animation respects `prefers-reduced-motion` for accessibility

## Troubleshooting

**Video not loading?**
- Check that the video ID is correct
- Ensure the video is publicly accessible (not private/unlisted)
- Check browser console for errors

**Addon button not working?**
- Verify the `ADDON_COLLECTION_URL` in `script.js` is correct
- Make sure the Steam Workshop collection is public

**Site looks broken after deployment?**
- Check that all files (index.html, style.css, script.js) are in the root of the deployed folder
- Verify file paths are correct (case-sensitive on some servers)

