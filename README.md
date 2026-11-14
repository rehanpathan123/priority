# You Are My First Priority ❤️

A cinematic romantic single-page website built with React, Vite, Three.js, React Three Fiber, Drei and Framer Motion.

## Run locally

1. Install Node.js (18 or newer).
2. Unzip this project and open the folder in Terminal.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL shown by Vite (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

Upload the generated `dist` folder to a static host such as Vercel or Netlify. For Vercel, import the project repository and keep the default Vite build settings.

## Personalize it

Edit `src/App.jsx`:
- Change the letter text in the `letter-content` section.
- Change the four items in the `reasons` array.
- Replace the memory-card gradients with your own photos using CSS `background-image`.
- Change “Someone who cares” to your preferred sign-off.
- Update the page title in `index.html`.

## Notes

- The 3D heart is rendered live with Three.js; it is not a pre-recorded video.
- The music control is a visual toggle placeholder. Add a licensed audio file and an audio player if you want background music.
- This is a starter project: replace the generic copy with your own real memories and wording before sharing it.
