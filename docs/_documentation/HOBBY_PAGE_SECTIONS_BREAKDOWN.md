# Hobby Page Sections Breakdown

Complete breakdown of all sections in the hobby page layout with explanations, data requirements, and functionality.

---

## 📋 Table of Contents

1. [Hero Section](#1-hero-section)
2. [Live Statistics Dashboard](#2-live-statistics-dashboard)
3. [Personal Journey Section](#3-personal-journey-section)
4. [Fun Facts Section](#4-fun-facts-section)
5. [Interactive Trivia Section](#5-interactive-trivia-section)
6. [Current Projects Section](#6-current-projects-section)
7. [External Platforms Section](#7-external-platforms-section)
8. [Call-to-Action Section](#8-call-to-action-section)

---

## 1. Hero Section

**Location**: Lines 7-49 in `_layouts/hobby.html`

### Purpose
Full-screen hero section that introduces the hobby with dynamic theming, rotating quotes, and navigation.

### Components

#### A. Dynamic Color Theming
```html
<div class="hobby-page" style="--hobby-color: {{ page.color }};">
```
- Sets CSS custom property `--hobby-color` from front matter
- Used throughout page for consistent theming
- Example: `color: "#FF6B9D"` for anime

#### B. Icon/Emoji Display
```html
{% if hobby_data.icon %}
    <div class="hobby-icon-large">
        <i class="{{ hobby_data.icon }}"></i>
    </div>
{% else %}
    <div class="hobby-emoji-large">{{ page.emoji }}</div>
{% endif %}
```
- Displays FontAwesome icon OR emoji
- Checks `_data/hobbies.yml` first for icon
- Falls back to `page.emoji` from front matter
- Animated with floating effect

#### C. Title & Description
```html
<h1>{{ page.title }}</h1>
<p class="hobby-subtitle">{{ page.description }}</p>
```
- Main hobby title (e.g., "Anime & Manga")
- Short description/tagline

#### D. Rotating Quotes
```html
{% if page.quotes and page.quotes.size > 0 %}
<div class="quotes-container">
    {% for quote in page.quotes %}
    <div class="quote-item">
        <blockquote class="quote-text">"{{ quote.text }}"</blockquote>
        <cite class="quote-author">
            — {{ quote.author }}
            {% if quote.source %}, <em>{{ quote.source }}</em>{% endif %}
            {% if quote.episode %} ({{ quote.episode }}){% endif %}
        </cite>
    </div>
    {% endfor %}
</div>
{% endif %}
```

**Features**:
- Displays multiple quotes with fade transitions
- Rotates every 8 seconds (JavaScript controlled)
- Shows author, source, episode, and context
- First quote visible by default

**Data Structure**:
```yaml
quotes:
  - text: "Quote text here"
    author: "Author Name"
    source: "Source Title"
    episode: "Episode 123"
    context: "Context explanation"
```

#### E. Back Navigation
```html
<div class="hero-nav">
    <a href="/hobbies/" class="back-btn">
        <i class="fas fa-arrow-left"></i> Back to Hobbies
    </a>
</div>
```
- Links back to hobbies overview page
- Glassmorphism button style

### Styling
- Gradient background using `--hobby-color`
- Full viewport height (min-height: 70vh)
- Centered content
- Radial gradient overlays for depth
- Text shadows for readability

---

## 2. Live Statistics Dashboard

**Location**: Lines 54-72 in `_layouts/hobby.html`

### Purpose
Display personal statistics about the hobby with animated progress bars.

### Components

```html
{% if page.personal_stats and page.personal_stats.size > 0 %}
<section class="stats-dashboard">
    <h2><i class="fas fa-chart-line"></i> Live Statistics</h2>
    <div class="stats-grid">
        {% for stat in page.personal_stats %}
        <div class="stat-card">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            {% if stat.progress %}
            <div class="stat-progress">
                <div class="progress-bar" data-progress="{{ stat.progress }}"></div>
            </div>
            {% endif %}
        </div>
        {% endfor %}
    </div>
</section>
{% endif %}
```

**Features**:
- Grid layout (responsive)
- Each stat has label, value, and optional progress bar
- Progress bars animate on scroll into view
- Themed with hobby color

**Data Structure**:
```yaml
personal_stats:
  - label: "Years in the Fandom"
    value: "15+"
    progress: 90
  - label: "Isekai Worlds Explored"
    value: "Countless"
    progress: 85
```

**JavaScript**:
- Progress bars animate from 0% to target percentage
- Triggered by Intersection Observer
- Smooth cubic-bezier animation

### Styling
- White cards with subtle shadows
- Gradient progress bars using hobby color
- Hover effects (lift and shadow)
- Responsive grid (auto-fit, minmax(250px, 1fr))

---

## 3. Personal Journey Section

**Location**: Lines 74-80 in `_layouts/hobby.html`

### Purpose
Display the main content/story about the hobby journey.

### Components

```html
<section class="personal-journey">
    <h2><i class="fas fa-map-marked-alt"></i> My Journey</h2>
    <div class="journey-content">
        {{ content }}
    </div>
</section>
```

**Features**:
- Renders markdown content from the hobby page file
- Always visible (no conditional)
- Supports full markdown formatting

**Content Source**:
The markdown content after the front matter in the hobby page file:
```markdown
---
layout: hobby
title: "Anime & Manga"
---

## My Anime Journey

My journey began in junior secondary school...

## The Problem & The Passion

This deep dive has made the industry's pain points...
```

### Styling
- Max-width container for readability
- Styled headings with hobby color accents
- Proper typography (line-height, spacing)
- Responsive padding

---

## 4. Fun Facts Section

**Location**: Lines 82-98 in `_layouts/hobby.html`

### Purpose
Display shareable fun facts about the hobby.

### Components

```html
{% if page.fun_facts and page.fun_facts.size > 0 %}
<section class="fun-facts">
    <h2><i class="fas fa-lightbulb"></i> Fun Facts</h2>
    <div class="facts-grid">
        {% for fact in page.fun_facts %}
        <div class="fact-card">
            <button class="share-btn" onclick="shareFact('{{ fact.title }}', '{{ fact.description }}')">
                <i class="fas fa-share-alt"></i>
            </button>
            <h3>{{ fact.title }}</h3>
            <p>{{ fact.description }}</p>
        </div>
        {% endfor %}
    </div>
</section>
{% endif %}
```

**Features**:
- Grid layout of fact cards
- Share button on each card
- Hover effects reveal share button
- Web Share API with clipboard fallback

**Data Structure**:
```yaml
fun_facts:
  - title: "The Naruto Run is Real"
    description: "The iconic run style is based on a real technique..."
  - title: "Truck-kun is a Busy Guy"
    description: "The isekai trope of being reincarnated by a truck..."
```

**JavaScript**:
- `shareFact(title, description)` function
- Uses Web Share API on mobile
- Falls back to clipboard copy on desktop
- Shows success notification

### Styling
- Card-based layout
- Share button hidden until hover
- Smooth transitions
- Responsive grid (auto-fit, minmax(300px, 1fr))

---

## 5. Interactive Trivia Section

**Location**: Lines 100-123 in `_layouts/hobby.html`

### Purpose
Test knowledge with interactive multiple-choice questions.

### Components

```html
{% if page.trivia and page.trivia.size > 0 %}
<section class="trivia-section">
    <h2><i class="fas fa-brain"></i> Test Your Knowledge</h2>
    <div class="trivia-container">
        {% for question in page.trivia %}
        <div class="trivia-card" data-question="{{ forloop.index0 }}" data-correct-answer="{{ question.correct_answer }}">
            <h3>{{ question.question }}</h3>
            <div class="options-grid">
                {% for option in question.options %}
                <button class="option-btn" data-index="{{ forloop.index0 }}" 
                        onclick="selectAnswer({{ forloop.parentloop.index0 }}, {{ forloop.index0 }})">
                    {{ option }}
                </button>
                {% endfor %}
            </div>
            <div class="trivia-feedback" style="display: none;">
                <p>{{ question.explanation }}</p>
            </div>
        </div>
        {% endfor %}
    </div>
</section>
{% endif %}
```

**Features**:
- Multiple choice questions
- Instant feedback on selection
- Correct answers highlighted in green
- Incorrect answers highlighted in red
- Explanation shown after selection
- Buttons disabled after answering

**Data Structure**:
```yaml
trivia:
  - question: "In 'Bleach', what is the name of Ichigo's Zanpakutō?"
    options: ["Zangetsu", "Tensa Zangetsu", "Engetsu", "Benihime"]
    correct_answer: 1  # Index of correct option (0-based)
    explanation: "Tensa Zangetsu is the name of his Bankai..."
```

**JavaScript**:
- `selectAnswer(questionIndex, answerIndex)` function
- Reads correct answer from `data-correct-answer` attribute
- Applies visual feedback (colors, transforms)
- Shows explanation with fade-in animation

### Styling
- Card-based layout for each question
- Button grid for options
- Hover effects on options
- Color-coded feedback (green/red)
- Smooth animations

---

## 6. Current Projects Section

**Location**: Lines 125-164 in `_layouts/hobby.html`

### Purpose
Showcase projects related to the hobby.

### Components

#### A. With Projects
```html
{% if page.current_projects and page.current_projects.size > 0 %}
<section class="current-projects">
    <h2><i class="fas fa-code"></i> Current Projects</h2>
    <div class="projects-grid">
        {% for project in page.current_projects %}
        <div class="project-card">
            <div class="project-header">
                <h3>{{ project.name }}</h3>
                <span class="project-status">{{ project.status }}</span>
            </div>
            <p>{{ project.description }}</p>
            <div class="tech-stack">
                {% for tech in project.tech_stack %}
                <span class="tech-tag">{{ tech }}</span>
                {% endfor %}
            </div>
            <a href="{{ project.github_url }}" class="project-link">
                <i class="fab fa-github"></i> View on GitHub
            </a>
        </div>
        {% endfor %}
    </div>
</section>
{% endif %}
```

#### B. Empty State
```html
{% else %}
<section class="current-projects">
    <h2><i class="fas fa-code"></i> Current Projects</h2>
    <div class="empty-state">
        <i class="fas fa-hammer"></i>
        <h3>Building Something Amazing</h3>
        <p>Projects related to {{ page.title | downcase }} are currently in the planning phase...</p>
    </div>
</section>
```

**Data Structure**:
```yaml
current_projects:
  - name: "The Ultimate Watchlist & Tracker"
    description: "A unified platform to track seasonal anime..."
    tech_stack: ["TBD"]
    status: "Vision Stage"
    url: "#"
    github_url: "https://github.com/..."  # Optional
```

### Styling
- Grid layout for project cards
- Status badges with dynamic colors
- Tech stack tags
- Hover effects (lift and shadow)
- Empty state with personality

---

## 7. External Platforms Section

**Location**: Lines 166-192 in `_layouts/hobby.html`

### Purpose
Link to external profiles/platforms related to the hobby.

### Components

#### A. With Platforms
```html
{% if page.external_platforms and page.external_platforms.size > 0 %}
<section class="external-platforms">
    <h2><i class="fas fa-globe"></i> Find Me Online</h2>
    <div class="platforms-grid">
        {% for platform in page.external_platforms %}
        <a href="{{ platform.url }}" class="platform-card" target="_blank">
            <i class="{{ platform.icon }}"></i>
            <div class="platform-info">
                <h3>{{ platform.name }}</h3>
                <p>{{ platform.description }}</p>
            </div>
            <i class="fas fa-external-link-alt"></i>
        </a>
        {% endfor %}
    </div>
</section>
{% endif %}
```

#### B. Empty State
```html
{% else %}
<section class="external-platforms">
    <h2><i class="fas fa-globe"></i> Find Me Online</h2>
    <div class="empty-state">
        <i class="fas fa-link"></i>
        <h3>Connecting Soon</h3>
        <p>I'm working on building my presence...</p>
    </div>
</section>
```

**Data Structure**:
```yaml
external_platforms:
  - name: "MyAnimeList"
    icon: "📺"
    description: "Complete anime & manga tracking"
    url: "https://myanimelist.net/profile/username"
```

### Styling
- Horizontal card layout
- External link icon
- Hover effects
- Empty state with personality

---

## 8. Call-to-Action Section

**Location**: Lines 194-205 in `_layouts/hobby.html`

### Purpose
Encourage engagement with a final CTA.

### Components

```html
{% if page.cta %}
<section class="hobby-cta">
    <div class="cta-content">
        <h2>{{ page.cta.title }}</h2>
        <p>{{ page.cta.description }}</p>
        <a href="{{ page.cta.button_url }}" class="cta-btn">
            {{ page.cta.button_text }} <i class="fas fa-arrow-right"></i>
        </a>
    </div>
</section>
{% endif %}
```

**Data Structure**:
```yaml
cta:
  title: "Love Anime Tech?"
  description: "Let's talk about the future of fan tools..."
  button_text: "Start a Conversation"
  button_url: "/contact"
```

### Styling
- Full-width gradient background (hobby color)
- Centered content
- Prominent button with hover effects
- No rounded corners (full edge-to-edge)

---

## 📊 Summary Table

| Section | Required | Conditional | Interactive | Data Source |
|---------|----------|-------------|-------------|-------------|
| Hero | ✅ Yes | ❌ No | ✅ Yes (quotes rotate) | Front matter |
| Statistics | ❌ No | ✅ Yes | ✅ Yes (progress bars) | Front matter |
| Journey | ✅ Yes | ❌ No | ❌ No | Markdown content |
| Fun Facts | ❌ No | ✅ Yes | ✅ Yes (sharing) | Front matter |
| Trivia | ❌ No | ✅ Yes | ✅ Yes (quiz) | Front matter |
| Projects | ✅ Yes | ✅ Yes (empty state) | ❌ No | Front matter |
| Platforms | ✅ Yes | ✅ Yes (empty state) | ❌ No | Front matter |
| CTA | ❌ No | ✅ Yes | ❌ No | Front matter |

---

## 🎨 Design Patterns

### Consistent Elements Across Sections:
1. **Section Headers**: Icon + Title (h2)
2. **Grid Layouts**: Responsive auto-fit grids
3. **Card Components**: White cards with shadows and hover effects
4. **Empty States**: Icon + Title + Description
5. **Hobby Color Theming**: CSS custom properties throughout
6. **Animations**: Entrance animations, hover effects, progress animations

### Responsive Behavior:
- **Desktop**: Multi-column grids
- **Tablet**: 2-column grids
- **Mobile**: Single column, reduced padding

---

**Total Sections**: 8  
**Interactive Sections**: 4 (Hero quotes, Statistics, Fun Facts, Trivia)  
**Conditional Sections**: 6 (all except Hero and Journey)  
**JavaScript Enhanced**: 3 (Quotes rotation, Trivia, Fun Facts sharing)

