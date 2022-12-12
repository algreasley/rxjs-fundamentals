import { fromEvent, merge, interval, concat, race, forkJoin } from 'rxjs';
import { mapTo, startWith, take, map } from 'rxjs/operators';
import {
  labelWith,
  startButton,
  pauseButton,
  setStatus,
  bootstrap,
  clearButton,
} from './utilities';

const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
const clear$ = fromEvent(clearButton, 'click');

merge(start$, pause$)
  .pipe(startWith(false))
  .subscribe((val) => setStatus(val));

const first$ = interval(1500).pipe(map(labelWith('First')), take(3));
const second$ = interval(1000).pipe(map(labelWith('Second')), take(3));

// const combined$ = merge(first$, second$);
// const combined$ = concat(first$, second$);
// const combined$ = race(first$, second$);
const combined$ = forkJoin(first$, second$);

bootstrap({ first$, second$, combined$ });
