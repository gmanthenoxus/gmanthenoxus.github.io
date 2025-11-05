# Tech Logos Directory

This directory contains technology logos used in project pages.

## Logo Requirements

- **Format**: PNG or SVG (SVG preferred for scalability)
- **Size**: 128x128px minimum (for PNG)
- **Background**: Transparent
- **Naming**: Use lowercase with hyphens (e.g., `next-js.svg`, `react.svg`)

## Current Technologies Needed

Based on the test projects, we need logos for:

### Frontend Frameworks
- `next-js.svg` - Next.js
- `react.svg` - React
- `vue.svg` - Vue.js
- `angular.svg` - Angular

### Backend & Databases
- `supabase.svg` - Supabase
- `postgresql.svg` - PostgreSQL
- `mongodb.svg` - MongoDB
- `firebase.svg` - Firebase
- `node-js.svg` - Node.js
- `express.svg` - Express.js

### Styling & UI
- `tailwind-css.svg` - Tailwind CSS
- `sass.svg` - Sass/SCSS
- `bootstrap.svg` - Bootstrap
- `material-ui.svg` - Material-UI

### APIs & Services
- `espn-api.svg` - ESPN API (may need custom icon)
- `rest-api.svg` - REST API (generic icon)
- `graphql.svg` - GraphQL

### Deployment & DevOps
- `vercel.svg` - Vercel
- `netlify.svg` - Netlify
- `aws.svg` - AWS
- `docker.svg` - Docker
- `github-actions.svg` - GitHub Actions

### Data & Analytics
- `pandas.svg` - Pandas
- `numpy.svg` - NumPy
- `jupyter.svg` - Jupyter
- `matplotlib.svg` - Matplotlib
- `plotly.svg` - Plotly

### Languages
- `python.svg` - Python
- `javascript.svg` - JavaScript
- `typescript.svg` - TypeScript
- `java.svg` - Java
- `csharp.svg` - C#

## Logo Sources

### Free Logo Resources
1. **Simple Icons** - https://simpleicons.org/
   - SVG logos for popular brands
   - Free to use with attribution

2. **DevIcon** - https://devicon.dev/
   - Developer-focused icons
   - Free and open source

3. **SVG Logos** - https://svgporn.com/
   - High-quality SVG logos
   - Free for commercial use

4. **Official Brand Assets**
   - Next.js: https://nextjs.org/brand
   - React: https://react.dev/community/logos
   - Tailwind: https://tailwindcss.com/brand
   - Vercel: https://vercel.com/design/brands

## Usage in Project Files

To use a logo in your project front matter:

```yaml
tech_stack:
  - name: "Next.js 14"
    logo: "/assets/images/tech-logos/next-js.svg"
    icon: "fab fa-react"  # Fallback FontAwesome icon
    purpose: "Frontend framework with App Router"
```

The `logo` field takes priority over `icon`. If no logo is provided, the FontAwesome icon will be used as fallback.

## Adding New Logos

1. Download the logo from official sources or free resources
2. Ensure it's transparent background (PNG or SVG)
3. Optimize the file size (use SVGO for SVG files)
4. Name it using lowercase with hyphens
5. Place it in this directory
6. Update the project's `tech_stack` field with the logo path

## Optimization Tips

### For SVG files:
```bash
# Install SVGO
npm install -g svgo

# Optimize SVG
svgo input.svg -o output.svg
```

### For PNG files:
- Use tools like TinyPNG or ImageOptim
- Keep file size under 50KB
- Use 128x128px or 256x256px dimensions

