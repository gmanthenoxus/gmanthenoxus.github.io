---
layout: post-how-to
title: "How to Build a Discord Bot for Anime Notifications in 7 Steps"
subtitle: "Complete guide with code examples and troubleshooting"
date: 2024-05-05
category: "tech"
image: "/assets/images/blog/discord-anime-bot.jpg"
excerpt: "Stop missing new anime episodes! Build a custom Discord bot that automatically notifies your server when new episodes are released."
read_time: "15 min read"
difficulty: "Intermediate"
estimated_time: "2 hours"
featured: false
prerequisites:
  - "Basic JavaScript/Node.js knowledge"
  - "Discord account and server admin permissions"
  - "Understanding of APIs and JSON"
  - "Text editor (VS Code recommended)"
tools_needed:
  - "Node.js (v16+)"
  - "Discord Developer Portal access"
  - "Jikan API (MyAnimeList unofficial API)"
  - "Git for version control"
troubleshooting:
  - problem: "Bot doesn't respond to commands"
    solution: "Check bot permissions in Discord server settings. Ensure bot has 'Send Messages' and 'Read Message History' permissions."
  - problem: "API rate limiting errors"
    solution: "Implement proper rate limiting with delays between requests. Jikan API allows 3 requests per second."
  - problem: "Bot goes offline frequently"
    solution: "Deploy to a cloud service like Heroku or Railway instead of running locally. Add proper error handling and auto-restart functionality."
next_steps:
  - "Add user preferences for specific anime series"
  - "Implement database storage for tracking watched episodes"
  - "Create web dashboard for bot management"
  - "Add integration with other anime databases (AniList, Kitsu)"
related_guides:
  - title: "Building Your First Discord Bot"
    url: "/blog/discord-bot-basics"
  - title: "Working with APIs in Node.js"
    url: "/blog/nodejs-api-guide"
developer_challenge:
  type: "Build"
  difficulty: 3
  description: "Extend the anime bot to create a full anime tracking system that can manage watchlists, rate episodes, and provide personalized recommendations based on viewing history."
  requirements:
    - "User watchlist management (add/remove anime)"
    - "Episode rating system (1-10 scale)"
    - "Personal viewing statistics and analytics"
    - "Recommendation engine based on user preferences"
    - "Integration with multiple anime databases"
  bonus: "Add machine learning recommendations, social features for sharing reviews, and integration with streaming platforms to track actual viewing progress."
  submission_url: "#"
tags: [discord, bot, anime, javascript, tutorial]
---

# {{ page.title }}

**Problem Agitation:** You're tired of manually checking multiple anime sites to see if new episodes have dropped. You miss releases, forget which episodes you've watched, and your Discord server has no way to coordinate anime discussions.

**Solution Preview:** By the end of this guide, you'll have a fully functional Discord bot that automatically monitors anime releases and notifies your server the moment new episodes are available.

**Time Investment:** This should take about 2 hours to complete, including testing and deployment.

---

## What You'll Accomplish

By the end of this guide, you'll be able to:
- ✅ Create and configure a Discord bot from scratch
- ✅ Connect to anime APIs for real-time episode data
- ✅ Set up automated notifications for new releases
- ✅ Deploy your bot to run 24/7 in the cloud
- ✅ Add custom commands for anime search and tracking

---

## Before We Start

**Quick Check:** Make sure you have everything from the prerequisites and tools list above.

**Estimated Time:** This should take about 2 hours to complete.

**Difficulty Level:** This guide is designed for intermediate users with basic JavaScript knowledge.

---

## Step 1: Set Up Discord Bot in Developer Portal

**What you're doing:** Create a new Discord application and bot user that can join servers.

**Detailed Instructions:**
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and name it "Anime Notifier"
3. Navigate to the "Bot" section in the left sidebar
4. Click "Add Bot" and confirm the creation
5. Copy the bot token (keep this secret!)
6. Under "Privileged Gateway Intents," enable "Message Content Intent"

**⚠️ Beginner Mistake Alert:** Never share your bot token publicly or commit it to GitHub. Use environment variables instead.

**✅ Success Check:** You should see your bot listed in the Developer Portal with a unique token.

**⏱️ Time:** Approximately 10 minutes

---

## Step 2: Initialize Node.js Project and Install Dependencies

**What you're doing:** Set up the project structure and install required packages.

**Detailed Instructions:**
1. Create a new folder: `mkdir anime-discord-bot && cd anime-discord-bot`
2. Initialize npm project: `npm init -y`
3. Install dependencies: `npm install discord.js axios node-cron dotenv`
4. Create main file: `touch index.js`
5. Create environment file: `touch .env`
6. Add your bot token to `.env`: `DISCORD_TOKEN=your_bot_token_here`

**💡 Pro Tip:** Use `npm install -D nodemon` for development to auto-restart your bot when you make changes.

**✅ Success Check:** Your package.json should list discord.js, axios, node-cron, and dotenv as dependencies.

**⏱️ Time:** Approximately 5 minutes

---

## Step 3: Create Basic Bot Structure and Connection

**What you're doing:** Write the foundation code to connect your bot to Discord.

**Detailed Instructions:**
1. Open `index.js` in your text editor
2. Add the basic bot setup code:

```javascript
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const cron = require('node-cron');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);
```

3. Test the connection: `node index.js`

**📊 Insert Screenshot:** [Bot should show "Logged in as YourBotName#1234!" in console]

**✅ Success Check:** Console should display your bot's login confirmation.

**⏱️ Time:** Approximately 10 minutes

---

## Step 4: Add Anime API Integration

**What you're doing:** Connect to Jikan API to fetch anime episode data.

**Detailed Instructions:**
1. Add API helper functions to `index.js`:

```javascript
// API Configuration
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

// Helper function to get anime by name
async function searchAnime(animeName) {
    try {
        const response = await axios.get(`${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(animeName)}&limit=1`);
        return response.data.data[0];
    } catch (error) {
        console.error('Error searching anime:', error);
        return null;
    }
}

// Helper function to get latest episodes
async function getAnimeEpisodes(animeId) {
    try {
        const response = await axios.get(`${JIKAN_BASE_URL}/anime/${animeId}/episodes`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching episodes:', error);
        return [];
    }
}
```

2. Add rate limiting to respect API limits
3. Test API connection with a sample anime search

**Alternative Method:** If Jikan API is down, you can use AniList GraphQL API as a backup.

**✅ Success Check:** API should return anime data when you test the search function.

**⏱️ Time:** Approximately 20 minutes

---

## Step 5: Implement Command System

**What you're doing:** Add Discord commands for users to interact with the bot.

**Detailed Instructions:**
1. Add message event listener:

```javascript
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'anime') {
        const animeName = args.join(' ');
        if (!animeName) {
            return message.reply('Please provide an anime name! Example: `!anime Attack on Titan`');
        }
        
        const anime = await searchAnime(animeName);
        if (anime) {
            const embed = {
                title: anime.title,
                description: anime.synopsis?.substring(0, 200) + '...',
                thumbnail: { url: anime.images.jpg.image_url },
                fields: [
                    { name: 'Episodes', value: anime.episodes?.toString() || 'Unknown', inline: true },
                    { name: 'Status', value: anime.status, inline: true },
                    { name: 'Score', value: anime.score?.toString() || 'N/A', inline: true }
                ]
            };
            message.reply({ embeds: [embed] });
        } else {
            message.reply('Anime not found! Please check the spelling and try again.');
        }
    }
});
```

2. Test the `!anime` command in your Discord server

**✅ Success Check:** Bot should respond with anime information when you use `!anime [name]`.

**⏱️ Time:** Approximately 25 minutes

---

## Step 6: Set Up Automated Episode Notifications

**What you're doing:** Create a scheduled task that checks for new episodes and sends notifications.

**Detailed Instructions:**
1. Add tracking system for monitored anime:

```javascript
// Store tracked anime (in production, use a database)
const trackedAnime = new Map();

// Function to add anime to tracking
function trackAnime(channelId, animeId, animeName) {
    if (!trackedAnime.has(channelId)) {
        trackedAnime.set(channelId, new Set());
    }
    trackedAnime.get(channelId).add({ id: animeId, name: animeName, lastEpisode: 0 });
}

// Scheduled task to check for new episodes (runs every hour)
cron.schedule('0 * * * *', async () => {
    console.log('Checking for new episodes...');
    
    for (const [channelId, animeSet] of trackedAnime) {
        const channel = client.channels.cache.get(channelId);
        if (!channel) continue;
        
        for (const anime of animeSet) {
            const episodes = await getAnimeEpisodes(anime.id);
            const latestEpisode = episodes[episodes.length - 1];
            
            if (latestEpisode && latestEpisode.mal_id > anime.lastEpisode) {
                anime.lastEpisode = latestEpisode.mal_id;
                
                const embed = {
                    title: `🆕 New Episode Available!`,
                    description: `**${anime.name}** - Episode ${latestEpisode.mal_id}`,
                    color: 0x00ff00,
                    timestamp: new Date()
                };
                
                channel.send({ embeds: [embed] });
            }
        }
    }
});
```

2. Add `!track` command to start monitoring anime
3. Test the notification system

**✅ Success Check:** Bot should send notifications when new episodes are detected.

**⏱️ Time:** Approximately 30 minutes

---

## Step 7: Deploy and Test Your Bot

**What you're doing:** Deploy your bot to a cloud service so it runs 24/7.

**Detailed Instructions:**
1. Create a `Procfile` for Heroku: `echo "worker: node index.js" > Procfile`
2. Initialize git repository: `git init && git add . && git commit -m "Initial commit"`
3. Deploy to Heroku:
   - Install Heroku CLI
   - `heroku create your-anime-bot`
   - `heroku config:set DISCORD_TOKEN=your_token_here`
   - `git push heroku main`
4. Scale the worker: `heroku ps:scale worker=1`

**Alternative Method:** You can also deploy to Railway, Render, or any other Node.js hosting service.

**✅ Success Check:** Your bot should be online 24/7 and respond to commands from any server it's in.

**⏱️ Time:** Approximately 20 minutes

---

## Testing Your Results

**Verification Steps:**
1. Invite bot to your Discord server using OAuth2 URL from Developer Portal
2. Test `!anime [name]` command with various anime titles
3. Use `!track [anime]` to start monitoring a currently airing series
4. Wait for automated notifications (or manually trigger for testing)

**Quality Check:** Bot should respond quickly, provide accurate information, and send timely notifications.

---

## Congratulations! 🎉

You've successfully built a Discord anime notification bot that can:
- Search for anime information
- Track multiple series simultaneously  
- Send automated episode notifications
- Run 24/7 in the cloud

**What you've learned:**
- Discord bot development with discord.js
- API integration and rate limiting
- Scheduled tasks with node-cron
- Cloud deployment strategies

**Your next challenge:** Try extending the bot with user preferences, database storage, or integration with streaming platforms!

---

*How did this guide work for you? Share your bot in action or ask questions in the comments!*
