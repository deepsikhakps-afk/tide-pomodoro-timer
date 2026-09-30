# Tide – Pomodoro Focus Timer

A simple Pomodoro timer built with plain HTML, CSS and JavaScript. No database, no build step, no dependencies. The dial drains like a tide as your session runs down.

## Features

- Focus, short break and long break modes
- Start / pause and reset
- Adjustable durations (saved per session in the settings panel)
- Sound alert and browser notification when a session ends
- Daily completed-session counter saved in `localStorage`
- Live countdown in the browser tab title
- Responsive layout, keyboard focus styles, reduced-motion support

## Tech Stack

HTML5, CSS3, vanilla JavaScript (Web Audio API, Notifications API, localStorage)

## Project Structure

```
focus-timer/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/tide-pomodoro-timer.git
   ```
2. Open `index.html` in any modern browser.

## How It Works

- `setInterval` ticks once per second and updates the display and the water level.
- When the timer hits zero, it plays a tone, sends a notification, adds to today's count (focus only), and switches to the next mode.
- The session count is stored with the date, so it resets automatically each day.

## Possible Improvements

- Alist linked to sessions
- Weekly stats chart

## Author
Deepshikha – MCA, 

## License

MIT
