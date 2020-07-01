import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';


@Injectable()
export class CacheService {
  maxAge = 1000 * 50;
  cache = new Map();

  constructor() {
  }

  wipe(): void {
    this.cache.clear();
  }

  state() {
    return this.cache;
  }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    const expired = Date.now() - this.maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });

    if (!cached) {
      return undefined;
    }
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const entry = {url, response, lastRead: Date.now()};
    this.cache.set(url, entry);

    const expired = Date.now() - this.maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }

}
