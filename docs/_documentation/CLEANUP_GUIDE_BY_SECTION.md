# Cleanup Guide - Old Code Sections to Delete 🧹

## File: `docs/_sass/_hobby-page.scss`

---

## 🎯 **CURRENT PROJECTS SECTION**

### **Problem**: Duplicate "CLEAN PROJECT CARDS" sections with old option styles

### **Lines to DELETE**:

#### **DELETE #1: First "CLEAN PROJECT CARDS" (Old Option Styles)**
```
Lines 2434-2615 (182 lines)
```

**What's in this section**:
- Line 2434-2436: First "CLEAN PROJECT CARDS" header (WRONG)
- Line 2438-2479: Old `.project-card` with button styles
- Line 2481-2615: "OPTION C: Kanban Style" section
  - `.kanban-board`
  - `.kanban-column`
  - `.kanban-header`
  - `.kanban-cards`
  - `.kanban-card`
  - `.kanban-progress`
  - `.kanban-link`

**Why delete**: These are old Option A, B, C styles that conflict with the clean design

---

### **What to KEEP**:

#### **KEEP: Second "CLEAN PROJECT CARDS" (Correct Clean Design)**
```
Lines 2617-2806 (Keep these!)
```

**What's in this section**:
- Line 2617-2619: Second "CLEAN PROJECT CARDS" header ✅
- Line 2621-2642: Clean `.project-card` (white background, 1px border)
- Line 2644-2658: `.project-header` (vertical layout)
- Line 2660-2676: `.project-status` (status badges)
- Line 2678-2696: `.tech-stack` and `.tech-tag` (hobby colored)
- Line 2698-2720: `.project-footer`, `.project-date`, `.project-links`
- Line 2722-2776: `.project-link` (gradient outline buttons)

---

## 📊 **Summary**

### **Action Required**:

**DELETE these lines from `docs/_sass/_hobby-page.scss`**:
```
Lines 2434-2615 (182 lines total)
```

### **How to Delete**:

1. Open `docs/_sass/_hobby-page.scss`
2. Go to line 2434
3. Select from line 2434 to line 2615 (inclusive)
4. Delete the selection
5. Save the file

### **What will remain**:

After deletion, line 2434 will become the correct "CLEAN PROJECT CARDS" section (currently at line 2617).

---

## ✅ **Verification**

After deleting, the file should have:

**Line ~2434** (new line number after deletion):
```scss
/* ========================================
   CLEAN PROJECT CARDS
   ======================================== */

.project-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    ...
```

**NOT this** (the old one):
```scss
.project-card {
        display: inline-flex;
        align-items: center;
        ...
```

---

## 🎨 **Expected Result**

After cleanup, the project cards will have:
- ✅ Clean white background
- ✅ Title and status stacked vertically (no overlap)
- ✅ Tech tags with hobby color theme
- ✅ Gradient outline buttons
- ✅ Proper spacing and alignment
- ✅ No conflicting styles

---

## 📝 **Quick Reference**

**File**: `docs/_sass/_hobby-page.scss`
**Delete**: Lines 2434-2615 (182 lines)
**Keep**: Lines 2617+ (clean design)

---

**Delete those 182 lines and the styles should work perfectly!** 🚀✨

