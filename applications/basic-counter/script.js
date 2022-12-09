import { fromEvent, interval, merge, NEVER } from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

let subscription;
const timer$ = interval(1000);
start$.subscribe(() => {
  if (!subscription) {
    subscription = timer$.subscribe((intervalCount) => {
      setCount(intervalCount);
    });
  }
});

pause$.subscribe(() => {
  if (subscription) {
    subscription.unsubscribe();
    subscription = undefined;
  }
});
