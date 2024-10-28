import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from './commons/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'abcall-web';
  showMenu: boolean = false;
  showLogOut: boolean = false;
  showBackOption: boolean = true;

  constructor(
    private router: Router,
    private eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.eventService.showMenu.subscribe((): void => {
      this.showMenu = true;
      this.showBackOption = false;
      this.showLogOut = true;
    });
  }

  backAuthLogin() {
    this.eventService.backAuthLogin.emit();
  }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.router.navigate(['/auth']).then(() => true);
  }
}
