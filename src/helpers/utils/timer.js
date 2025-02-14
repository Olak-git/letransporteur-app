export class Timer {

    timers = {};

    setInterval = (name, fn, interval) => {
        this.timers[name] = setInterval(fn, interval);
    }
    clearInterval = (name) => {
        if(this.intervalExists(name))
            clearInterval(this.timers[name])
    }
    intervalExists = (name) => {
        return this.timers.hasOwnProperty(name)
    }
    setTimeout = (name, fn, interval) => {
        this.timers[name] = setTimeout(fn, interval);
    }
    clearTimeout = (name) => {
        if(this.intervalExists(name))
            clearTimeout(this.timers[name])
    }
    timeoutExists = (name) => {
        return this.timers.hasOwnProperty(name)
    }
}

const timer = new Timer();

export default timer;