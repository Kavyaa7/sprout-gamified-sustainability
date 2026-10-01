# Zero-Cost Browser Storage & Data Portability Plan

Sprout will maintain a 100% free, zero-server-cost architecture using browser-native persistent storage, supplemented with an easy data backup and export feature so users can migrate their eco-journey across devices without cloud database costs.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following storage strategy was confirmed to keep Sprout 100% free to publish and share with unlimited students and eco clubs.

- **Confirmed Decision**: **Keep Free Browser Storage**. Zero hosting/database bills, zero credential friction for youth, and complete student privacy compliance (no user data leaves their device).
- **Recommended Data Portability Enhancement**: Add a lightweight **"Export / Import My Save"** utility in the profile section so users can backup or transfer their streak, badges, and points to another phone or computer whenever they want.

---

## 1. Overview & Core Concept

- **What It Does**: Stores all gamified progress (levels, streak combos, custom goals, logged environmental deeds, unlocked 3D badges, redeemed prize vouchers, and community leaderboard state) inside the browser's persistent `localStorage`.
- **Target Audience / Persona**: Students, youth eco-clubs, schools, and environmental enthusiasts who want a frictionless, zero-cost gamified tracker.
- **Key Value**: Zero financial overhead to host, share, or scale to thousands of users. Instant loading with no login hurdles.

---

## 2. User Experience & Visual Design

- **Seamless Auto-Save**: Every action logged, goal toggled, avatar chosen, and badge unlocked is instantly synchronized to local storage with optimistic UI feedback.
- **Save Backup & Transfer Modal**:
  - Accessible via the "My Journey" (Profile) screen.
  - **Export Save (.json)**: Downloads a clean, lightweight JSON file containing current stats, badges, and streak history.
  - **Import Save**: Allows the user to restore their save file on a new device with instant confetti celebration and sound chime.
  - **Reset / Start Fresh**: Controlled reset button with confirmation modal to prevent accidental deletion.
- **Visual Styling & Tone**:
  - Consistent cartoon mascot art direction (Sproutly, Splash, Sunny, Bot-E, Fern, Nimbo).
  - Uniform 3D enameled achievement medal badges (Plastic Warrior, Solar Scout, Hydration Hero, Pedal Pioneer, Compost Champion, Sprout Luminary).
  - Youthful tactile buttons with sound chimes and bubble pop reactions.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Browser Storage vs. Cloud Database**
  - *Chosen Approach*: Browser `localStorage` with JSON serialization.
  - *Why*: Ensures 100% zero recurring cost for the developer and user; scales to unlimited traffic without cloud infrastructure costs; safe for minors with zero privacy liability.
  - *Trade-off*: Progress does not automatically auto-sync across separate devices in real time unless transferred via the export/import file.
- **Decision 2: Seamless JSON Save Portability**
  - *Chosen Approach*: Native Web File API (`Blob` download and `<input type="file">` reader).
  - *Why*: Allows students to transfer their data from a school Chromebook to their personal phone in 2 clicks.
  - *Alternatives Considered*: QR code peer transfer (complex for young users, requires camera permissions) vs. Simple JSON file (standard, universal).

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                     User Device & Browser                   │
│                                                             │
│  ┌─────────────────────── AppContext ────────────────────┐  │
│  │                                                       │  │
│  │  • user (profile, avatar, goals, bio)                 │  │
│  │  • stats (points, level, streak, metrics)             │  │
│  │  • badges (unlocked status, timestamps)               │  │
│  │  • actionLogs (history of completed deeds)            │  │
│  │  • redeemedPrizes (claimed eco vouchers)              │  │
│  │                                                       │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│            ┌────────────────┴───────────────┐               │
│            ▼                                ▼               │
│  ┌────────────────────┐          ┌───────────────────────┐  │
│  │ LocalStorage Cache │          │ JSON Backup / Restore │  │
│  │                    │          │                       │  │
│  │  • sprout_user     │          │  • Export Save File   │  │
│  │  • sprout_stats    │          │  • Import Save File   │  │
│  │  • sprout_badges   │          │  • Offline Portable   │  │
│  │  • sprout_logs     │          │                       │  │
│  └────────────────────┘          └───────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

- **Storage Key Schema**:
  - `sprout_user`: UserProfile object (username, cartoon mascot avatar, selected eco-goals, bio).
  - `sprout_stats`: UserStats object (total points, streak days, water saved, plastics avoided, CO2 cut, clean energy saved).
  - `sprout_badges`: Array of 6 Badge objects with unlocked timestamps and 3D badge image paths.
  - `sprout_action_logs`: Array of recent deed records with timestamps and impact values.
  - `sprout_redeemed_prizes`: Array of claimed vouchers and redemption codes.
- **Interactive Component & State Mapping**:
  - `ProfileSetupView`: Expose "Save & Data Management" panel with Export Save button, Import Save file picker, and clear status alerts.
  - `AppContext`: Provide `exportUserData()` and `importUserData(jsonData)` helper actions with schema validation and error fallback.
