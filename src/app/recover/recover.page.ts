import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage {
  username: string = '';
  secretnum: number | null = null;
  newPassword: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  recoverPassword() {
    if (this.secretnum === null || this.secretnum.toString().length !== 4) {
      alert('Secret number must be 4 digits.');
      return;
    }

    const recoverData = {
      username: this.username,
      secretnum: this.secretnum,
      newPassword: this.newPassword
    };

    this.http.post('http://localhost/finance-tracker/recover.php', recoverData)
      .subscribe((response: any) => {
        if (response.success) {
          alert('Password reset successful');
          this.router.navigate(['/login']);
        } else {
          alert('Password reset failed: ' + response.error);
        }
      }, error => {
        console.error('An error occurred:', error);
        alert('An error occurred');
      });
  }
}

