import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { TipoCambio } from '../interfaces/tipo-cambio';
import { TipoCambioCalculad } from '../interfaces/tipo-cambio-calculado';


@Injectable({ providedIn: 'root' })
export class TipoCambioService {

  private tipoCambioUrl = '/tipo-cambio/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getTipoCambio(): Observable<TipoCambio[]> {
    return this.http.get<TipoCambio[]>(this.tipoCambioUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched tipoCambio')),
        catchError(this.handleError<TipoCambio[]>('getTipoCambio', []))
      );
  }

    /** GET heroes from the server */
    getTipoCambioItem(origen: string, destino: string): Observable<TipoCambio> {
      const urlFinal = this.tipoCambioUrl + '/' + origen + '/a/' + destino;
      return this.http.get<TipoCambio>(urlFinal, this.httpOptions)
        .pipe(
          tap(_ => this.log('fetched tipoCambio')),
          catchError(this.handleError<TipoCambio>('getTipoCambio'))
        );
    }

      /** GET heroes from the server */
      getcalcular(origen: string, destino: string, monto: string): Observable<TipoCambioCalculad> {
        const urlFinal = '/cambio/'+ monto  + '/' + origen + '/a/' + destino;
        return this.http.get<TipoCambioCalculad>(urlFinal, this.httpOptions)
          .pipe(
            tap(_ => this.log('fetched tipoCambio')),
            catchError(this.handleError<TipoCambioCalculad>('getTipoCambio'))
          );
      }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(origen: string, destino: string): Observable<TipoCambio> {
    const url = `${this.tipoCambioUrl}/?id=${origen}`;
    return this.http.get<TipoCambio[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${origen}`);
        }),
        catchError(this.handleError<TipoCambio>(`getHero id=${origen}`))
      );
  }

 

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addTipoCambio(tipoCambio: TipoCambio): Observable<TipoCambio> {
    return this.http.post<TipoCambio>(this.tipoCambioUrl, tipoCambio, this.httpOptions).pipe(
      tap((newHero: TipoCambio) => this.log(`added hero w/ id=${tipoCambio.monedaOrigen}`)),
      catchError(this.handleError<TipoCambio>('addTipocambio'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
