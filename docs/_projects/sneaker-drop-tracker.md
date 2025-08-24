---
layout: projects
title: "Sneaker Drop Tracker"
description: "Real-time notification system that monitors sneaker releases across multiple platforms with personalized alerts and price tracking."
hobby: "sneakers"
date: 2024-08-15
status: "in-progress"
tech_stack: ["React Native", "Node.js", "Web Scraping", "Push Notifications", "MongoDB", "Redis"]
github: "https://github.com/gmanthenoxus/sneaker-drop-tracker"
demo: "https://sneaker-drops.app"
image: "/assets/images/projects/sneaker-drop-tracker.png"
tags: ["mobile", "notifications", "web-scraping", "real-time"]
---

# Sneaker Drop Tracker

Never miss another limited sneaker release with this comprehensive tracking system that monitors multiple platforms and sends personalized notifications based on your preferences.

## 🎯 The Problem

As a sneaker enthusiast, I was constantly missing limited releases because:
- Information was scattered across multiple apps and websites
- Release times often changed without notice
- Manual checking was time-consuming and unreliable
- Bot competition made timing crucial for securing pairs

## 💡 The Solution

I built a centralized tracking system that:
- Monitors 15+ sneaker platforms simultaneously
- Sends instant push notifications for releases matching user preferences
- Tracks price changes and restock alerts
- Provides release calendars and historical data
- Includes authentication guides and legit check resources

## 🛠️ Technical Implementation

### Architecture
- **Mobile App**: React Native for iOS and Android
- **Backend**: Node.js with Express for API and web scraping
- **Database**: MongoDB for user data, Redis for caching
- **Notifications**: Firebase Cloud Messaging for push notifications
- **Monitoring**: Custom web scrapers with proxy rotation

### Key Features
- **Smart Filtering**: AI-powered preference matching based on size, brand, and style
- **Multi-Platform Monitoring**: SNKRS, StockX, GOAT, Footlocker, and more
- **Price Tracking**: Historical price data and trend analysis
- **Community Features**: User reviews and authentication crowdsourcing
- **Offline Support**: Cached data for viewing releases without internet

## 📊 Current Status & Metrics

- **Beta Users**: 300+ active testers providing feedback
- **Platforms Monitored**: 15 major sneaker retailers and resale platforms
- **Success Rate**: 94% accuracy in release time predictions
- **Notification Speed**: Average 30-second delay from official announcements
- **User Satisfaction**: 4.7/5 rating from beta testers

## 🎨 Design Philosophy

The app prioritizes speed and clarity:
- **Minimal Interface**: Focus on essential information only
- **Dark Mode**: Optimized for late-night release monitoring
- **One-Tap Actions**: Quick access to purchase links and notifications
- **Customizable**: Personalized dashboard based on user preferences

## 🚀 Technical Challenges Solved

### Web Scraping at Scale
Implemented robust scraping system that handles anti-bot measures:
```javascript
const scrapeWithRotation = async (url, retries = 3) => {
  const proxy = getRandomProxy();
  const headers = generateRandomHeaders();
  
  try {
    const response = await fetch(url, { proxy, headers });
    return parseReleaseData(response);
  } catch (error) {
    if (retries > 0) {
      await delay(randomDelay());
      return scrapeWithRotation(url, retries - 1);
    }
    throw error;
  }
};
```

### Real-Time Notifications
Built efficient notification system that scales to thousands of users:
```javascript
const sendTargetedNotifications = async (release) => {
  const matchingUsers = await findUsersWithPreferences({
    brand: release.brand,
    size: release.availableSizes,
    priceRange: release.retailPrice
  });
  
  const notifications = matchingUsers.map(user => ({
    token: user.fcmToken,
    title: `🔥 ${release.name} Dropping Soon!`,
    body: `${release.retailPrice} • ${release.releaseTime}`,
    data: { releaseId: release.id, deepLink: release.purchaseUrl }
  }));
  
  return sendBatchNotifications(notifications);
};
```

### Data Synchronization
Implemented efficient caching strategy for real-time updates:
```javascript
const updateReleaseCache = async (releaseData) => {
  const cacheKey = `release:${releaseData.id}`;
  const ttl = calculateTTL(releaseData.releaseTime);
  
  await redis.setex(cacheKey, ttl, JSON.stringify(releaseData));
  await notifySubscribers(releaseData);
};
```

## 📈 Upcoming Features

- **AI Price Prediction**: Machine learning models to predict resale values
- **Social Features**: Friend networks and group notifications
- **Authentication Scanner**: Computer vision for legit checking
- **Market Analysis**: Comprehensive market trends and investment insights
- **Bot Protection**: Advanced anti-bot measures for fair access

## 🎓 What I Learned

This project has been a masterclass in:
- **Real-Time Systems**: Building responsive, scalable notification systems
- **Web Scraping Ethics**: Respecting rate limits and terms of service
- **Mobile Development**: Creating smooth, native-feeling cross-platform apps
- **Community Building**: Understanding user needs in niche communities
- **Data Pipeline Design**: Efficient processing of high-volume, time-sensitive data

## 🔗 Links & Resources

- **GitHub Repository**: [View Source Code]({{ page.github }})
- **Beta App**: [Download TestFlight]({{ page.demo }})
- **Documentation**: [API Docs]({{ page.github }}/wiki)
- **Community**: [Discord Server](https://discord.gg/sneaker-drops)

---

*Currently in active development with plans for public release in Q1 2025. The beta version has already helped hundreds of sneakerheads secure their grails!*
