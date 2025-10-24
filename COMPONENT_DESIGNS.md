# Component Design Reference

This document showcases all the custom component designs used across the hobby pages.

## Table of Contents
1. [Shoes - List View Design](#shoes-list-view)
2. [Tech - Horizontal Scroll Cards](#tech-horizontal-scroll)
3. [Music - Horizontal Scroll with Spotify](#music-horizontal-scroll)
4. [Sports - Unique Stats Cards](#sports-stats)
5. [Fitness - Statistics Dashboard](#fitness-stats)

---

## Shoes - List View Design {#shoes-list-view}

**Location**: `/hobbies/shoes`  
**Section**: Hit List

### Features
- Horizontal list layout with thumbnail images
- Priority star ratings (1-5 stars)
- Status badges (Grail, High Priority, etc.)
- Colorway dots showing actual shoe colors
- Brand, price, and category information
- "Why I want this" descriptions
- StockX external links

### Data Structure
```yaml
hit_list:
  - name: "Nike Air Max Plus"
    brand: "Nike"
    status: "High Priority"
    colorway: "Triple Black"
    colorway_colors: ["#000000"]
    category: "Lifestyle"
    priority: 1
    retail_price: "$180"
    why: "Description..."
    image: "URL"
    stockx_url: "https://stockx.com/..."
```

### CSS Classes
- `.hit-list-list` - Container
- `.hit-list-item` - Individual shoe card
- `.list-thumbnail` - Shoe image
- `.list-header` - Name and priority stars
- `.list-meta` - Status, price, brand, colorway
- `.list-why` - Description text
- `.list-actions` - External link icon
- `.color-dot` - Colorway indicator dots

---

## Tech - Horizontal Scroll Cards {#tech-horizontal-scroll}

**Location**: `/hobbies/tech`  
**Section**: Core Tools & Technologies

### Features
- Horizontal scrolling card layout
- Large tool icons (FontAwesome)
- Category badges
- Star ratings
- Use case tags (limited to 3)
- Official website links
- Compact, uniform card size (250px width)

### Data Structure
```yaml
favorites:
  - name: "Python"
    category: "Language"
    icon: "fab fa-python"
    rating: 5
    why: "Description..."
    use_cases: ["Backend APIs", "Data Analysis", "Automation", "AI/ML"]
    website: "https://www.python.org/"
```

### CSS Classes
- `.tech-favorites-scroll` - Horizontal scroll container
- `.tech-favorite-card-compact` - Individual tool card
- `.tech-tool-icon-large` - Large icon (3.5rem)
- `.tech-tool-category-badge` - Category label
- `.tech-tool-rating-compact` - Star rating
- `.tech-tags-compact` - Use case tags container
- `.tech-tag-small` - Individual use case tag
- `.tech-website-link` - Official website button

---

## Music - Horizontal Scroll with Spotify {#music-horizontal-scroll}

**Location**: `/hobbies/music`  
**Section**: Now Listening

### Features
- Horizontal scrolling card layout
- Spotify API integration for recently played tracks
- Album art images
- Track name and artist
- "Played X time ago" timestamps
- Spotify play icon on hover
- Fallback to static favorites if API fails
- OAuth authentication flow

### Spotify Integration
```javascript
// Credentials
clientId: 'd86bdfa8de9f4bafa26c2ce85a8e20ac'
// Uses OAuth implicit grant flow
// Fetches from: /v1/me/player/recently-played
```

### Data Structure (Fallback)
```yaml
favorites:
  - name: "J. Cole"
    category: "Artist"
    image: "URL"
    rating: 5
    genres: ["Hip-Hop", "Rap"]
    why: "Description..."
    top_tracks: ["Track 1", "Track 2"]
```

### CSS Classes
- `.music-favorites-scroll` - Horizontal scroll container
- `.spotify-track-card` - Spotify track card
- `.spotify-album-art` - Album cover image
- `.spotify-play-icon` - Hover play button
- `.spotify-track-info` - Track details
- `.spotify-loading` - Loading spinner
- `.spotify-auth-prompt` - OAuth authorization UI
- `.music-favorite-card-compact` - Fallback static card

---

## Sports - Unique Stats Cards {#sports-stats}

**Location**: `/hobbies/sports`  
**Section**: Favorites

### Features
- Compact horizontal cards
- Sport-specific third stat (not generic "Experience")
- Background images
- Position and style information
- Unique stats per sport

### Unique Stats Examples
- **Basketball**: "Best Skill" → "Court Vision"
- **Soccer**: "Strength" → "Speed & Defense"
- **Table Tennis**: "Best Shot" → "Backhand Cuts"
- **Badminton**: "Strength" → "Patience & Placement"
- **Chess**: "Strength" → "Endgame Strategy"

### Data Structure
```yaml
favorites:
  - title: "Basketball"
    image: "URL"
    stats:
      - label: "Position"
        value: "Point Guard"
      - label: "Style"
        value: "Pass-First"
      - label: "Best Skill"
        value: "Court Vision"
```

---

## Fitness - Statistics Dashboard {#fitness-stats}

**Location**: `/hobbies/fitness`  
**Section**: Statistics

### Features
- Grid layout with stat cards
- Icon, value, and label for each stat
- Personal metrics display
- Clean, minimal design

### Data Structure
```yaml
statistics:
  stats:
    - icon: "📏"
      value: "5'6\""
      label: "Height"
    - icon: "⚖️"
      value: "85kg"
      label: "Weight"
    - icon: "🚀"
      value: "35\""
      label: "Vertical Jump"
    - icon: "⚡"
      value: "11.4s"
      label: "100m Sprint"
```

---

## Design Principles

### Consistency
- All horizontal scroll sections use the same scrollbar styling
- Card hover effects are uniform (translateY(-5px) + shadow)
- Border radius consistently 12px
- Box shadows use rgba(0, 0, 0, 0.08) for base state

### Responsiveness
- Horizontal scroll sections work on all screen sizes
- Mobile: Full-width cards with touch scrolling
- Desktop: Multiple cards visible with mouse wheel scroll

### Color System
- Uses CSS custom properties: `var(--hobby-color)`
- Each hobby has its own accent color
- Consistent use of hobby color for icons, badges, and accents

### Typography
- Card titles: 1.1-1.4rem, weight 600-700
- Body text: 0.85-0.95rem
- Meta information: 0.75-0.85rem
- Color hierarchy: #2c3e50 (headings), #555 (body), #7f8c8d (meta)

---

## Implementation Notes

### Adding New Horizontal Scroll Sections
1. Create container with `.{section}-scroll` class
2. Add horizontal scroll CSS:
   ```scss
   .{section}-scroll {
       display: flex;
       gap: 1.5rem;
       overflow-x: auto;
       padding: 2rem 0;
       scroll-behavior: smooth;
   }
   ```
3. Create card with fixed width: `flex: 0 0 220px;`
4. Add scrollbar styling to match other sections

### Spotify API Integration
- Frontend uses OAuth implicit grant flow
- Access token cached in localStorage
- Fallback to static content if API fails
- Script location: `/assets/js/spotify-integration.js`

### External Links
- Always use `target="_blank"` and `rel="noopener noreferrer"`
- Icon indicator for external links (fas fa-external-link-alt)
- Hover effects for better UX

---

## File Locations

### Layouts
- `docs/_layouts/hobby.html` - Main hobby page template

### Styles
- `docs/_sass/_hobby-page.scss` - All hobby page styles

### Scripts
- `docs/assets/js/hobby-enhancements.js` - General hobby page functionality
- `docs/assets/js/spotify-integration.js` - Spotify API integration

### Data
- `docs/_hobbies/{hobby}.md` - Individual hobby page data files

---

## Future Enhancements

### Shoes
- Implement Kanban board design (Design 4)
- Implement Magazine layout design (Design 5)
- Add Sneaks-API integration for live pricing
- Add size availability checker

### Tech
- Add GitHub stats integration
- Add "Currently Learning" section
- Add project showcase using these tools

### Music
- Add Spotify playlist integration
- Add "Top Artists" section
- Add concert/event tracking

### General
- Add animation on scroll reveal
- Add skeleton loaders for API data
- Add error state designs
- Add empty state designs

