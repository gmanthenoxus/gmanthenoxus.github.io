# Quick Download Guide for Tech Logos

## Fastest Method: Simple Icons CDN

You can use Simple Icons CDN directly in your project files without downloading:

```yaml
tech_stack:
  - name: "Next.js 14"
    logo: "https://cdn.simpleicons.org/nextdotjs/000000"
    purpose: "Frontend framework"
```

### Simple Icons CDN Format:
`https://cdn.simpleicons.org/{slug}/{color}`

- `{slug}`: Technology name (lowercase, no spaces)
- `{color}`: Hex color without # (optional, defaults to brand color)

### Common Technology Slugs:

**Frontend:**
- Next.js: `nextdotjs`
- React: `react`
- Vue: `vuedotjs`
- Angular: `angular`
- Svelte: `svelte`

**Backend:**
- Node.js: `nodedotjs`
- Express: `express`
- Django: `django`
- Flask: `flask`
- FastAPI: `fastapi`

**Databases:**
- PostgreSQL: `postgresql`
- MongoDB: `mongodb`
- MySQL: `mysql`
- Redis: `redis`
- Supabase: `supabase`

**Styling:**
- Tailwind CSS: `tailwindcss`
- Sass: `sass`
- Bootstrap: `bootstrap`
- Material-UI: `mui`
- Styled Components: `styledcomponents`

**Deployment:**
- Vercel: `vercel`
- Netlify: `netlify`
- AWS: `amazonaws`
- Docker: `docker`
- Kubernetes: `kubernetes`

**Languages:**
- Python: `python`
- JavaScript: `javascript`
- TypeScript: `typescript`
- Java: `java`
- C#: `csharp`
- Go: `go`
- Rust: `rust`

**Data Science:**
- Pandas: `pandas`
- NumPy: `numpy`
- Jupyter: `jupyter`
- Matplotlib: `matplotlib`
- Plotly: `plotly`

**Tools:**
- Git: `git`
- GitHub: `github`
- VS Code: `visualstudiocode`
- Figma: `figma`
- Postman: `postman`

## Alternative: Download from Simple Icons

If you prefer to host logos locally:

1. Visit https://simpleicons.org/
2. Search for the technology
3. Click the icon to copy SVG code
4. Save as `{name}.svg` in this directory

## Alternative: DevIcon

DevIcon provides colored icons:

```html
<!-- Use in HTML/Markdown -->
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="32" height="32" />
```

### DevIcon Format:
`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-{variant}.svg`

**Variants:**
- `original` - Original brand colors
- `plain` - Monochrome
- `line` - Line style
- `original-wordmark` - With text

## Recommended Approach for This Project

**Use Simple Icons CDN** for most technologies:

```yaml
tech_stack:
  - name: "Next.js 14"
    logo: "https://cdn.simpleicons.org/nextdotjs/000000"
    icon: "fab fa-react"
    purpose: "Frontend framework with App Router"
  
  - name: "Supabase"
    logo: "https://cdn.simpleicons.org/supabase/3ECF8E"
    icon: "fas fa-database"
    purpose: "Real-time database and authentication"
  
  - name: "Tailwind CSS"
    logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4"
    icon: "fas fa-palette"
    purpose: "Utility-first styling system"
  
  - name: "Vercel"
    logo: "https://cdn.simpleicons.org/vercel/000000"
    icon: "fas fa-cloud"
    purpose: "Edge deployment platform"
```

## Benefits of CDN Approach:

✅ No need to download/manage files
✅ Always up-to-date logos
✅ Fast loading (CDN cached)
✅ Easy to change colors
✅ Fallback to FontAwesome icons if CDN fails

## Custom Logos

For technologies not available on Simple Icons:

1. Search for official brand assets
2. Download SVG/PNG
3. Optimize file size
4. Save in this directory
5. Reference as `/assets/images/tech-logos/{name}.svg`

## Testing

After adding logos, test on:
- Desktop view (should show icon + name)
- Mobile view (should show icon only in horizontal grid)
- Check fallback to FontAwesome if logo fails to load

