# **App Name**: MelodiaVerse

## Core Features:

- Song Discovery: Fetches and displays a curated list of songs based on current trends and user preferences from the musicbrainz.org API.
- Personalized Recommendations: Utilizes user listening history and preferences (genres, artists) to provide personalized song recommendations using AI.
- Interactive Music Player: Features a music player component with controls such as play, pause, skip, and volume adjustment.
- AI-Powered Playlist Generation: AI tool automatically creates playlists based on a specific song. The AI analyzes the features of the seed song (such as tempo, key, mood) and finds similar songs in the database.
- User Authentication: Enables users to create accounts, log in, and manage their profiles. Includes options for storing listening history and preferences. Uses Firestore to persist the account details
- Search Functionality: Allows users to search for songs, artists, and albums within the application. Searches the MusicBrainz database via API.

## Style Guidelines:

- Primary color: Vibrant purple (#A020F0), evoking creativity and musicality.
- Background color: Dark gray (#222222) providing a modern and immersive experience.
- Accent color: Electric blue (#7DF9FF) to highlight interactive elements and calls to action.
- Font: 'Space Grotesk' (sans-serif) for a techy, modern, and readable interface, suitable for both headlines and body text.
- Responsive design to ensure compatibility across various devices and screen sizes. Grid-based layout for consistent spacing and alignment.
- Subtle animations and transitions to enhance user experience, such as fading effects when loading new songs or playlists. Visualizer effects in the music player, responding to the audio.
- Custom-designed icons with a minimalist style to represent different functions and features (e.g., play, pause, search, user profile).