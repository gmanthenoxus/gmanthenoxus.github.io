# SASS Styling System

This directory contains the modular SCSS architecture for the portfolio website, implementing a comprehensive design system with consistent theming, responsive layouts, and reusable components.

## 📁 File Structure

```
docs/_sass/
├── README.md              # This documentation
├── _variables.scss        # Design tokens and configuration
├── _base.scss            # Base styles and resets
├── _components.scss      # Reusable UI components
└── _homepage.scss        # Homepage-specific styles
```

## 🎨 Design System Overview

### **Color Palette**
```scss
// Primary Colors
$primary-dark: #2D3747;      // Main text and headers
$primary-green: #008753;     // Primary accent (green)
$primary-blue: #012169;      // Secondary accent (blue)

// Background Colors
$bg-light: #F7FAFC;         // Light background
$bg-white: #FFFFFF;         // Pure white
$bg-gray: #EDF2F7;          // Light gray sections

// Text Colors
$text-primary: #2D3747;     // Main text
$text-secondary: #718096;   // Secondary text
$text-muted: #A0AEC0;       // Muted text

// Gradient System
$gradient-primary: linear-gradient(135deg, $primary-green 0%, $primary-blue 100%);
$gradient-light: linear-gradient(135deg, rgba($primary-green, 0.1) 0%, rgba($primary-blue, 0.1) 100%);
```

### **Typography Scale**
```scss
// Font Families
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
$font-mono: 'JetBrains Mono', 'Fira Code', monospace;

// Font Sizes (Fluid Typography)
$font-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
$font-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
$font-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
$font-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
$font-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
$font-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
$font-3xl: clamp(2rem, 1.7rem + 1.5vw, 3rem);

// Font Weights
$font-normal: 400;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;
```

### **Spacing System**
```scss
// Spacing Scale (8px base unit)
$space-1: 0.25rem;   // 4px
$space-2: 0.5rem;    // 8px
$space-3: 0.75rem;   // 12px
$space-4: 1rem;      // 16px
$space-5: 1.25rem;   // 20px
$space-6: 1.5rem;    // 24px
$space-8: 2rem;      // 32px
$space-10: 2.5rem;   // 40px
$space-12: 3rem;     // 48px
$space-16: 4rem;     // 64px
$space-20: 5rem;     // 80px
$space-24: 6rem;     // 96px
```

### **Breakpoint System**
```scss
// Mobile-First Breakpoints
$breakpoint-sm: 640px;   // Small tablets
$breakpoint-md: 768px;   // Tablets
$breakpoint-lg: 1024px;  // Small desktops
$breakpoint-xl: 1280px;  // Large desktops
$breakpoint-2xl: 1536px; // Extra large screens

// Mixins for Media Queries
@mixin mobile-up {
  @media (min-width: $breakpoint-sm) { @content; }
}

@mixin tablet-up {
  @media (min-width: $breakpoint-md) { @content; }
}

@mixin desktop-up {
  @media (min-width: $breakpoint-lg) { @content; }
}
```

## 📄 File Documentation

### **`_variables.scss`**
**Purpose**: Central configuration for all design tokens
**Contains**:
- Color palette and theme variables
- Typography scale and font stacks
- Spacing system and layout variables
- Breakpoints and media query mixins
- Animation timing and easing functions
- Component-specific variables

**Key Features**:
- CSS custom properties for runtime theming
- Fluid typography using `clamp()` functions
- Consistent spacing based on 8px grid system
- Mobile-first responsive breakpoints

### **`_base.scss`**
**Purpose**: Foundation styles and CSS resets
**Contains**:
- Modern CSS reset and normalization
- Base typography styles
- Default link and button behaviors
- Focus management and accessibility
- Print styles and utility classes

**Key Features**:
- Box-sizing reset for predictable layouts
- Improved focus indicators for accessibility
- Consistent form element styling
- Print-optimized styles for better printing

### **`_components.scss`**
**Purpose**: Reusable UI components and patterns
**Contains**:
- Button system with variants and states
- Card components with hover effects
- Navigation and menu components
- Form elements and input styles
- Badge and tag components
- Modal and overlay components

**Key Features**:
- BEM methodology for consistent naming
- Hover and focus states for all interactive elements
- Responsive behavior built into components
- Accessibility considerations (ARIA, focus management)

### **`_homepage.scss`**
**Purpose**: Homepage-specific styles and layouts
**Contains**:
- Hero section with gradient backgrounds
- Tabbed navigation system
- Project grid layouts
- Hobby showcase components
- CTA sections and call-to-action buttons

**Key Features**:
- Complex grid layouts with CSS Grid
- Smooth animations and transitions
- Mobile-optimized responsive behavior
- Performance-optimized animations

## 🎯 Component System

### **Button Components**
```scss
// Base Button
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $space-3 $space-6;
  border-radius: 8px;
  font-weight: $font-semibold;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  
  &:focus {
    outline: 2px solid $primary-green;
    outline-offset: 2px;
  }
}

// Primary Button (Gradient)
.btn-primary {
  background: $gradient-primary;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba($primary-green, 0.3);
  }
}

// Secondary Button
.btn-secondary {
  background: white;
  color: $primary-green;
  border: 2px solid $primary-green;
  
  &:hover {
    background: $primary-green;
    color: white;
  }
}
```

### **Card Components**
```scss
// Base Card
.card {
  background: white;
  border-radius: 12px;
  padding: $space-6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  }
}

// Project Card
.project-card {
  @extend .card;
  overflow: hidden;
  
  .project-image {
    height: 200px;
    background-size: cover;
    background-position: center;
    margin: -$space-6 -$space-6 $space-4 -$space-6;
  }
  
  .project-title {
    font-size: $font-xl;
    font-weight: $font-bold;
    margin-bottom: $space-2;
  }
  
  .project-description {
    color: $text-secondary;
    line-height: 1.6;
    margin-bottom: $space-4;
  }
}
```

### **Navigation Components**
```scss
// Main Navigation
.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space-4 0;
  
  .nav-links {
    display: flex;
    gap: $space-6;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-link {
    color: $text-primary;
    text-decoration: none;
    font-weight: $font-medium;
    transition: color 0.2s ease;
    
    &:hover,
    &.active {
      color: $primary-green;
    }
  }
}

// Tabbed Navigation
.tab-nav {
  display: flex;
  border-bottom: 2px solid $bg-gray;
  margin-bottom: $space-8;
  
  .tab-button {
    background: none;
    border: none;
    padding: $space-4 $space-6;
    font-weight: $font-medium;
    color: $text-secondary;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
    
    &.active {
      color: $primary-green;
      border-bottom-color: $primary-green;
    }
    
    &:hover:not(.active) {
      color: $text-primary;
    }
  }
}
```

## 🎨 Animation System

### **Transition Standards**
```scss
// Standard Transitions
$transition-fast: 0.15s ease;
$transition-base: 0.2s ease;
$transition-slow: 0.3s ease;

// Easing Functions
$ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
$ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
$ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### **Hover Effects**
```scss
// Lift Effect
.lift-on-hover {
  transition: transform $transition-base, box-shadow $transition-base;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  }
}

// Scale Effect
.scale-on-hover {
  transition: transform $transition-base;
  
  &:hover {
    transform: scale(1.05);
  }
}

// Glow Effect
.glow-on-hover {
  transition: box-shadow $transition-base;
  
  &:hover {
    box-shadow: 0 0 20px rgba($primary-green, 0.3);
  }
}
```

## 📱 Responsive Design

### **Mobile-First Approach**
All styles are written mobile-first, with progressive enhancement for larger screens:

```scss
// Mobile styles (default)
.component {
  padding: $space-4;
  font-size: $font-base;
}

// Tablet and up
@include tablet-up {
  .component {
    padding: $space-6;
    font-size: $font-lg;
  }
}

// Desktop and up
@include desktop-up {
  .component {
    padding: $space-8;
    font-size: $font-xl;
  }
}
```

### **Responsive Grid System**
```scss
// Flexible Grid
.grid {
  display: grid;
  gap: $space-6;
  grid-template-columns: 1fr;
  
  @include tablet-up {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include desktop-up {
    grid-template-columns: repeat(3, 1fr);
  }
}

// Auto-fit Grid
.auto-grid {
  display: grid;
  gap: $space-6;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

## 🔧 Utility Classes

### **Spacing Utilities**
```scss
// Margin utilities
.m-0 { margin: 0; }
.m-4 { margin: $space-4; }
.mt-4 { margin-top: $space-4; }
.mb-4 { margin-bottom: $space-4; }

// Padding utilities
.p-0 { padding: 0; }
.p-4 { padding: $space-4; }
.pt-4 { padding-top: $space-4; }
.pb-4 { padding-bottom: $space-4; }
```

### **Typography Utilities**
```scss
// Text alignment
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

// Font weights
.font-normal { font-weight: $font-normal; }
.font-medium { font-weight: $font-medium; }
.font-semibold { font-weight: $font-semibold; }
.font-bold { font-weight: $font-bold; }

// Text colors
.text-primary { color: $text-primary; }
.text-secondary { color: $text-secondary; }
.text-muted { color: $text-muted; }
```

## 🎯 Best Practices

### **Performance Optimization**
- Use `transform` and `opacity` for animations (GPU acceleration)
- Minimize repaints and reflows
- Use `will-change` property sparingly
- Optimize critical rendering path

### **Accessibility**
- Maintain sufficient color contrast ratios
- Provide focus indicators for all interactive elements
- Use semantic HTML with appropriate ARIA labels
- Test with screen readers and keyboard navigation

### **Maintainability**
- Follow BEM methodology for class naming
- Use variables for all repeated values
- Comment complex calculations and decisions
- Keep specificity low and avoid `!important`

---

**SASS Architecture**: Modular, scalable, and maintainable styling system
**Design System**: Comprehensive tokens and components for consistent UI
**Performance**: Optimized for fast loading and smooth animations
**Accessibility**: WCAG 2.1 AA compliant with inclusive design principles
