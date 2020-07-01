import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) {
  }

  handleDownload(url: string) {
    return this.http.get(url, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    });
  }

}
