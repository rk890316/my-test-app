import { Injectable }     from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { RegReturn }     from './reg-return';

@Injectable()
export class RegisterService {
  private listsUrl = 'http://test.irenmai.top/index.php?s=/Home/Test/setReg';  // URL to web API
  constructor (private http: Http) {}
  postData (data: Array<any[]>): Observable<RegReturn> {
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.listsUrl, { data }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
