import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) { }

  public login(user: Pick<User, 'email' | 'password'>): Observable<User> {
    return new Observable( observer => {
      const endPoint = '/api/users/login/';
      this.http.post<any>(environment.URL + endPoint, user).subscribe( data => {
        this.setStorage(data);
        observer.next(data);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    })
  }

  public register(user: User): Observable<User> {
    return new Observable( observer => {
      const endPoint = '/api/users/register/';
      this.http.post<any>(environment.URL + endPoint, user).subscribe( data => {
        this.setStorage(data);
        observer.next(data);
        observer.complete();
      }, error => {
        observer.error(error);
        observer.complete();
      })
    })
  }

  public isLoggedIn(): boolean {
    return this.storageService.get('userInfo') != null;
  }

  public getUserInfo(): User {
    return this.storageService.get('userInfo');
  }

  public isAdmin(): boolean {
    const userInfo = this.getUserInfo();
    return !!userInfo.isAdmin;
  }

  public logout(): boolean {
    this.storageService.remove('userInfo');
    this.authState.next(false);
    return true;
  }

  private setStorage(userInfo: Partial<User>): void {
    this.storageService.add('userInfo', userInfo);
    this.authState.next(true);
  }

  public listUsers() {
    const config = this.getTokenHeader();
    let extension = '/api/users';
    console.log(config);
    return this.http.get<User[]>(environment.URL + extension, config);
  }

  public getUserDetails(id: string) {
    const config = this.getTokenHeader();
    let extension = `/api/users/${id}`;
    return this.http.get<any>(environment.URL + extension, config);
  }

  public updateUserProfile(user: User) {
    const config = this.getTokenHeader();
    let extension = ' /api/users/profile/update';
    return this.http.put<User>(environment.URL + extension, user, config);
  }

  public updateUser(user: User) {
    const config = this.getTokenHeader();
    let currenUserID = this.getCurrentUserId();
    let extension = `/api/users/update/currenUserID`;
    return this.http.put<any>(environment.URL + extension, user, config);
  }

  public deleteUser(id: number) {
    const config = this.getTokenHeader();
    let extension = `/api/users/delete/${id}`;
    return this.http.delete<any>(environment.URL + extension, config);
  }

  getTokenHeader() {
    let userInfo: any = localStorage.getItem('userInfo');

    if (!!userInfo) {
      const { token } = JSON.parse(userInfo);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return config;
    } else {
      return {};
    }

    console.log(userInfo);

    // =
  }

  getCurrentUserId() {
    let userInfo: any = localStorage.getItem('userInfo');
    return !!userInfo ? JSON.parse(userInfo._id) : '';
  }

}
