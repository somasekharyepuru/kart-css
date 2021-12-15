import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  constructor(
    private storageService: StorageService
  ) { }

  public login(user: User): Observable<User> {
    return new Observable( observer => {
      this.setStorage({});
    })
  }

  public register(user: User): Observable<User> {
    return new Observable( observer => {
      this.setStorage({});
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

}
