---
layout: hobby
title: "Sports"
slug: sports
emoji: "🏀"
color: "#2E86AB"
description: "From street soccer to the hardwood court. My lifelong journey through athletic expression and the community it builds."

# Rotating Quotes
quotes:
  - text: "It's not whether you get knocked down, it's whether you get back up."
    author: "Vince Lombardi"
  - text: "Skills fly out the window when you don't play with passion."
    author: "Giannis Antetokounmpo"
  - text: "Talent wins games, but teamwork and intelligence win championships."
    author: "Michael Jordan"

# Live Statistics Dashboard
statistics:
  # Time filter options
  time_periods:
    - id: "week"
      label: "This Week"
      active: false
    - id: "month"
      label: "This Month"
      active: false
    - id: "year"
      label: "This Year"
      active: false
    - id: "all"
      label: "All Time"
      active: true

  # Main statistics
  stats:
    - id: "basketball_sessions"
      label: "Basketball Sessions"
      icon: "fas fa-basketball-ball"
      value: "12"
      numeric_value: 12
      progress: 75
      trend: "up"
      trend_value: "+3 from last month"
      comparison:
        type: "goal"
        label: "Monthly Goal: 16"
        value: "4 to go"
        percentage: 75
      tooltip: "Regular pickup games and court sessions as a pass-first point guard"
      milestone:
        reached: false
        title: "Court Regular"
        icon: "�"
        description: "Play 16+ sessions per month"
        progress: 75
      chart_data: [8, 9, 10, 11, 9, 12]
      time_data:
        week: 3
        month: 12
        year: 124
        all: 500

    - id: "assists"
      label: "Assists"
      icon: "fas fa-hands-helping"
      value: "47"
      numeric_value: 47
      progress: 85
      trend: "up"
      trend_value: "+12 from last month"
      comparison:
        type: "average"
        label: "vs Team Average"
        value: "28 assists"
        percentage: 68
      tooltip: "Pass-first point guard mentality - making teammates better"
      milestone:
        reached: true
        title: "Playmaker"
        icon: "�"
        description: "50+ assists in a month"
        progress: 94
      chart_data: [32, 35, 38, 41, 35, 47]
      time_data:
        week: 11
        month: 47
        year: 512
        all: 2100

    - id: "hours_played"
      label: "Hours Played"
      icon: "fas fa-clock"
      value: "18h"
      numeric_value: 18
      progress: 60
      trend: "stable"
      trend_value: "+0 from last month"
      comparison:
        type: "goal"
        label: "Monthly Goal: 30h"
        value: "12h to go"
        percentage: 60
      tooltip: "Time on court across all sports - basketball, table tennis, badminton, chess"
      milestone:
        reached: false
        title: "Dedicated Athlete"
        icon: "⏱️"
        description: "30+ hours per month"
        progress: 60
      chart_data: [15, 16, 18, 19, 17, 18]
      time_data:
        week: 4.5
        month: 18
        year: 198
        all: 850

    - id: "games_organized"
      label: "Games Organized"
      icon: "fas fa-users"
      value: "5"
      numeric_value: 5
      progress: 50
      trend: "up"
      trend_value: "+2 from last month"
      comparison:
        type: "community"
        label: "Community Impact"
        value: "40+ players"
        percentage: 100
      tooltip: "Coordinating pickup games and bringing the community together"
      milestone:
        reached: false
        title: "Community Builder"
        icon: "🤝"
        description: "Organize 10+ games per month"
        progress: 50
      chart_data: [2, 3, 4, 3, 3, 5]
      time_data:
        week: 1
        month: 5
        year: 48
        all: 180

# World Statistics for Context
world_stats:
  - icon: "⚽"
    value: "3.5B"
    label: "Football (soccer) fans globally"
    source: "FIFA Global Report 2024"
  - icon: "🏀"
    value: "450M"
    label: "Basketball players worldwide"
    source: "FIBA Statistics 2024"
  - icon: "🤝"
    value: "8,000+"
    label: "Indigenous sports worldwide"
    source: "UNESCO Sports Heritage"
  - icon: "🏛️"
    value: "15,000"
    label: "Years wrestling has existed"
    source: "Archaeological Sports History"

# Personal Journey
personal_journey:
  origin_story: "My story isn't one of specialized training or elite camps; it's a story of pure, undirected energy and a deep seated need to move. From sprinting in nursery school to performing bicycle stunts on the street, sports have always been my constant. As a military kid who changed schools frequently, the universal language of a game whether soccer on dusty roads or badminton with my dad ."
  current_status: "Active basketball player (pass-first point guard) who's played 10+ sports throughout life. Currently building tools to solve the coordination and community problems that plague casual sports players everywhere."
  goals:
    - "Build Athlehub - a sports-first social platform for casual players"
    - "Create tools that make finding pickup games effortless"
    - "Develop systems to track and celebrate casual sports achievements"
    - "Foster stronger communities around neighborhood courts and fields"
    - "Never show up to an empty court again"
  achievements:
    - "First basketball shot ever was a swish - the moment that started it all"
    - "Played 10+ different sports from street soccer to high jump"
    - "Built lasting friendships through pickup games and court sessions"
    - "Attempted high jump at 5'6\" - not for medals, but for the joy of trying"
# Favorite Sports (Detailed)
favorites:
  - title: "Basketball"
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800"
    rating: 5
    genres: ["Team Sport", "Strategic", "Fast-Paced"]
    why: "The sport that chose me. That first swish ignited a passion that's never faded. As a pass-first point guard, I love orchestrating plays, finding the open man, and making my teammates better. Basketball taught me that the best moments aren't always about scoring—they're about the perfect assist that makes everyone shine."
    year: "Started 2015"
    stats:
      - label: "Position"
        value: "Point Guard"
      - label: "Style"
        value: "Pass-First"
      - label: "Years"
        value: "14+"

  - title: "Soccer"
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800"
    rating: 5
    genres: ["Team Sport", "Endurance", "Universal"]
    why: "The universal language that connected me across schools and countries. As a military kid, soccer on dusty roads was how I made friends, how I belonged. Every pickup game was a chance to communicate without words, to be part of something bigger than myself."
    year: "Started 2010"
    stats:
      - label: "Position"
        value: "Left Back"
      - label: "Style"
        value: "Pace Bruiser"
      - label: "Years"
        value: "15+"

  - title: "Table Tennis"
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800"
    rating: 4
    genres: ["Individual", "Strategic", "Reflexes"]
    why: "The strategic duel that combines lightning reflexes with mental chess. Every rally is a conversation, every spin a question, every return an answer. Table tennis taught me that sports can be as much about outsmarting your opponent as outplaying them."
    year: "Started 2017"
    stats:
      - label: "Style"
        value: "All-Around"
      - label: "Strength"
        value: "cuts"
      - label: "Years"
        value: "8+"

  - title: "Badminton"
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800"
    rating: 4
    genres: ["Individual/Doubles", "Precision", "Endurance"]
    why: "Bonding with my dad through patient rallies and learning the value of precision. Badminton taught me that power isn't everything—placement, timing, and patience can beat raw strength. Every game with my dad was a lesson in both sport and life."
    year: "Started 2013"
    stats:
      - label: "Format"
        value: "Singles"
      - label: "Style"
        value: "Defensive"
      - label: "Years"
        value: "12+"

  - title: "Chess"
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800"
    rating: 5
    genres: ["Mental Sport", "Strategic", "Timeless"]
    why: "The ultimate mental battlefield where every move matters. Chess taught me patience, foresight, and the beauty of thinking three steps ahead. It's the sport where physical limitations don't exist—only the depth of your strategy and the strength of your mind. Every game is a story, every position a puzzle waiting to be solved."
    year: "Started 2012"
    stats:
      - label: "Style"
        value: "Positional"
      - label: "Rating"
        value: "---"
      - label: "Years"
        value: "13+"

# Fun Facts
fun_facts:
  - icon: "🌍"
    title: "A Universal Language"
    description: "There are over 8,000 indigenous sports and sporting games worldwide, making it one of humanity's most diverse cultural expressions."
    source: "UNESCO Sports Heritage Database"
  - icon: "🏛️"
    title: "The First Sport"
    description: "Wrestling is considered the world's oldest sport, with cave drawings dating back 15,000 years depicting matches."
    source: "Archaeological Sports History"
  - icon: "🤝"
    title: "More Than a Game"
    description: "A study of European football found that 85% of fans feel a strong sense of community and belonging because of their team."
    source: "European Football Community Study 2023"
  - icon: "🏀"
    title: "Basketball's Global Reach"
    description: "Basketball is played by over 450 million people worldwide, making it one of the most accessible and popular sports globally."
    source: "FIBA Global Basketball Statistics"

# Interactive Trivia
trivia:
  - question: "Which sport is considered the oldest in the world?"
    options:
      - text: "Running"
        correct: false
      - text: "Wrestling"
        correct: true
      - text: "Javelin"
        correct: false
      - text: "Swimming"
        correct: false
    explanation: "Cave paintings in France depict wrestlers from over 15,000 years ago! Wrestling is humanity's oldest documented sport."

  - question: "In football (soccer), what is the term for scoring three goals in a single game?"
    options:
      - text: "Hat-Trick"
        correct: true
      - text: "Triple-Double"
        correct: false
      - text: "Brace"
        correct: false
      - text: "Slam Dunk"
        correct: false
    explanation: "The term 'hat-trick' originated in cricket, where a bowler taking three wickets in consecutive deliveries would often be awarded a hat. The term later spread to other sports!"

  - question: "In basketball, what does 'triple-double' mean?"
    options:
      - text: "Scoring 30+ points in a game"
        correct: false
      - text: "Double-digit numbers in three statistical categories"
        correct: true
      - text: "Making three consecutive three-pointers"
        correct: false
      - text: "Playing three quarters without a break"
        correct: false
    explanation: "A triple-double is achieved when a player records double-digit numbers (10+) in three of five statistical categories: points, rebounds, assists, steals, and blocks. It's a rare feat that showcases all-around excellence!"

  - question: "How many squares are there on a standard chess board?"
    options:
      - text: "64 squares"
        correct: false
      - text: "204 squares"
        correct: true
      - text: "100 squares"
        correct: false
      - text: "128 squares"
        correct: false
    explanation: "While there are 64 individual squares (8×8), a chess board actually contains 204 total squares when you count all possible square sizes: 64 (1×1) + 49 (2×2) + 36 (3×3) + 25 (4×4) + 16 (5×5) + 9 (6×6) + 4 (7×7) + 1 (8×8) = 204!"

  - question: "In table tennis, what is the maximum number of consecutive serves one player can have?"
    options:
      - text: "5 serves"
        correct: false
      - text: "2 serves"
        correct: true
      - text: "3 serves"
        correct: false
      - text: "Until they lose a point"
        correct: false
    explanation: "In modern table tennis rules, each player serves for 2 consecutive points before the serve switches to the opponent. This changed from the old rule of 5 serves to make games faster and more exciting!"

# Current Projects
current_projects:
  - name: "Athlehub"
    icon: "🏀"
    description: "A sports-first social hub to solve coordination, tracking, and community recognition for casual players. Find games, track stats, and build your sports community."
    status: "Vision Stage"
    progress: 15
    tech_stack: ["TBD"]
    last_updated: "TBD"
    url: "#"
    github_url: "#"

  - name: "Pickup Sports Coordinator"
    icon: "📍"
    description: "A tool to find games, organize players, and ensure the court is never empty again. Real-time coordination for casual sports communities."
    status: "Ideation"
    progress: 5
    tech_stack: ["TBD"]
    last_updated: "TBD"
    url: "#"
    github_url: "#"

# External Platforms
external_platforms:
  - name: "Chess.com"
    icon: "fas fa-chess"
    description: "Online chess games and tournaments - Follow my chess journey"
    url: "https://www.chess.com/member/gmanthenoxus"
    color: "#7FA650"
  - name: "Strava"
    icon: "fab fa-strava"
    description: "Track basketball sessions, runs, and athletic activities"
    url: "https://www.strava.com/athletes/191156625"
    color: "#FC4C02"
  - name: "Instagram"
    icon: "fab fa-instagram"
    description: "Athletic journey, game highlights, and sports lifestyle"
    url: "https://www.instagram.com/_athlee/"
    color: "#E4405F"

# Empty States
empty_states:
  projects: "Even the best players have off-seasons - the next game-changing sports tool is in development!"
  projects_icon: "🏗️"
  projects_title: "Building the Future of Casual Sports"
  projects_description: "Great sports communities deserve great tools. The platform that solves empty courts and missed games is worth the wait!"

# Call to Action
cta:
  title: "Tired of Showing Up to Empty Courts?"
  description: "Let's build better tools for the casual sports community together."
  button_text: "Share Your Ideas"
  button_url: "/contact"
---

## My Sports Journey

My story isn't one of specialized training or elite camps; it's a story of pure, undirected energy and a deep-seated need to move. From sprinting in nursery school to performing bicycle stunts on the street, sports have always been my constant. As a military kid who changed schools frequently, the universal language of a game, whether it was soccer on dusty roads or badminton with my dad. It was how I connected, how I settled in, and how I expressed myself.

The spark for basketball was almost accidental. Moving to a house right beside a court felt like fate. With no prior experience, I walked out, shot a ball, and watched my first bucket swish through the net. That was the moment. That simple success ignited a passion that has since expanded to include everything from the strategic duel of table tennis to the endurance test of long distance running. I've even attempted the high jump at 5'6" not for medals, but for the pure joy of trying.

## The Bond & The Problem

For me, sports have never been solely about competition. They're about the bonds forged on the pitch and the court. Some of my closest friends are people I met because of a shared drive to improve and a shared passion for the game. Sports are an unparalleled unit of unison, breaking down barriers of language, upbringing, and background.

But this beautiful community faces ugly frustrations. I've lost count of the times I've shown up to an empty court, heard about a pickup game too late, or watched the stats and stories of a great match disappear into thin air. This isn't just a basketball problem. My friends who play football, volleyball, and badminton all share the same pain: a lack of coordination, missing data, and no lasting recognition for the communities we build every time we play.

## The Vision

This frustration is where my passion meets my skills. I see a world where technology serves the casual athlete where finding a game is effortless, where your contributions are tracked and celebrated, and where the community thrives beyond the final whistle. My goal is to build that world, starting with the tools we wish we had.

### **What I'm Building**

**Athlehub** - A sports-first social platform that solves the coordination problem:
- **Find Games Instantly**: Real-time coordination for pickup games in your area
- **Track Your Journey**: Stats, achievements, and memories that don't disappear
- **Build Community**: Recognition and connection for casual athletes
- **Never Miss Out**: Notifications for games, events, and your sports community

### **The Impact I Want to Create**

- **For Players**: No more empty courts, missed games, or lost stats
- **For Communities**: Stronger bonds through better coordination and recognition
- **For the Sport**: Celebrating the casual athlete who plays for love of the game
- **For Technology**: Proving that the best tools serve real human needs

## Philosophy

Sports taught me that the best moments aren't always about winning—they're about showing up, giving your all, and being part of something bigger than yourself. Whether it's a perfect assist, a hard-fought defensive stand, or just the joy of running with friends, these moments deserve to be remembered and celebrated.

The casual sports community is massive, passionate, and underserved. We deserve tools as good as the ones built for fantasy sports and professional analytics. That's what I'm building.
