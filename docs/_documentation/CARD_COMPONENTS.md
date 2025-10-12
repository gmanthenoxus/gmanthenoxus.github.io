# Card Components - UI Documentation 🎴

Complete documentation of all card components used across the website.

---

## 📊 **1. Statistics Card (Enhanced)**

### **Location**: Hobby pages - Statistics Dashboard section

### **Visual Design**:
```
┌─────────────────────────────────┐
│         [Icon]                  │
│                                 │
│    Years in the Fandom          │
│         15+                     │
│                                 │
│    ↑ 90%  +0 this year         │
│                                 │
│    vs Average Fan               │
│    8 years        87%           │
│                                 │
│    🏆 Veteran Fan               │
│    15+ years in the fandom      │
│                                 │
│    ℹ️ (tooltip)                 │
└─────────────────────────────────┘
```

### **Features**:
- ✅ Horizontal scroll layout
- ✅ Fixed width (380px desktop, 340px tablet, 280px mobile)
- ✅ Gradient background with hobby color
- ✅ Icon at top
- ✅ Label and value
- ✅ Trend indicator (up/down/stable with color)
- ✅ Comparison section
- ✅ Milestone badge (with glow animation)
- ✅ Tooltip on hover
- ✅ Scroll snap points

### **CSS Classes**:
```scss
.stats-dashboard          // Section container
.stats-grid              // Horizontal scroll container
.stat-card.enhanced      // Individual card
.stat-icon               // Icon at top
.stat-label              // Label text
.stat-value              // Main value
.stat-trend              // Trend indicator
.stat-comparison         // Comparison section
.stat-milestone          // Milestone badge
.stat-tooltip            // Tooltip container
```

### **Responsive Behavior**:
- **Desktop (1024px+)**: 380px wide, shows ~2.5 cards
- **Tablet (768px)**: 340px wide, shows ~2 cards
- **Mobile (480px)**: 280px wide, shows 1 card

### **Data Structure**:
```yaml
statistics:
  stats:
    - id: "experience"
      label: "Years in the Fandom"
      icon: "fas fa-calendar-alt"
      value: "15+"
      numeric_value: 15
      progress: 90
      trend: "stable"
      trend_value: "+0 this year"
      comparison:
        type: "average"
        label: "vs Average Fan"
        value: "8 years"
        percentage: 87
      tooltip: "Been watching anime since 2010..."
      milestone:
        reached: true
        title: "Veteran Fan"
        icon: "🏆"
        description: "15+ years in the fandom"
```

---

## ⭐ **2. Favorites Card**

### **Location**: Hobby pages - Favorites section

### **Visual Design**:
```
┌─────────────────────────┐
│   [Anime Poster Image]  │ ← Background image
│   ⭐⭐⭐⭐⭐              │ ← Rating overlay
├─────────────────────────┤
│ One Piece               │ ← Title
│ [Adventure] [Action]    │ ← Genre tags
│ [Fantasy]               │
│                         │
│ Epic world-building,    │ ← Personal note
│ unforgettable           │
│ characters...           │
│                         │
│ 📅 1999  🎬 1000+ eps   │ ← Meta info
│ ─────────────────────── │
│ 🔗 View on MyAnimeList →│ ← Link indicator
└─────────────────────────┘
```

### **Features**:
- ✅ Horizontal scroll layout
- ✅ Fixed width (320px desktop, 280px tablet, 260px mobile)
- ✅ Clickable card (links to MyAnimeList)
- ✅ Background image with gradient overlay
- ✅ Star rating (filled/empty stars)
- ✅ Genre tags with hobby color
- ✅ Personal "why" note (italic)
- ✅ Meta information (year, episodes)
- ✅ Link indicator with hover animation
- ✅ Hover effects (lift, image zoom, link color change)
- ✅ No underline on hover

### **CSS Classes**:
```scss
.favorites-section       // Section container
.favorites-grid         // Horizontal scroll container
.favorite-card          // Individual card (can be <a> or <div>)
.favorite-image         // Background image container
.favorite-overlay       // Gradient overlay on image
.favorite-rating        // Star rating
.favorite-content       // Content container
.favorite-genres        // Genre tags container
.genre-tag              // Individual genre tag
.favorite-why           // Personal note
.favorite-meta          // Meta information
.favorite-link          // Link indicator
```

### **Responsive Behavior**:
- **Desktop (1024px+)**: 320px wide, 240px image height
- **Tablet (768px)**: 280px wide, 200px image height
- **Mobile (480px)**: 260px wide, 180px image height

### **Data Structure**:
```yaml
favorites:
  - title: "One Piece"
    image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg"
    rating: 5
    genres: ["Adventure", "Action", "Fantasy"]
    why: "Epic world-building, unforgettable characters, and the ultimate journey to freedom"
    year: 1999
    episodes: "1000+"
    url: "https://myanimelist.net/anime/21/One_Piece"
```

### **Hover Effects**:
1. Card lifts up (-8px translateY)
2. Shadow increases (0.15 opacity)
3. Image zooms (1.05 scale)
4. Link text changes to hobby color
5. Link icon slides right (3px translateX)
6. **No underline** (text-decoration: none !important)

---

## 🎯 **3. Fun Facts Card**

### **Location**: Hobby pages - Fun Facts section

### **Visual Design**:
```
┌─────────────────────────────┐
│  🔗 (share button)          │
│                             │
│  The Naruto Run is Real     │
│                             │
│  The iconic run style is    │
│  based on a real technique  │
│  that reduces wind          │
│  resistance. It's not just  │
│  for looking cool!          │
└─────────────────────────────┘
```

### **Features**:
- ✅ Grid layout (auto-fit, min 320px)
- ✅ White background with shadow
- ✅ Share button (top-right)
- ✅ Title and description
- ✅ Hover effect (lift + shadow)

### **CSS Classes**:
```scss
.fun-facts              // Section container
.facts-grid            // Grid container
.fact-card             // Individual card
.share-btn             // Share button
```

### **Data Structure**:
```yaml
fun_facts:
  - title: "The Naruto Run is Real"
    description: "The iconic run style is based on a real technique that reduces wind resistance. It's not just for looking cool!"
```

---

## 🧠 **4. Trivia Card**

### **Location**: Hobby pages - Trivia section

### **Visual Design**:
```
┌─────────────────────────────────┐
│  In 'Bleach', what is the name  │
│  of Ichigo's Zanpakutō?         │
│                                 │
│  [Zangetsu]  [Tensa Zangetsu]  │
│  [Engetsu]   [Benihime]        │
│                                 │
│  ✅ Correct!                    │
│  Tensa Zangetsu is the name... │
└─────────────────────────────────┘
```

### **Features**:
- ✅ Question text
- ✅ Multiple choice options (grid)
- ✅ Interactive buttons
- ✅ Feedback section (hidden until answered)
- ✅ Correct/incorrect indication

### **CSS Classes**:
```scss
.trivia-section         // Section container
.trivia-container      // Container
.trivia-card           // Individual card
.options-grid          // Options grid
.option-btn            // Option button
.trivia-feedback       // Feedback section
```

---

## 🚀 **5. Project Card**

### **Location**: Hobby pages - Current Projects section

### **Visual Design**:
```
┌─────────────────────────────────┐
│  The Ultimate Watchlist         │
│  [Vision Stage]                 │
│                                 │
│  A unified platform to track    │
│  seasonal anime, share lists... │
│                                 │
│  [TBD]                          │
│                                 │
│  🔗 View on GitHub              │
└─────────────────────────────────┘
```

### **Features**:
- ✅ Grid layout (auto-fit, min 320px)
- ✅ Project header (title + status badge)
- ✅ Description
- ✅ Tech stack tags
- ✅ GitHub link (if available)
- ✅ Empty state (if no projects)

### **CSS Classes**:
```scss
.current-projects       // Section container
.projects-grid         // Grid container
.project-card          // Individual card
.project-header        // Header with title + status
.project-status        // Status badge
.tech-stack            // Tech stack container
.tech-tag              // Individual tech tag
.project-link          // GitHub link
.empty-state           // Empty state
```

---

## 🌐 **6. Platform Card**

### **Location**: Hobby pages - External Platforms section

### **Visual Design**:
```
┌─────────────────────────────────┐
│  [Icon]  MyAnimeList        🔗  │
│          Track my anime list    │
└─────────────────────────────────┘
```

### **Features**:
- ✅ Clickable link card
- ✅ Platform icon (left)
- ✅ Platform name and description
- ✅ External link icon (right)
- ✅ Hover effect (lift + shadow)

### **CSS Classes**:
```scss
.external-platforms     // Section container
.platforms-grid        // Grid container
.platform-card         // Individual card (link)
.platform-info         // Info container
```

---

## 🎨 **Common Card Patterns**

### **1. Horizontal Scroll Cards**:
Used by: Statistics, Favorites

**Pattern**:
```scss
.container {
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}

.card {
    min-width: 320px;
    max-width: 320px;
    flex-shrink: 0;
    scroll-snap-align: start;
}
```

### **2. Grid Layout Cards**:
Used by: Fun Facts, Trivia, Projects, Platforms

**Pattern**:
```scss
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}
```

### **3. Hover Effects**:
Common pattern across all cards:

```scss
.card {
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
}
```

---

## 📱 **Responsive Breakpoints**

### **Desktop (1024px+)**:
- Statistics cards: 380px
- Favorites cards: 320px
- Grid cards: auto-fit with min 320px

### **Tablet (768px - 1023px)**:
- Statistics cards: 340px
- Favorites cards: 280px
- Grid cards: 1 column

### **Mobile (< 768px)**:
- Statistics cards: 280px
- Favorites cards: 260px
- Grid cards: 1 column
- Reduced padding and font sizes

---

## 🎨 **Color System**

### **Card Backgrounds**:
- White: `#ffffff`
- Gradient: `linear-gradient(135deg, var(--hobby-color-alpha) 0%, rgba(255, 255, 255, 0.8) 100%)`

### **Borders**:
- Light: `rgba(0, 0, 0, 0.05)`
- Hobby color: `var(--hobby-color-light)`

### **Shadows**:
- Default: `0 8px 25px rgba(0, 0, 0, 0.1)`
- Hover: `0 20px 40px rgba(0, 0, 0, 0.15)`

### **Text**:
- Heading: `#1a202c`
- Body: `#4a5568`
- Muted: `#6b7280`

---

## ✅ **Best Practices**

### **1. Consistent Sizing**:
- Use fixed widths for horizontal scroll cards
- Use min-width for grid cards
- Maintain aspect ratios for images

### **2. Hover Effects**:
- Always use `transition: all 0.3s ease`
- Lift cards with `translateY(-8px)`
- Increase shadow on hover
- Add specific element animations (zoom, slide, color)

### **3. Accessibility**:
- Use semantic HTML (`<a>` for links, `<button>` for actions)
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain color contrast ratios

### **4. Performance**:
- Use `transform` instead of `top/left` for animations
- Use `will-change` sparingly
- Optimize images (use CDN, proper sizes)
- Lazy load images when possible

### **5. Mobile Optimization**:
- Reduce card widths on mobile
- Adjust font sizes
- Simplify layouts
- Ensure touch targets are 44px minimum

---

## 🎯 **Summary**

**Total Card Types**: 6
1. Statistics Card (Enhanced)
2. Favorites Card
3. Fun Facts Card
4. Trivia Card
5. Project Card
6. Platform Card

**Common Features**:
- ✅ Consistent hover effects
- ✅ Responsive design
- ✅ Hobby color theming
- ✅ Smooth animations
- ✅ Clean shadows and borders

**Layout Patterns**:
- Horizontal scroll (Statistics, Favorites)
- Grid layout (Fun Facts, Trivia, Projects, Platforms)

---

---

## 🎛️ **7. Toggle Button Component**

### **Location**: Can be used anywhere for switching between options

### **Visual Design**:
```
┌─────────────────────────────────────────┐
│  [Option 1] [Option 2] [Option 3]       │
│      ↑ Active (colored background)      │
└─────────────────────────────────────────┘
```

### **Features**:
- ✅ Multiple button options
- ✅ Active state highlighting
- ✅ Smooth transitions
- ✅ Hobby color theming
- ✅ Horizontal scroll on mobile

### **HTML Structure**:
```html
<div class="design-toggle">
    <button class="toggle-btn active" data-design="option1">Option 1</button>
    <button class="toggle-btn" data-design="option2">Option 2</button>
    <button class="toggle-btn" data-design="option3">Option 3</button>
</div>
```

### **CSS Classes**:
```scss
.design-toggle {
    display: flex;
    gap: 0.5rem;
    background: white;
    padding: 0.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.toggle-btn {
    padding: 0.5rem 1rem;
    background: transparent;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #1a202c;
    }

    &.active {
        background: var(--hobby-color);
        color: white;
    }
}
```

### **JavaScript**:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const contentSections = document.querySelectorAll('.content-section');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-design');

            // Remove active from all
            toggleBtns.forEach(b => b.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add active to selected
            this.classList.add('active');
            document.querySelector(`.content-${target}`).classList.add('active');
        });
    });
});
```

### **Use Cases**:
- Switching between different views
- Filtering content
- Toggling between data sets
- Design previews
- Tab-like navigation

### **Responsive Behavior**:
- **Desktop**: All buttons visible
- **Mobile**: Horizontal scroll if needed
- **Touch**: Touch-friendly tap targets

---

**All card components documented!** 🎴✨

