const watch = document.querySelector('#watch');
const lapList = document.querySelector('#lap-list');
let milliseconds = 0;
let timer;
let lapNumber = 1;
let lastLapTime = '00:00:00:00';

const startWatch = () => {
  watch.classList.remove('paused');
  clearInterval(timer);
  timer = setInterval(() => {
    milliseconds += 10;
    let dateTimer = new Date(milliseconds);
    watch.innerHTML =
      ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
      ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
      ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
      ('0' + dateTimer.getUTCMilliseconds()).slice(-3,-1);
  }, 10);
};

const pauseWatch = () => {
  watch.classList.add('paused');
  clearInterval(timer);
};

const resetWatch = () => {
  watch.classList.remove('paused');
  clearInterval(timer);
  milliseconds = 0;
  lapNumber = 1;
  watch.innerHTML = '00:00:00:00';
  lapList.innerHTML = '';
  lastLapTime = '00:00:00:00';
};

const addLap = () => {
  if (timer) {
    let lapTime = watch.innerHTML;
    lastLapTime = lapTime; // Save the current lap time
    let li = document.createElement('li');
    li.textContent = `Lap ${lapNumber++}: ${lapTime}`;
    lapList.appendChild(li);
  }
};

const clearLaps = () => {
  lapList.innerHTML = '';
  lapNumber = 1; // Optionally reset lap number
};

const restartWatch = () => {
  clearInterval(timer);
  milliseconds = 0;
  watch.innerHTML = lastLapTime;
  startWatch();
};

document.addEventListener('click', (e) => {
  const element = e.target;
  if (element.id === 'start') startWatch();
  if (element.id === 'pause') pauseWatch();
  if (element.id === 'reset') resetWatch();
  if (element.id === 'lap') addLap();
  if (element.id === 'clear-laps') clearLaps();
  if (element.id === 'restart') restartWatch();
});
