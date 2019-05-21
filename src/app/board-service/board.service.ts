import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }
  boardApiUrl = 'https://localhost:5001/api/board';

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.message;
    }
    return throwError(errorMessage);
  }

  getBoard(): Observable<any> {
    return this.http.get(this.boardApiUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
}
