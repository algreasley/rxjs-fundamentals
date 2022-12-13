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

const endpoint = 'http://localhost:3333/api/facts';

const fetch$ = fromEvent(fetchButton, 'click');

fetch$
  .pipe(
    mergeMap(() => fromFetch(endpoint)),
    mergeMap((response) => response.json()),
    tap((val) => console.log(val)),
  )
  .subscribe(addFacts);
