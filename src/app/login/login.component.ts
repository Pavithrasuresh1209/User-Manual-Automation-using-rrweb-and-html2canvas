import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { RrwebService } from '../_services/rrweb.service';
import rrwebPlayer from 'rrweb-player';
import { ScreenshotService } from '../_services/screenshot.service';
import { PdfService } from '../_services/pdf.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  events: any[] = []; 
  guideScreenshots: string[] = [];
  


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService ,private rrwebService: RrwebService,private screenshotService: ScreenshotService, private pdfService: PdfService) { }

  ngOnInit(): void {
    console.log('Starting rrweb recording...');
    this.rrwebService.startRecording();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      async data => {
        this.events = this.rrwebService.stopRecording();
        console.log('Login success rrweb events:', this.events);

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        const loginForm = document.querySelector('.card-container') as HTMLElement;

        if (loginForm) {
        const screenshot = await this.screenshotService.capture(loginForm);
        this.guideScreenshots.push(screenshot);
      }
      console.log(this.guideScreenshots.length); 
        setTimeout(() => {
          if (this.events.length) {
             new rrwebPlayer({
              target: document.getElementById('replay-container')!,
              props: {
                events: this.events,
                width: window.innerWidth,
                height: window.innerHeight
              }
            });
          }
        }, 0);
        //this.reloadPage();
        // 5️⃣ Generate PDF (optional: move to button click)
      this.pdfService.generateStepByStepPdf(
        this.guideScreenshots,
        'Login Step-by-Step Guide'
      );
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
