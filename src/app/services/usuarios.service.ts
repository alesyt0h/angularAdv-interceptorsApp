import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _http: HttpClient) { }

  get headers() {
    return {
      'x-token': 'ABC12314241231KDJ'
    }
  }

  obtenerUsuario(){

    let params = new HttpParams().append('page',2);
    params = params.append('nombre','Alejandro Ortigosa');

    // const headers = new HttpHeaders({
    //   'token-usuario': 'ABC12314241231KDJ'
    // });

    return this._http.get(`https://reqres.in/api/user`,{
      params,
      // headers
      // headers: this.headers
    }).pipe(
      map((resp:any) => resp.data),

      // catchError( err => {
      //
      // catchError(this.manejarError) // tambien se podria hacer así, no hace falta llamar al metodo manejarError con ()
      //
      //   // console.log('Sucedió un error');
      //   // console.log('Registrado en el Log File');
      //   // console.warn(err)
      //   this.manejarError(err);

      //   // return of(false)
      //   return throwError('Error personalizado');
      // })
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
