import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.page.html',
  styleUrls: ['./expense-tracker.page.scss'],
})
export class ExpenseTrackerPage implements OnInit {
  username: string = '';
  transactions: any[] = [];
  loading: boolean = true; // Add loading indicator

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getUsername();

    // Subscribe to router events to detect navigation back from add-transaction page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.refreshTransactionsIfNecessary(event.url);
      }
    });
  }

  getUsername() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.http.get<any>(`http://localhost/finance-tracker/get-user.php?user_id=${userId}`)
        .subscribe(
          (response: any) => {
            this.username = response.username || '';
            this.getTransactions(parseInt(userId, 10)); // Parse userId to number
          },
          (error) => {
            console.error('Error fetching username:', error);
          }
        );
    } else {
      console.error('User ID not found in local storage');
    }
  }

  getTransactions(userId: number) {
    this.http.get<any[]>(`http://localhost/finance-tracker/get-transaction.php?user_id=${userId}`)
      .subscribe(
        (response: any[]) => {
          this.transactions = response;
          this.loading = false; // Update loading indicator
        },
        (error) => {
          console.error('Error fetching transactions:', error);
          this.loading = false; // Update loading indicator even on error
        }
      );
  }

  refreshTransactionsIfNecessary(url: string) {
    // Check if the URL contains '/add-transaction'
    if (url.includes('/add-transaction')) {
      this.getTransactions(parseInt(localStorage.getItem('userId') || '0', 10));
    }
  }

  addTransaction() {
    this.router.navigate(['/add-transaction']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  
  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}















