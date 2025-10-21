# Hobby Page Style Renaming Strategy

## Goal
Rename all hobby page styles to use `hobby-` prefix to prevent clashes with other page types.

---

## Current Status

### ✅ Already Scoped (No Rename Needed)
These are already scoped with `.hobby-page` parent selector:
- `.hobby-page` (root container)
- `.hobby-hero`
- `.hobby-emoji-large`
- `.hobby-icon-large`
- `.hobby-subtitle`
- `.hobby-page .quotes-container`
- `.hobby-page .quote-item`
- `.hobby-page .quote-text`
- `.hobby-page .quote-author`
- `.hobby-page .stat-icon`
- `.hobby-page .milestone-icon`
- `.hobby-page .current-projects`
- `.hobby-page .projects-container`
- `.hobby-page .project-card`
- `.hobby-page .tech-tag`
- `.hobby-page .project-link`
- `.hobby-page .explore-hobbies`
- `.hobby-page .explore-subtitle`
- `.hobby-page .hobbies-grid`
- `.hobby-page .hobby-card`
- `.hobby-page .hobby-direction`
- `.hobby-page .hobby-icon`
- `.hobby-page .hobby-content`
- `.hobby-page .hobby-name`
- `.hobby-page .hobby-description`

---

## Classes That Need Renaming

### **Priority 1: High Risk of Conflict** (Generic Names)

These are generic names likely to conflict with other pages:

1. `.hero-nav` → `.hobby-hero-nav`
2. `.back-btn` → `.hobby-back-btn`
3. `.stats-dashboard` → `.hobby-stats-dashboard`
4. `.stats-header` → `.hobby-stats-header`
5. `.stats-grid` → `.hobby-stats-grid`
6. `.stat-card` → `.hobby-stat-card`
7. `.stat-label` → `.hobby-stat-label`
8. `.stat-value` → `.hobby-stat-value`
9. `.stat-progress` → `.hobby-stat-progress`
10. `.progress-bar` → `.hobby-progress-bar`
11. `.stat-trend` → `.hobby-stat-trend`
12. `.personal-journey` → `.hobby-personal-journey`
13. `.journey-content` → `.hobby-journey-content`
14. `.favorites-section` → `.hobby-favorites-section`
15. `.favorites-grid` → `.hobby-favorites-grid`
16. `.favorite-card` → `.hobby-favorite-card`
17. `.fun-facts` → `.hobby-fun-facts`
18. `.facts-grid` → `.hobby-facts-grid`
19. `.fact-card` → `.hobby-fact-card`
20. `.trivia-section` → `.hobby-trivia-section`
21. `.trivia-container` → `.hobby-trivia-container`
22. `.external-platforms` → `.hobby-external-platforms`
23. `.platforms-grid` → `.hobby-platforms-grid`
24. `.platform-card` → `.hobby-platform-card`
25. `.empty-state` → `.hobby-empty-state`
26. `.cta-content` → `.hobby-cta-content`
27. `.cta-btn` → `.hobby-cta-btn`

### **Priority 2: Medium Risk** (Somewhat Specific)

These are more specific but could still conflict:

28. `.time-filters` → `.hobby-time-filters`
29. `.time-filter-btn` → `.hobby-time-filter-btn`
30. `.stat-comparison` → `.hobby-stat-comparison`
31. `.stat-milestone` → `.hobby-stat-milestone`
32. `.milestone-info` → `.hobby-milestone-info`
33. `.milestone-title` → `.hobby-milestone-title`
34. `.milestone-progress` → `.hobby-milestone-progress`
35. `.quick-stats-section` → `.hobby-quick-stats-section`
36. `.quick-stats-grid` → `.hobby-quick-stats-grid`
37. `.quick-stat-card` → `.hobby-quick-stat-card`
38. `.favorite-image` → `.hobby-favorite-image`
39. `.favorite-overlay` → `.hobby-favorite-overlay`
40. `.favorite-rating` → `.hobby-favorite-rating`
41. `.favorite-content` → `.hobby-favorite-content`
42. `.favorite-genres` → `.hobby-favorite-genres`
43. `.genre-tag` → `.hobby-genre-tag`
44. `.quiz-start-screen` → `.hobby-quiz-start-screen`
45. `.quiz-header` → `.hobby-quiz-header`
46. `.quiz-progress` → `.hobby-quiz-progress`
47. `.quiz-timer` → `.hobby-quiz-timer`
48. `.completion-card-capture` → `.hobby-completion-card-capture`
49. `.completion-stats` → `.hobby-completion-stats`
50. `.section-header-with-toggle` → `.hobby-section-header-with-toggle`

### **Priority 3: Low Risk** (Very Specific)

These are very specific to hobby pages but should still be renamed for consistency:

51. All `.fact-card-option1` through `.fact-card-option5` variants
52. All trivia-related classes (`.trivia-card-b`, `.option-btn-b`, etc.)
53. All platform-related classes (`.platform-card-polished`, etc.)
54. All completion-related classes (`.completion-header`, `.completion-message-box`, etc.)

---

## Implementation Plan

### **Phase 1: Rename in SCSS** (Priority 1 classes)
1. Update `docs/_sass/_hobby-page.scss`
2. Rename all Priority 1 classes (27 classes)
3. Update all nested selectors and pseudo-classes

### **Phase 2: Update HTML** (Priority 1 classes)
1. Update `docs/_layouts/hobby.html`
2. Replace all class names in HTML

### **Phase 3: Update JavaScript** (Priority 1 classes)
1. Update `docs/assets/js/hobby-enhancements.js`
2. Replace all querySelector/querySelectorAll calls

### **Phase 4: Test**
1. Test all hobby pages
2. Verify no style conflicts
3. Verify all JavaScript functionality works

### **Phase 5: Rename Priority 2 & 3** (Optional)
- Only if time permits
- Follow same process as Phase 1-3

---

## Estimated Impact

### **Files to Modify**:
1. `docs/_sass/_hobby-page.scss` (~2979 lines)
2. `docs/_layouts/hobby.html` (~570 lines)
3. `docs/assets/js/hobby-enhancements.js` (~630 lines)

### **Total Classes to Rename**: ~150+

### **Estimated Time**: 
- Priority 1: ~30 minutes
- Priority 2: ~20 minutes
- Priority 3: ~30 minutes
- **Total**: ~80 minutes

---

## Alternative Approach: Scope Instead of Rename

Instead of renaming every class, we could:
1. Wrap all hobby page styles in `.hobby-page` parent selector
2. Keep class names as-is
3. Much faster implementation
4. Same result (no conflicts)

**Pros**:
- Faster to implement
- Less code changes
- Easier to maintain

**Cons**:
- Slightly less explicit
- Requires consistent `.hobby-page` wrapper in HTML

**Recommendation**: Use scoping approach for now, rename later if needed.

---

## Decision

**User wants**: All hobby page styles renamed to `hobby-` prefix

**Best approach**: 
1. Start with Priority 1 classes (high risk)
2. Test thoroughly
3. Continue with Priority 2 & 3 if needed

Let's proceed with Priority 1 renaming!

