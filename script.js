document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsContainer = document.getElementById('laps');
    
    // Variables
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let running = false;
    let lapCount = 0;
    
    // Format time as HH:MM:SS
    function formatTime(timeInMs) {
        let date = new Date(timeInMs);
        let hours = date.getUTCHours().toString().padStart(2, '0');
        let minutes = date.getUTCMinutes().toString().padStart(2, '0');
        let seconds = date.getUTCSeconds().toString().padStart(2, '0');
        let milliseconds = Math.floor((date.getUTCMilliseconds() / 10)).toString().padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    
    // Update the display
    function updateDisplay() {
        const currentTime = Date.now() - startTime + elapsedTime;
        display.textContent = formatTime(currentTime);
    }
    
    // Start the stopwatch
    function start() {
        if (!running) {
            running = true;
            startTime = Date.now();
            timerInterval = setInterval(updateDisplay, 10);
            
            startBtn.disabled = true;
            stopBtn.disabled = false;
            lapBtn.disabled = false;
        }
    }
    
    // Stop the stopwatch
    function stop() {
        if (running) {
            running = false;
            clearInterval(timerInterval);
            elapsedTime += (Date.now() - startTime);
            
            startBtn.disabled = false;
            stopBtn.disabled = true;
            lapBtn.disabled = true;
        }
    }
    
    // Reset the stopwatch
    function reset() {
        running = false;
        clearInterval(timerInterval);
        elapsedTime = 0;
        display.textContent = '00:00:00.00';
        lapsContainer.innerHTML = '';
        lapCount = 0;
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
        lapBtn.disabled = true;
    }
    
    // Record a lap
    function lap() {
        if (running) {
            lapCount++;
            const currentTime = Date.now() - startTime + elapsedTime;
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            lapItem.innerHTML = `
                <span>Lap ${lapCount}</span>
                <span>${formatTime(currentTime)}</span>
            `;
            lapsContainer.prepend(lapItem);
        }
    }
    
    // Event listeners
    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);
});