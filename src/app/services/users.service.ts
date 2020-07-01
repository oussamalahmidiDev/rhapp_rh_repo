import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL: string = environment.BASE_URL;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/api/users`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/api/users/create`, user);
  }

  updateUser(id, user: User): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/api/users/${id}/modifier`, user);
  }

  deleteUser(id) {
    return this.http.delete(`${this.BASE_URL}/api/users/${id}/delete`, {responseType: 'text'});
  }

}
