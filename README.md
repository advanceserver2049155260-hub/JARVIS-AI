# JARVIS AI — Offline-first Android PWA

## What this starter does
- Installs as a home-screen PWA on supported Android browsers.
- Caches the app shell so it can reopen offline after the first successful visit.
- Runs basic local commands: time, date, simple arithmetic, notes saved in localStorage, and available battery status.
- Optional microphone input through the browser SpeechRecognition API. Browser/device support and offline speech recognition are not guaranteed.
- Speech output uses the browser's installed speech engine; Hindi voice availability varies.

## Important limitations
This is an offline-first PWA starter, **not a full local large-language-model assistant**.
- A web app cannot reliably keep a wake-word listener running when closed or while the phone is locked. “Hey JARVIS” always-on wake word is not implemented.
- Android does not let a normal PWA forcibly free RAM, boost CPU, change all system settings, or silently control other apps.
- Voice recognition may require internet depending on the browser/device.
- No AI API is included, so there are no cloud AI answers.

## Publish on GitHub Pages
1. Extract this ZIP.
2. Upload all files and the `icons` folder to the root of a GitHub repository.
3. Enable GitHub Pages for the branch/folder containing `index.html`.
4. Open the HTTPS Pages URL in Chrome on Android.
5. Use Chrome menu → **Add to Home screen** or **Install app**.
6. Open once while online so the service worker can cache the app. Then test airplane mode.

## Future native Android version
For dependable offline speech-to-text, local LLM inference, background wake word and deeper device integrations, build a native Android app (Kotlin) with on-device models and explicit Android permissions. This PWA ZIP does not provide those native capabilities.
