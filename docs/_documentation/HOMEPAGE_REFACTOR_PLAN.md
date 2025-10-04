# Homepage Refactoring Plan

**Date**: October 2025  
**Status**: In Progress  
**Page**: `docs/index.html`

---

## Current State Analysis

### Components Found on Homepage

1. **Hero Section** ✅
   - Already well-structured
   - Uses gradient background (matches design system)
   - Minimal changes needed

2. **Preview Cards** (Blog Posts) 🔄
   - **Current**: Custom `.preview-item` with image + text
   - **Replace with**: Unified card component with image
   - **Location**: Lines 305-388 in `main.scss`
   - **Duplication**: Similar to blog cards, project cards

3. **Content Cards** (Tabbed sections) 🔄
   - **Current**: Custom `.content-card` with special styling
   - **Replace with**: Unified `.card-lg` component
   - **Location**: Lines 243-280 in `main.scss`
   - **Duplication**: Similar styling across site

4. **Category Badges** 🔄
   - **Current**: Custom `.category` styling
   - **Replace with**: Unified badge components
   - **Location**: Lines 378-386 in `main.scss`

5. **Empty State** ✅
   - **Current**: Basic `.empty-state`
   - **Status**: Already matches our component system
   - **Action**: Verify consistency

6. **Progress Bar** (Brain Work section) 🔄
   - **Current**: Custom progress bar
   - **Replace with**: Unified `.progress-bar` component
   - **Location**: In HTML lines 126-131

7. **CTA Buttons** 🔄
   - **Current**: Custom `.cta-btn` styling
   - **Replace with**: `.btn-primary` and `.btn-outline`
   - **Location**: Lines 183-199 in HTML

8. **Text Buttons** ✅
   - **Current**: `.btn-text` (already using component)
   - **Status**: Already correct
   - **Action**: Verify consistency

---

## Refactoring Strategy

### Phase 1: Update HTML (index.html)
1. Replace custom button classes with unified components
2. Add proper card classes to preview items
3. Update progress bar markup
4. Add badge classes to category labels

### Phase 2: Update SCSS (main.scss)
1. Remove duplicate `.preview-item` styles
2. Remove duplicate `.content-card` styles
3. Remove duplicate `.category` badge styles
4. Keep only homepage-specific customizations

### Phase 3: Update _homepage.scss
1. Remove duplicated component styles
2. Keep only layout-specific styles
3. Use component mixins where needed

---

## Detailed Changes

### 1. Preview Cards (Blog/Hobby Items)

**Current HTML**:
```html
<a href="{{ post.url }}" class="preview-item">
  <div class="preview-image" style="background-image: url('...')">
    <div class="image-overlay"></div>
  </div>
  <div class="preview-text">
    <h4>{{ post.title }}</h4>
    <p class="excerpt">...</p>
    <div class="meta">
      <span class="category">{{ post.category }}</span>
    </div>
  </div>
</a>
```

**New HTML**:
```html
<a href="{{ post.url }}" class="card preview-card">
  <div class="card-image" style="background-image: url('...')">
    <div class="image-overlay"></div>
  </div>
  <div class="card-content">
    <h4>{{ post.title }}</h4>
    <p class="excerpt">...</p>
    <div class="meta">
      <span class="badge badge-{{ post.category }}">{{ post.category }}</span>
    </div>
  </div>
</a>
```

**SCSS Changes**:
```scss
// Remove lines 305-388 from main.scss
// Add to _homepage.scss:
.preview-card {
  @include card-base($radius: $radius-md);
  @include card-with-image($image-height: 200px);
  @include card-hover($lift: -8px, $shadow: $shadow-xl);
  
  // Only homepage-specific customizations
  .card-content {
    padding: $spacing-md;
  }
  
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: $spacing-sm;
  }
}
```

---

### 2. Content Cards (Tabbed Sections)

**Current HTML**:
```html
<div class="content-card">
  <h3>Latest Inspiration</h3>
  <p>Fresh thoughts...</p>
  <!-- content -->
</div>
```

**New HTML**:
```html
<div class="card card-lg content-wrapper">
  <h3>Latest Inspiration</h3>
  <p>Fresh thoughts...</p>
  <!-- content -->
</div>
```

**SCSS Changes**:
```scss
// Remove lines 243-280 from main.scss
// Add to _homepage.scss:
.content-wrapper {
  h3 {
    font-size: 1.8rem;
    margin-bottom: $spacing-sm;
    color: $primary-color;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, $accent-color, lighten($accent-color, 20%));
      border-radius: 2px;
    }
  }
  
  > p {
    color: $text-muted;
    font-size: 1.1rem;
    margin-bottom: $spacing-lg;
    line-height: 1.6;
  }
}
```

---

### 3. Category Badges

**Current HTML**:
```html
<span class="category">{{ post.category }}</span>
```

**New HTML**:
```html
<span class="badge badge-{{ post.category }}">{{ post.category | capitalize }}</span>
```

**SCSS Changes**:
```scss
// Remove lines 378-386 from main.scss
// Already handled by unified badge components
```

---

### 4. Progress Bar (Brain Work)

**Current HTML**:
```html
<div class="progress-container">
  <div class="progress-bar">
    <div class="progress-fill" data-progress="75"></div>
  </div>
  <span class="progress-text">75% Complete</span>
</div>
```

**New HTML** (no change needed, just verify classes):
```html
<div class="progress-container">
  <div class="progress-bar">
    <div class="progress-fill" style="width: 75%"></div>
  </div>
  <span class="progress-text">75% Complete</span>
</div>
```

**SCSS Changes**:
```scss
// Remove custom progress bar styles from _homepage.scss
// Use unified component
```

---

### 5. CTA Buttons

**Current HTML**:
```html
<a href="/contact" class="cta-btn primary">
  <span class="btn-text">Get In Touch</span>
  <div class="btn-icon">...</div>
</a>
```

**New HTML**:
```html
<a href="/contact" class="btn-primary cta-btn">
  <span class="btn-text">Get In Touch</span>
  <div class="btn-icon">...</div>
</a>
```

**SCSS Changes**:
```scss
// Keep CTA-specific icon positioning
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  .btn-icon {
    display: flex;
    align-items: center;
  }
}
```

---

## Files to Modify

1. ✅ `docs/index.html` - Update HTML markup
2. ✅ `docs/assets/css/main.scss` - Remove duplicate styles
3. ✅ `docs/_sass/_homepage.scss` - Add homepage-specific customizations

---

## Expected Results

### Before:
- ~400 lines of duplicate card/badge/button styles in main.scss
- Inconsistent component styling
- Hard to maintain

### After:
- ~100 lines of homepage-specific customizations
- Consistent with unified component system
- Easy to maintain
- ~300 lines of CSS removed

---

## Testing Checklist

After refactoring:
- [ ] Hero section displays correctly
- [ ] Tabbed navigation works
- [ ] Blog preview cards display correctly
- [ ] Hobby preview cards display correctly
- [ ] Brain Work section displays correctly
- [ ] Progress bar animates correctly
- [ ] Category badges styled correctly
- [ ] CTA buttons work and look correct
- [ ] Empty state displays correctly
- [ ] All hover effects work
- [ ] Mobile responsive (< 768px)
- [ ] Tablet responsive (768px - 1024px)
- [ ] Desktop optimal (> 1024px)
- [ ] No visual regressions

---

## Next Steps

1. Update `index.html` with new component classes
2. Remove duplicate styles from `main.scss`
3. Add homepage-specific styles to `_homepage.scss`
4. Test thoroughly
5. Get user confirmation
6. Move to next page

---

**Status**: Ready to begin implementation  
**Estimated Time**: 30-45 minutes  
**Risk Level**: Low (can easily revert if needed)

