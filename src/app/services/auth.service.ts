import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { TipoCambio } from '../interfaces/tipo-cambio';
import { TokenAuth } from '../interfaces/token-auth';
import { Usuario } from '../interfaces/usuario';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private authUrl = '/login';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  login(usuario: Usuario): Observable<TokenAuth> {
    return this.http.post<TokenAuth>(this.authUrl, usuario, this.httpOptions)
      .pipe(
        map(x => {
          localStorage.setItem('auth_token', x.jwttoken)
          return x;
        }),
        tap(_ => this.log('fetched login')),
        catchError(this.handleError<TokenAuth>('getTipoCambio', { jwttoken: ''}))
      );
  }

  isLogged(): boolean {
    if(localStorage.getItem('auth_token')){
      return true;
    } else {
      return false;
    }
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
