import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Hay que clonar la request antes de que sea manipulada, pues una vez usada ya no la podriamos volver a llamar

    if (req.url !== 'https://reqres.in/api/user'){
      return next.handle(req);
    }

    const headers = new HttpHeaders({
      'token-usuario': 'ABC12312124124123JDJHW'
    });

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    )

  }


  manejarError(error: HttpErrorResponse) {
    console.log('Sucedió un error');
    console.log('Registrado en el Log File');
    console.warn(error)

    // return of(false)
    return throwError('Error personalizado');
  }
  
}
