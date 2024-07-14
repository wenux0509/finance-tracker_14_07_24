import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = ''; // Initialize with empty string or mark as undefined
  password: string = ''; // Initialize with empty string or mark as undefined

  constructor(private router: Router, private http: HttpClient) { }

  register() {
    this.http.post('http://localhost/finance-tracker/register.php', { email: this.email, password: this.password })
      .subscribe((response: any) => {
        if (response.success) {
          alert('Registration successful');
          this.router.navigate(['/login']);
        } else {
          alert('Registration failed');
        }
      }, error => {
        alert('An error occurred');
      });
  }
}

