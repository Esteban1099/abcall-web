import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from './commons/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'abcall-web';
  shouldShowMenu = false;
  shouldShowLogOut = false;
  shouldShowBackOption = true;

  constructor(
    private router: Router,
    private eventService: EventService,) {
  }

  ngOnInit(): void {
    // Listen to route changes
    this.router.events.subscribe(() => {
      this.shouldShowMenu =
        this.router.url.includes('auth') == false &&
        this.router.url.includes('consumer');

      this.shouldShowLogOut =
        this.router.url.includes('auth') == false &&
        this.router.url.includes('consumer');

      this.shouldShowBackOption = this.router.url.includes('auth');
    });

  }

  backAuthLogin() {
    this.eventService.backAuthLogin.emit();
  }

  goToConsumer(action: string) {
    this.router.navigate(['/consumer'], {queryParams: {callBy: action}});
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }
}
