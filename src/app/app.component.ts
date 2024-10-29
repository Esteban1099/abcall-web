import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from './commons/event.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'abcall-web';
  showMenu: boolean = false;
  showLogOut: boolean = false;
  showBackOption: boolean = false;

  constructor(
    private router: Router,
    private eventService: EventService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.eventService.showMenu.subscribe((): void => {
      this.showMenu = true;
      this.showBackOption = false;
      this.showLogOut = true;
    });
    if (this.authService.isAuthenticatedUser()) {
      this.showMenu = true;
      this.showBackOption = false;
      this.showLogOut = true;
    }
    this.eventService.showBackAuthLogin.subscribe((): void => {
      this.showBackOption = true;
    })
  }

  backAuthLogin() {
    this.showBackOption = false;
    this.eventService.backAuthLogin.emit();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.showMenu = false;
    this.showBackOption = false;
    this.showLogOut = false;
    this.router.navigate(['/auth']);
  }
}
