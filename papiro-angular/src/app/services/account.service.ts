import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user') || '{}'));
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
      return this.userSubject.value;
  }

  login(username: any, password: any) {
    let temp : User;
    this.getByName(username).subscribe(u => {
      temp = u;
      if(temp && temp.password == password) {
        sessionStorage.setItem('user', JSON.stringify(u));
        this.userSubject.next(u);
        this.router.navigate(['/']);

      }
    });
    

  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('user');
      //this.userSubject.next(null);
      this.router.navigate(['/account/login']);
  }

  register(user: User) {
      console.log("REGISTADO")
      return this.http.post(`${environment.apiUrl}/users`, user);
  }

  getAll(): Observable<User[]> {
    
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
    .pipe(tap(users => console.log(users)));
  }

  getById(id: string) {
      return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  getByName(name: string): Observable<User> {
    
    return this.http.get<User>(`${environment.apiUrl}/users/${name}`);
  }


  delete(id: string) {
      return this.http.delete(`${environment.apiUrl}/users/${id}`)
          .pipe(map(x => {
              // auto logout if the logged in user deleted their own record
              if (id == this.userValue._id) {
                  this.logout();
              }
              return x;
          }));
  } 
}
