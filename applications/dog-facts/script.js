import { fromEvent, of, timer, merge, NEVER } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  exhaustMap,
  mapTo,
  mergeMap,
  retry,
  startWith,
  switchMap,
  tap,
  pluck,
  map,
} from 'rxjs/operators';

import {
  fetchButton,
  stopButton,
  clearError,
  clearFacts,
  addFacts,
  setError,
} from './utilities';

const endpoint = 'http://localhost:3333/api/facts?delay=1000&flakiness=2';

const fetch$ = fromEvent(fetchButton, 'click');

fetch$
  .pipe(
    mergeMap(() =>
      fromFetch(endpoint).pipe(
        mergeMap((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('something bad happened :(');
          }
        }),
        catchError((error) => {
          return of({ error: error.message });
        }),
      ),
    ),
  )
  .subscribe(({ facts, error }) => {
    clearFacts();
    clearError();
    if (facts) {
      addFacts({ facts });
    } else {
      setError(error);
    }
  });

// mergeMap(() => fromFetch(endpoint)).pipe(
//   mergeMap((response) => {
//     if (response.ok) {
//       console.log(response);
//       return response.json();
//     } else {
//       console.error(error);
//       throw new Error('something bad happened :(');
//     }
//   }),
//   catchError((error) => {
//     return of({ error: error.message });
//   }),
// ),
