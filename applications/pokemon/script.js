import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  merge,
  from,
  filter,
  catchError,
  concat,
  take,
  EMPTY,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import {
  addResults,
  addResult,
  clearResults,
  endpointFor,
  search,
  form,
} from '../pokemon/utilities';

const endpoint = 'http://localhost:3333/api/pokemon/search/';

const search$ = fromEvent(search, 'input').pipe(
  debounceTime(300),
  tap(() => {
    clearResults();
  }),
  map((event) => event.target.value),
  switchMap((searchTerm) =>
    fromFetch(
      endpoint + searchTerm + '?delay=1000&chaos=true&flakiness=2',
    ).pipe(
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
);

search$.subscribe(({ pokemon, error }) => {
  if (pokemon) {
    addResult(pokemon);
  } else {
    console.error(error);
  }
});
