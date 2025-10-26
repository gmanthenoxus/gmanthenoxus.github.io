# 🎵 How to Add Your Spotify Songs/Albums

Your music page now uses **Spotify Embeds** - no API authentication needed! Just follow these simple steps:

---

## Step 1: Get Spotify URIs

### On Spotify Desktop/Web:
1. Open Spotify
2. Find the song or album you want to add
3. **Right-click** on it
4. Click **"Share"** → **"Copy Spotify URI"**
5. You'll get something like: `spotify:track:3n3Ppam7vgaVa1iaRUc9Lp`

### On Spotify Mobile:
1. Open Spotify app
2. Find the song or album
3. Tap the **three dots** (•••)
4. Tap **"Share"**
5. Tap **"Copy Spotify URI"**

---

## Step 2: Add to Your Music Page

Open `docs/_hobbies/music.md` and find the `favorites:` section (around line 134).

### For a Song (Track):
```yaml
- name: "Song Title"
  artist: "Artist Name"
  type: "track"
  spotify_uri: "spotify:track:PASTE_YOUR_URI_HERE"
  why: "Why you love this song"
```

### For an Album:
```yaml
- name: "Album Title"
  artist: "Artist Name"
  type: "album"
  spotify_uri: "spotify:album:PASTE_YOUR_URI_HERE"
  why: "Why you love this album"
```

---

## Step 3: Save and View

1. Save the file
2. Commit and push to GitHub
3. Visit your music page
4. The Spotify player will automatically embed!

---

## Example with Real Songs

Here's an example with actual Spotify URIs:

```yaml
favorites:
  - name: "No Role Modelz"
    artist: "J. Cole"
    type: "track"
    spotify_uri: "spotify:track:3n3Ppam7vgaVa1iaRUc9Lp"
    why: "Classic J. Cole storytelling at its finest"
    
  - name: "Last Last"
    artist: "Burna Boy"
    type: "track"
    spotify_uri: "spotify:track:3ZZkFZJ3vdVzVPmP3qVnCq"
    why: "Infectious Afrobeats rhythm that never gets old"
    
  - name: "good kid, m.A.A.d city"
    artist: "Kendrick Lamar"
    type: "album"
    spotify_uri: "spotify:album:3DGQ1iZ9XKUQxAUWjfC34w"
    why: "A cinematic masterpiece that tells a complete story"
```

---

## Features

✅ **No Authentication Required** - Spotify embeds work without API keys  
✅ **Playable** - Visitors can play 30-second previews (or full songs if they have Spotify)  
✅ **Beautiful Design** - Clean cards with embedded players  
✅ **Responsive** - Works on all devices  
✅ **Easy to Update** - Just paste new URIs to change songs  

---

## Tips

- Mix songs and albums for variety
- Add 5-8 items for a good balance
- Keep the "why" descriptions personal and authentic
- Update regularly to reflect your current rotation

---

## Need Help?

If you can't find the Spotify URI option:
1. Make sure you're using the latest Spotify version
2. Try the web player: https://open.spotify.com
3. The URI format is always: `spotify:type:id`
   - `type` = "track" or "album"
   - `id` = long string of letters/numbers

