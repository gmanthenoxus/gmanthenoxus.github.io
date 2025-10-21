# Hobby Page - Unused Code Audit

## 🎯 **Summary**

After analyzing `docs/_layouts/hobby.html`, here's what's actually used vs unused in the SCSS:

---

## ✅ **USED CODE** (Keep These)

### **Fun Facts Section**
- ✅ `.fact-card-option2` - **USED** (line 234 in hobby.html)
- ✅ `.fact-icon-bg` - **USED**
- ✅ `.fact-content-layer` - **USED**
- ✅ `.fact-category` - **USED**
- ✅ `.share-btn-inline` - **USED**
- ✅ `.share-text` - **USED**
- ✅ `.share-icon` - **USED**
- ✅ `.fact-source` - **USED** (if present in data)

### **Trivia Section**
- ✅ `.trivia-optionB` - **USED** (line 311, has "active" class)
- ✅ `.quiz-start-screen` - **USED**
- ✅ `.start-quiz-btn` - **USED**
- ✅ `.quiz-active-screen` - **USED**
- ✅ `.quiz-header` - **USED**
- ✅ `.quiz-progress` - **USED**
- ✅ `.progress-dots-container` - **USED**
- ✅ `.quiz-timer` - **USED**
- ✅ `.trivia-card-b` - **USED**
- ✅ `.option-btn-b` - **USED**
- ✅ `.completion-card-capture` - **USED**
- ✅ `.completion-header` - **USED**
- ✅ `.completion-icon-large` - **USED**
- ✅ `.completion-title` - **USED**
- ✅ `.completion-subtitle` - **USED**
- ✅ `.completion-stats` - **USED**
- ✅ `.stat-item` - **USED**
- ✅ `.stat-icon` - **USED**
- ✅ `.stat-label` - **USED**
- ✅ `.stat-value` - **USED**
- ✅ `.stat-divider` - **USED**
- ✅ `.completion-message-box` - **USED**
- ✅ `.completion-footer` - **USED**

### **External Platforms**
- ✅ `.platforms-grid-polished` - **USED** (line 516)
- ✅ `.platform-card-polished` - **USED** (line 518)

---

## ❌ **UNUSED CODE** (Can Delete)

### **Fun Facts - Unused Options**
- ❌ `.fact-card-option1` - **UNUSED** (~70 lines)
- ❌ `.fact-card-option3` - **UNUSED** (~90 lines)
- ❌ `.fact-card-option4` - **UNUSED** (~80 lines)
- ❌ `.fact-card-option5` - **UNUSED** (~70 lines)

**Total Lines to Delete**: ~310 lines

### **Trivia - Unused Option**
- ❌ `.trivia-optionA` - **UNUSED** (line 266, no "active" class)
- ❌ `.trivia-score-bar` - **UNUSED**
- ❌ `.score-display` - **UNUSED**
- ❌ `.trivia-card-a` - **UNUSED**
- ❌ `.option-btn-a` - **UNUSED**
- ❌ `.feedback-a` - **UNUSED**
- ❌ All Option A related styles

**Total Lines to Delete**: ~150 lines

### **External Platforms - Unused Options**
Need to check if there are other platform grid/card styles besides `-polished`

---

## 📊 **Estimated Cleanup**

**Total Unused Lines**: ~460+ lines
**Current File Size**: 2976 lines
**After Cleanup**: ~2500 lines (16% reduction)

---

## 🔍 **How to Verify**

Run these searches in the SCSS file to find unused code:

```bash
# Find all fact-card-option classes
grep -n "\.fact-card-option" docs/_sass/_hobby-page.scss

# Find all trivia-option classes
grep -n "trivia-option" docs/_sass/_hobby-page.scss

# Find all platform-card classes
grep -n "platform-card" docs/_sass/_hobby-page.scss
```

---

## ✂️ **Deletion Plan**

### **Step 1: Delete Unused Fun Facts Options**
Delete these sections from `_hobby-page.scss`:
- Lines for `.fact-card-option1` and all nested styles
- Lines for `.fact-card-option3` and all nested styles
- Lines for `.fact-card-option4` and all nested styles
- Lines for `.fact-card-option5` and all nested styles

### **Step 2: Delete Unused Trivia Option**
Delete these sections from `_hobby-page.scss`:
- Lines for `.trivia-optionA` and all nested styles
- Lines for `.trivia-card-a` and related styles
- Lines for `.option-btn-a` and related styles

### **Step 3: Check External Platforms**
Verify if there are other platform styles besides `-polished`

### **Step 4: Delete Unused HTML** (Optional)
Remove the unused Option A trivia HTML from `hobby.html` (lines 265-308)

---

## 🎯 **Next Steps**

1. ✅ Confirm this audit is correct
2. ✂️ Delete unused code from SCSS
3. ✂️ (Optional) Delete unused HTML
4. 🔄 Continue with renaming remaining used code
5. ✅ Test all hobby pages

---

**Ready to proceed with deletion?**

