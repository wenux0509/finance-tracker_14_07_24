import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface AddTransactionResponse {
  success: boolean;
  error?: string;
}

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage {
  amount: number = 0; // Initialize amount
  category: string = ''; // Initialize category
  date: string; // Declare date without initialization
  notes: string = ''; // Initialize notes
  location: string = ''; // Initialize location
  userId: number | undefined; // Declare userId as number or undefined

  addTransactionError: string = '';

  constructor(private router: Router, private http: HttpClient) {
    const userIdStr = localStorage.getItem('userId');
    this.userId = userIdStr ? +userIdStr : undefined; // Initialize userId from localStorage

    // Initialize date to current date (YYYY-MM-DD format)
    const currentDate = new Date();
    this.date = currentDate.toISOString().split('T')[0];
  }

  addTransaction() {
    // Validate inputs
    if (!this.amount || !this.category || !this.date || !this.location) {
      alert('Please fill in all required fields.');
      return;
    }

    const transactionData = {
      amount: this.amount,
      category: this.category,
      date: this.date,
      notes: this.notes,
      location: this.location,
      user_id: this.userId
    };

    this.http.post<AddTransactionResponse>('http://localhost/finance-tracker/add-transaction.php', transactionData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (response: AddTransactionResponse) => {
        if (response.success) {
          this.addTransactionError = ''; // Clear any previous error message
          console.log('Transaction added successfully:', response);
          alert('Transaction added successfully');
          // Navigate to another page upon successful transaction addition
          this.router.navigate(['/expense-tracker']); // Replace with your desired page

          // Clear form fields for next transaction
          this.amount = 0;
          this.category = '';
          const currentDate = new Date();
          this.date = currentDate.toISOString().split('T')[0];
          this.notes = '';
          this.location = '';
        } else {
          this.addTransactionError = response.error || 'Unknown error occurred.';
          console.error('Failed to add transaction:', this.addTransactionError);
          alert('Failed to add transaction: ' + this.addTransactionError);
        }
      },
      error => {
        console.error('An error occurred:', error);
        this.addTransactionError = 'An error occurred, please try again later.';
        alert(this.addTransactionError);
      }
    );
  }
}

















