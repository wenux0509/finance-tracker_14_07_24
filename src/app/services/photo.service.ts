import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  async takePhoto(): Promise<string | undefined> {
    try {
      const capturedPhoto: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100
      });

      return capturedPhoto.base64String; // Returns base64 encoded string
    } catch (error) {
      console.error('Error taking photo', error);
      return undefined;
    }
  }

  
  async uploadPhoto(userId: number, imageData: string): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('user_id', userId.toString());
      formData.append('image', imageData);

      const response = await this.http.post<any>('http://localhost/finance-tracker/upload-profile-picture.php', formData).toPromise();
      if (response.success) {
        return true;
      } else {
        console.error('Failed to upload photo:', response.error);
        return false;
      }
    } catch (error) {
      console.error('Error uploading photo', error);
      return false;
    }
  }
}






