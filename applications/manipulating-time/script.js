import { fromEvent, interval } from 'rxjs';
import {
  throttleTime,
  debounceTime,
  delay,
  debounce,
  throttle,
  scan,
  map,
  tap,
} from 'rxjs/operators';

import {
  button,
  panicButton,
  addMessageToDOM,
  deepThoughtInput,
  setTextArea,
  setStatus,
} from './utilities';

// delay forever until "Panic Button" clicked
// const panicClicks$ = fromEvent(panicButton, 'click');
// const buttonClicks$ = fromEvent(button, 'click').pipe(
//   debounce(() => panicClicks$),
// );

// don't emit for 2s after an initial click .. repeats
const buttonClicks$ = fromEvent(button, 'click').pipe(throttleTime(2000));

// wait for 2s clear time
// const buttonClicks$ = fromEvent(button, 'click').pipe(debounceTime(2000));

buttonClicks$.subscribe(addMessageToDOM);
