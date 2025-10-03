# Unified Components System - Usage Guide

**Date**: October 2025  
**Status**: ✅ Implemented  
**Location**: `docs/_sass/_components.scss`

---

## Overview

This guide documents the unified component system created to eliminate duplication and ensure consistency across the entire website. All components use SCSS mixins for maximum flexibility and reusability.

---

## Design Tokens (Variables)

### Colors
```scss
$primary-color: #2D3747;        // Deep navy blue
$accent-color: #008753;         // Green
$accent-secondary: #012169;     // Blue
$background-light: #F7FAFC;
$text-dark: #2D3747;
$text-light: #CBD5E0;
$text-muted: #718096;
```

### Shadows
```scss
$shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.15);
$shadow-card: 0 8px 25px rgba(0, 0, 0, 0.06);
$shadow-card-hover: 0 12px 35px rgba(0, 0, 0, 0.1);
$shadow-accent: 0 4px 15px rgba($accent-color, 0.3);
$shadow-accent-hover: 0 8px 25px rgba($accent-color, 0.4);
```

### Border Radius
```scss
$radius-sm: 8px;
$radius-md: 16px;
$radius-lg: 24px;
$radius-pill: 50px;
```

### Spacing
```scss
$spacing-xxs: 0.25rem;  // 4px
$spacing-xs: 0.5rem;    // 8px
$spacing-sm: 1rem;      // 16px
$spacing-md: 1.5rem;    // 24px
$spacing-lg: 2rem;      // 32px
$spacing-xl: 3rem;      // 48px
$spacing-xxl: 4rem;     // 64px
```

---

## Card Components

### Basic Card

**HTML**:
```html
<div class="card">
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
</div>
```

**Variants**:
- `.card` - Standard card (16px radius, medium padding)
- `.card-lg` - Large card (24px radius, large padding)
- `.card-sm` - Small card (8px radius, small padding)

### Card with Image

**HTML**:
```html
<div class="card card-with-image">
    <div class="card-image" style="background-image: url('image.jpg')">
        <div class="image-overlay"></div>
    </div>
    <div class="card-content">
        <h3>Card Title</h3>
        <p>Card description</p>
    </div>
</div>
```

**Using Mixin**:
```scss
.my-custom-card {
    @include card-base($radius: $radius-lg);
    @include card-hover($lift: -6px);
    @include card-with-image($image-height: 250px);
}
```

### Card with Top Border

**Using Mixin**:
```scss
.hobby-card {
    @include card-base;
    @include card-hover;
    @include card-top-border($accent-color, 4px);
}
```

---

## Button Components

### Gradient Button (Primary CTA)

**HTML**:
```html
<a href="#" class="btn-primary">Get Started</a>
<button class="btn-primary">Submit</button>
```

**Features**:
- Green to blue gradient background
- Shine animation on hover
- Lift effect (translateY -3px)
- Enhanced shadow on hover

**Sizes**:
```html
<button class="btn-primary btn-sm">Small Button</button>
<button class="btn-primary">Default Button</button>
<button class="btn-primary btn-lg">Large Button</button>
```

### Outline Button

**HTML**:
```html
<a href="#" class="btn-outline">Learn More</a>
```

**Features**:
- Gradient border
- Fills with gradient on hover
- Shine animation

### Text Button

**HTML**:
```html
<a href="#" class="btn-text">View All Projects</a>
```

**Features**:
- No background
- Arrow icon (→) that moves on hover
- Slides right on hover

### Custom Button with Mixin

**SCSS**:
```scss
.my-special-button {
    @include btn-gradient;
    // Add custom styles
    font-size: 1.25rem;
    padding: 1rem 2rem;
}
```

---

## Progress Bar Components

### Standard Progress Bar

**HTML**:
```html
<div class="progress-bar">
    <div class="progress-fill" style="width: 75%"></div>
</div>
```

**Variants**:
- `.progress-bar` - Standard (8px height)
- `.progress-bar-sm` - Small (4px height)
- `.progress-bar-lg` - Large (12px height)
- `.progress-bar-gradient` - Gradient fill
- `.progress-bar-custom` - Uses CSS custom properties for hobby colors

### Progress Bar with Label

**HTML**:
```html
<div class="progress-container">
    <div class="progress-info">
        <span class="progress-label">Project Progress</span>
        <span class="progress-percentage">75%</span>
    </div>
    <div class="progress-bar">
        <div class="progress-fill" style="width: 75%"></div>
    </div>
</div>
```

### Custom Progress Bar with Mixin

**SCSS**:
```scss
.my-progress {
    @include progress-bar(
        $height: 10px,
        $bg-color: rgba($accent-color, 0.15),
        $fill-color: $accent-color,
        $duration: 1s
    );
}
```

---

## Badge Components

### Status Badges

**HTML**:
```html
<span class="badge-completed">Completed</span>
<span class="badge-in-progress">In Progress</span>
<span class="badge-planning">Planning</span>
```

**Features**:
- Completed: Green background, checkmark icon
- In Progress: Blue background, refresh icon
- Planning: Gray background, circle icon

### Category Badges (Blog)

**HTML**:
```html
<span class="badge-tech">Tech</span>
<span class="badge-journey">Journey</span>
<span class="badge-passion">Passion</span>
```

### Generic Badge

**HTML**:
```html
<span class="badge">Custom Badge</span>
<span class="badge-sm">Small Badge</span>
<span class="badge-lg">Large Badge</span>
```

### Custom Badge with Mixin

**SCSS**:
```scss
.badge-custom {
    @include badge-base(
        $bg-color: rgba(#FF6B9D, 0.1),
        $text-color: #FF6B9D,
        $size: medium
    );
}
```

---

## Tech Tag Components

### Basic Tech Tag

**HTML**:
```html
<span class="tech-tag">React</span>
<span class="tech-tag">Node.js</span>
<span class="tech-tag">MongoDB</span>
```

### Tech Tag with Icon

**HTML**:
```html
<span class="tech-tag-icon">
    <i class="fab fa-react"></i>
    React
</span>
```

### Custom Tech Tag with Mixin

**SCSS**:
```scss
.tech-tag-featured {
    @include tech-tag($color: $accent-secondary);
    font-weight: $font-weight-bold;
}
```

---

## Statistics Card Components

### Basic Stat Card

**HTML**:
```html
<div class="stat-card">
    <div class="stat-number">42</div>
    <div class="stat-label">Projects</div>
    <div class="stat-context">Across 7 hobbies</div>
</div>
```

### Stat Card with Progress

**HTML**:
```html
<div class="stat-card-progress">
    <div class="stat-number">75%</div>
    <div class="stat-label">Completion Rate</div>
    <div class="progress-bar">
        <div class="progress-fill" style="width: 75%"></div>
    </div>
</div>
```

---

## Empty State Components

### Basic Empty State

**HTML**:
```html
<div class="empty-state">
    <div class="empty-icon emoji">📭</div>
    <h3 class="empty-title">No Projects Yet</h3>
    <p class="empty-description">
        Start your journey by creating your first project!
    </p>
    <div class="empty-action">
        <a href="#" class="btn-primary">Create Project</a>
    </div>
</div>
```

### Fun Empty State (with animation)

**HTML**:
```html
<div class="empty-state-fun">
    <div class="empty-icon emoji">🎨</div>
    <h3 class="empty-title">Nothing to see here... yet!</h3>
    <p class="empty-description">
        Your creative projects will appear here once you start building.
    </p>
</div>
```

---

## Timeline Component

### Basic Timeline

**HTML**:
```html
<div class="timeline">
    <div class="timeline-item completed">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
            <div class="timeline-date">January 2025</div>
            <h4 class="timeline-title">Project Started</h4>
            <p class="timeline-description">Initial planning and setup</p>
        </div>
    </div>
    
    <div class="timeline-item current">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
            <div class="timeline-date">March 2025</div>
            <h4 class="timeline-title">Development Phase</h4>
            <p class="timeline-description">Building core features</p>
        </div>
    </div>
    
    <div class="timeline-item upcoming">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
            <div class="timeline-date">June 2025</div>
            <h4 class="timeline-title">Launch</h4>
            <p class="timeline-description">Public release</p>
        </div>
    </div>
</div>
```

**States**:
- `.completed` - Green marker, filled
- `.current` - Blue marker, pulsing animation
- `.upcoming` - Gray marker, outlined

---

## Grid System

### Responsive Grid

**HTML**:
```html
<div class="grid grid-cols-3">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
    <div class="card">Item 3</div>
</div>
```

**Classes**:
- `.grid-cols-1` - Single column
- `.grid-cols-2` - Two columns
- `.grid-cols-3` - Three columns
- `.grid-cols-4` - Four columns

**Responsive Variants**:
- `.grid-cols-2-mobile` - Two columns on mobile+
- `.grid-cols-2-tablet` - Two columns on tablet+
- `.grid-cols-3-tablet` - Three columns on tablet+
- `.grid-cols-4-tablet` - Four columns on tablet+

**Note**: Grids automatically collapse to single column on mobile (< 768px)

---

## Usage Examples

### Blog Post Card

```html
<article class="card card-lg">
    <div class="card-image" style="background-image: url('post.jpg')">
        <div class="image-overlay"></div>
    </div>
    <div class="card-content">
        <span class="badge-tech">Tech</span>
        <h3>Building a Component System</h3>
        <p>Learn how to create reusable components...</p>
        <a href="#" class="btn-text">Read More</a>
    </div>
</article>
```

### Project Card

```html
<div class="card">
    <span class="badge-in-progress">In Progress</span>
    <h3>Anime Recommendation Engine</h3>
    <p>AI-powered anime suggestions</p>
    
    <div class="progress-bar">
        <div class="progress-fill" style="width: 60%"></div>
    </div>
    
    <div class="tech-tags">
        <span class="tech-tag">Python</span>
        <span class="tech-tag">TensorFlow</span>
        <span class="tech-tag">React</span>
    </div>
    
    <a href="#" class="btn-outline">View Project</a>
</div>
```

---

## Migration Guide

### Replacing Old Components

**Old Card**:
```scss
.my-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 8px 25px rgba(0,0,0,0.06);
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 35px rgba(0,0,0,0.1);
    }
}
```

**New Card** (using mixin):
```scss
.my-card {
    @include card-base;
    @include card-hover;
}
```

**Old Progress Bar**:
```scss
.progress {
    height: 8px;
    background: rgba(0, 135, 83, 0.1);
    border-radius: 4px;
    
    .fill {
        height: 100%;
        background: #008753;
        transition: width 0.8s ease;
    }
}
```

**New Progress Bar** (using mixin):
```scss
.progress {
    @include progress-bar;
}
```

---

## Best Practices

1. **Always use mixins** for custom components instead of duplicating styles
2. **Use design tokens** (variables) instead of hardcoded values
3. **Maintain consistency** by using the same component classes across pages
4. **Test responsiveness** on mobile, tablet, and desktop
5. **Check accessibility** - ensure sufficient color contrast and keyboard navigation

---

## Next Steps

1. ✅ Variables updated with new design tokens
2. ✅ Component mixins created
3. ✅ Component classes implemented
4. ⏳ Apply components to existing pages (in progress)
5. ⏳ Remove duplicate CSS from page-specific files
6. ⏳ Test all components across browsers

---

**Maintainer**: Noxus  
**Last Updated**: October 2025

