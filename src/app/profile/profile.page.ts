import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  userId: number | undefined; 
  photo: string | undefined;
  username: string | undefined;
  defaultProfileImage: string = 'assets/default.png';
  showConfirmUpload: boolean = false;
  capturedPhoto: string | undefined;

  constructor(private photoService: PhotoService, private http: HttpClient) {}

  async ngOnInit() {
    this.userId = this.getUserIdFromLocalStorage(); 
    if (this.userId) {
      await this.loadProfilePicture();
      await this.getUsername();
    } else {
      console.error('User ID not found in local storage.');
      this.photo = this.defaultProfileImage;
    }
  }

  getUserIdFromLocalStorage(): number | undefined {
    const userIdStr = localStorage.getItem('userId');
    return userIdStr ? +userIdStr : undefined;
  }

  async loadProfilePicture() {
    try {
      const response = await this.http.get<any>(`http://localhost/finance-tracker/get-profile-picture.php?user_id=${this.userId}`).toPromise();
      if (response && response.profile_image) {
        this.photo = 'data:image/jpeg;base64,' + response.profile_image;
      } else {
        this.photo = this.defaultProfileImage;
      }
    } catch (error) {
      console.error('Error loading profile picture:', error);
      this.photo = this.defaultProfileImage;
    }
  }

  async getUsername() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.http.get<any>(`http://localhost/finance-tracker/get-user.php?user_id=${this.userId}`)
        .subscribe(
          (response: any) => {
            this.username = response.username || '';
          },
          (error) => {
            console.error('Error fetching username:', error);
          }
        );
    } else {
      console.error('User ID not found in local storage');
    }
  }

  async takePicture() {
    this.showConfirmUpload = false; 
    const imageData = await this.photoService.takePhoto();
    if (imageData) {
      this.capturedPhoto = imageData; 
      this.showConfirmUpload = true;
    }
  }

  async confirmUpload() {
    if (this.capturedPhoto && this.userId) {
      const uploadSuccess = await this.photoService.uploadPhoto(this.userId, this.capturedPhoto);
      if (uploadSuccess) {
        await this.loadProfilePicture();
        this.showConfirmUpload = false; 
      }
    } else {
      console.error('User ID or captured photo not available for upload.');
    }
  }

  cancelUpload() {
    this.showConfirmUpload = false; 
  }
}







