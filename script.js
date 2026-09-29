const $ = id => document.getElementById(id);
const modes = { focus: 's-focus', short: 's-short', long: 's-long' };
let mode = 'focus', total = 25 * 60, left = total, timer = null;

function minutes(m) { return Math.max(1, Number($(modes[m]).value) || 1) * 60; }
function today() { return new Date().toISOString().slice(0, 10); }

function getCount() {
  try {
    const d = JSON.parse(localStorage.getItem('tide-count') || '{}');
    return d.date === today() ? d.n : 0;
  } catch { return 0; }
}
function addCount() {
  try { localStorage.setItem('tide-count', JSON.stringify({ date: today(), n: getCount() + 1 })); } catch {}
  $('count').textContent = getCount();
}

function render() {
  const m = String(Math.floor(left / 60)).padStart(2, '0');
  const s = String(left % 60).padStart(2, '0');
  $('time').textContent = `${m}:${s}`;
  $('water').style.height = (left / total * 100) + '%';
  document.title = `${m}:${s} – Tide`;
}

function setMode(m) {
  stop();
  mode = m;
  total = left = minutes(m);
  document.querySelectorAll('.mode').forEach(b => b.classList.toggle('active', b.dataset.mode === m));
  render();
}

function stop() {
  clearInterval(timer);
  timer = null;
  $('start').textContent = 'Start';
}

function beep() {
  try {
    const ctx = new AudioContext(), o = ctx.createOscillator();
    o.connect(ctx.destination); o.frequency.value = 660;
    o.start(); o.stop(ctx.currentTime + 0.4);
  } catch {}
}

function tick() {
  left--;
  render();
  if (left <= 0) {
    stop(); beep();
    if (mode === 'focus') addCount();
    if (Notification.permission === 'granted') new Notification('Tide', { body: mode === 'focus' ? 'Focus session done. Take a break.' : 'Break over. Back to focus.' });
    setMode(mode === 'focus' ? 'short' : 'focus');
  }
}

$('start').onclick = () => {
  if (timer) return stop();
  if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
  timer = setInterval(tick, 1000);
  $('start').textContent = 'Pause';
};
$('reset').onclick = () => setMode(mode);
document.querySelectorAll('.mode').forEach(b => b.onclick = () => setMode(b.dataset.mode));
Object.values(modes).forEach(id => $(id).onchange = () => { if (!timer) setMode(mode); });

$('count').textContent = getCount();
render();
