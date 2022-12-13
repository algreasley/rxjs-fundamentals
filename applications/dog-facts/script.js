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
    tap(() => {
      clearFacts();
      clearError();
    }),
    mergeMap(() =>
      fromFetch(endpoint).pipe(
        mergeMap((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('something bad happened :(');
          }
        }),
        retry(4),
        // catchError here otherwise completes the outer observable
        catchError((error) => {
          return of({ error: error.message });
        }),
      ),
    ),
  )
  .subscribe(({ facts, error }) => {
    if (facts) {
      addFacts({ facts });
    } else {
      setError(error);
    }
  });
