import { fromEvent, interval, merge, NEVER } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click').pipe(map(() => true));
const pause$ = fromEvent(pauseButton, 'click').pipe(map(() => false));

merge(start$, pause$)
  .pipe(
    switchMap((running) => (running ? interval(1000) : NEVER)),
    scan((total) => total + 1, 0),
  )
  .subscribe(setCount);
