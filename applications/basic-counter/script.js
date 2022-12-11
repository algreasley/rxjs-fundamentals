import { fromEvent, interval, merge, NEVER } from 'rxjs';
import { scan, skipUntil, takeUntil } from 'rxjs/operators';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

// obvs issues, start/pause only once as using *Until
const timer$ = interval(1000)
  .pipe(
    skipUntil(start$),
    takeUntil(pause$),
    scan((total) => total + 1, 0),
  )
  .subscribe(setCount);
