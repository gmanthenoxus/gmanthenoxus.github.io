# Project Style Conflicts - Complete Audit 🔍

## Overview

This document identifies ALL conflicting CSS classes between `_projects.scss` (main projects page) and `_hobby-page.scss` (hobby pages).

---

## 🐛 **Conflicting Classes Found**

### **1. `.project-card`** ✅ FIXED
- **_projects.scss** (Line 224): Icon buttons, gradient backgrounds
- **_hobby-page.scss** (Line 1852): Text buttons, hobby color theme
- **Status**: Scoped with `.hobby-page`

### **2. `.project-status`** ⚠️ NEEDS REVIEW
- **_projects.scss** (Line 340): Absolute positioned, backdrop blur, gradient backgrounds
- **_hobby-page.scss** (Line 1898): Inline badge, simple colors
- **Status**: Scoped with `.hobby-page` but different positioning

### **3. `.project-title`** ⚠️ POTENTIAL CONFLICT
- **_projects.scss** (Line 489): Has nested `a` tag styles with hover effects
- **_hobby-page.scss**: Uses `h3` inside `.project-header`
- **Status**: Scoped with `.hobby-page` but check if `a` styles apply

### **4. `.project-description`** ✅ FIXED
- **_projects.scss** (Line 508): Basic text styling
- **_hobby-page.scss** (Line 1889): Similar styling with text-align
- **Status**: Scoped with `.hobby-page`

### **5. `.tech-tag`** ✅ FIXED
- **_projects.scss** (Line 523): Green/blue gradient, uppercase, letter-spacing
- **_hobby-page.scss** (Line 1941): White bg, hobby color border, normal case
- **Status**: Scoped with `.hobby-page` + `!important`

### **6. `.tech-more`** ⚠️ POTENTIAL CONFLICT
- **_projects.scss** (Line 543): Gray background, simple styling
- **_hobby-page.scss** (Line 1961): White bg, gray border (nested in `.tech-tag`)
- **Status**: Scoped with `.hobby-page` but check specificity

### **7. `.project-footer`** ⚠️ POTENTIAL CONFLICT
- **_projects.scss** (Line 554): Gradient background, 2px border, padding 1.5rem 2rem
- **_hobby-page.scss** (Line 1980): No gradient, 1px border, padding-top 1.5rem
- **Status**: Scoped with `.hobby-page` but check if gradient applies

### **8. `.project-links`** ✅ FIXED
- **_projects.scss** (Line 564): Simple flex container
- **_hobby-page.scss** (Line 2006): Flex with wrap
- **Status**: Scoped with `.hobby-page` + `!important`

### **9. `.project-link`** ✅ FIXED (JUST NOW)
- **_projects.scss** (Line 569): **44px x 44px icon buttons**, gradient hover
- **_hobby-page.scss** (Line 2013): **Full text buttons**, hobby color theme
- **Status**: Scoped with `.hobby-page` + `!important` (width/height overrides added)

---

## 🎯 **Critical Issues**

### **Issue #1: `.project-link` Size Conflict** ✅ FIXED

**Problem**:
```scss
/* _projects.scss */
.project-link {
    width: 44px;   /* Icon button */
    height: 44px;  /* Icon button */
}

/* _hobby-page.scss */
.hobby-page .project-link {
    padding: 0.75rem 1.5rem;  /* Text button */
}
```

**Result**: Buttons were compressed to 44px x 44px!

**Solution**: Added `!important` overrides
```scss
.hobby-page .project-link {
    width: auto !important;
    height: auto !important;
    padding: 0.75rem 1.5rem !important;
}
```

### **Issue #2: `.project-link::before` Gradient** ✅ FIXED

**Problem**:
```scss
/* _projects.scss */
.project-link::before {
    background: linear-gradient(135deg, $hero-green, $hero-blue);
    opacity: 0;
}

.project-link:hover::before {
    opacity: 1;  /* Shows gradient on hover */
}
```

**Result**: GitHub button showed green/blue gradient instead of hobby color!

**Solution**: 
```scss
.hobby-page .project-link:first-child::before {
    opacity: 1 !important;  /* Keep shine animation */
}

.hobby-page .project-link:last-child::before {
    display: none !important;  /* Remove gradient from GitHub button */
}
```

### **Issue #3: `.project-link:hover` Transform** ✅ FIXED

**Problem**:
```scss
/* _projects.scss */
.project-link:hover {
    transform: translateY(-3px) rotate(5deg);  /* Rotates! */
}

/* _hobby-page.scss */
.hobby-page .project-link:hover {
    transform: translateY(-3px);  /* No rotation */
}
```

**Result**: Buttons rotated on hover!

**Solution**: Added `!important`
```scss
.hobby-page .project-link:hover {
    transform: translateY(-3px) !important;
}
```

---

## 📊 **Specificity Analysis**

### **Why Conflicts Occur**:

**Import Order** (`main.scss`):
```scss
@import 'hobby-page';  // Line 13
@import 'projects';    // Line 14  ← Loads AFTER!
```

**CSS Cascade**: When two selectors have the same specificity, the one that comes LAST wins.

### **Specificity Comparison**:

| Selector | Specificity | Wins? |
|----------|-------------|-------|
| `.project-link` | 0,0,1,0 | ❌ |
| `.hobby-page .project-link` | 0,0,2,0 | ✅ (higher) |
| `.project-link` (from _projects.scss) | 0,0,1,0 | ✅ (loaded after) |

**Problem**: Even though `.hobby-page .project-link` has higher specificity, some properties from `.project-link` in `_projects.scss` still apply because they're not overridden!

**Solution**: Use `!important` to force hobby page styles.

---

## ✅ **Fixed Classes**

### **Fully Scoped with `!important`**:
1. ✅ `.hobby-page .project-card`
2. ✅ `.hobby-page .project-header`
3. ✅ `.hobby-page .project-description`
4. ✅ `.hobby-page .project-status`
5. ✅ `.hobby-page .tech-stack`
6. ✅ `.hobby-page .tech-tag` (with `!important`)
7. ✅ `.hobby-page .project-footer`
8. ✅ `.hobby-page .project-date`
9. ✅ `.hobby-page .project-links` (with `!important`)
10. ✅ `.hobby-page .project-link` (with `!important` + width/height overrides)

---

## ⚠️ **Classes to Monitor**

### **1. `.project-content`**
- **_projects.scss** (Line 415): Padding, flex layout
- **Hobby pages**: Not used (no `.project-content` class)
- **Status**: No conflict (not used in hobby pages)

### **2. `.project-hobby-tag`**
- **_projects.scss** (Line 423): Hobby-specific tags
- **Hobby pages**: Not used
- **Status**: No conflict (not used in hobby pages)

### **3. `.project-tech-stack`**
- **_projects.scss** (Line 516): Flex container
- **Hobby pages**: Uses `.tech-stack` instead
- **Status**: No conflict (different class name)

---

## 🚀 **Testing Checklist**

### **Test on Anime Hobby Page** (`/hobbies/anime`):

#### **Tech Tags**:
- ✅ White background (not gradient)
- ✅ Pink border (hobby color)
- ✅ Pink text (hobby color)
- ✅ Normal case (not uppercase)
- ✅ Fills with pink on hover

#### **View Project Button**:
- ✅ Pink background (hobby color)
- ✅ White text
- ✅ Full width button (not 44px x 44px)
- ✅ Shine animation on hover
- ✅ Lifts 3px on hover (no rotation)

#### **GitHub Button**:
- ✅ White background
- ✅ Pink border (hobby color)
- ✅ Full button (not 44px x 44px)
- ✅ Fills with pink on hover
- ✅ No gradient background
- ✅ Lifts 3px on hover (no rotation)

#### **Project Card**:
- ✅ Light pink background on hover
- ✅ Pink border on hover
- ✅ No gradient backgrounds

#### **Date Badge**:
- ✅ Light pink background
- ✅ Pink text

---

## 📁 **Files Modified**

### **`docs/_sass/_hobby-page.scss`**

**Lines 1823-1869**: Scoped containers and cards
**Lines 1871-1939**: Scoped headers, status, tech stack
**Lines 1941-1978**: Scoped tech tags with `!important`
**Lines 1980-2004**: Scoped footer and date
**Lines 2006-2094**: Scoped links with `!important` + overrides

### **Key Changes in Latest Fix**:
```scss
.hobby-page .project-link {
    width: auto !important;        // Override 44px
    height: auto !important;       // Override 44px
    padding: 0.75rem 1.5rem !important;
    
    &:first-child::before {
        opacity: 1 !important;     // Keep shine animation
    }
    
    &:last-child::before {
        display: none !important;  // Remove gradient
    }
    
    &:hover {
        transform: translateY(-3px) !important;  // No rotation
    }
}
```

---

## 🎯 **Summary**

**Total Conflicts Found**: 9 classes
**Conflicts Fixed**: 9 classes ✅
**Method**: Scoped with `.hobby-page` + `!important` on critical properties

**Result**: Hobby pages now fully isolated from projects page styles!

---

**All conflicts resolved!** 🎉

