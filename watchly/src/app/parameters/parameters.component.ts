import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentification.service';
import { Router } from '@angular/router';

interface ProfilePicture {
  picture_id: number;
  link: string;
  type: string;
}

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  userForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  defaultProfilePictures: ProfilePicture[] = [];
  selectedPictureId: number | null = null;
  showPictureSelector: boolean = false;
  selectedPicture: ProfilePicture | null = null;
  currentProfilePicture: string | null = null;
  selectedTheme: string = 'system';
  originalFormValues: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userForm.patchValue({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      });
      this.currentProfilePicture = user.profile_picture;
      // Store original values for comparison
      this.originalFormValues = {
        ...this.userForm.value,
        profilePictureId: null
      };
    }
    this.loadDefaultPictures();

    // Initialize theme selection
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.selectedTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.selectedTheme = 'dark';
    } else {
      this.selectedTheme = 'light';
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = {
        ...this.userForm.value,
        profilePictureId: this.selectedPictureId
      };

      // Check if anything has changed
      const hasFormChanged = Object.keys(this.originalFormValues).some(key => 
        this.originalFormValues[key] !== formData[key]
      );
      const hasPictureChanged = this.selectedPictureId !== null;

      if (!hasFormChanged && !hasPictureChanged) {
        this.errorMessage = 'No changes were made';
        return;
      }
      
      this.authService.updateUserProfile(formData).subscribe({
        next: (response) => {
          this.successMessage = 'Profile updated successfully';
          
          // Make sure both properties are updated in localStorage
          const userData = {
            ...response.user,
            profile_picture: response.user.profile_picture || this.currentProfilePicture
          };
          
          localStorage.setItem('userData', JSON.stringify(userData));
          
          // Only reload after ensuring data is saved
          setTimeout(() => window.location.reload(), 100);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.errorMessage = 'Error updating profile';
        }
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loadDefaultPictures() {
    this.authService.getDefaultProfilePictures().subscribe({
      next: (pictures: ProfilePicture[]) => {
        this.defaultProfilePictures = pictures;
      },
      error: (error: any) => {
        console.error('Error loading profile pictures:', error);
        // Retry after a short delay
        setTimeout(() => {
          this.loadDefaultPictures();
        }, 2000);
      }
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Check file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage = 'File size should not exceed 2MB';
        return;
      }

      // Check file type
      if (!file.type.match(/image\/(png|jpeg|gif)/)) {
        this.errorMessage = 'Only PNG, JPG and GIF files are allowed';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.userForm.patchValue({
          profile_picture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  openPictureSelector() {
    this.showPictureSelector = true;
  }

  closePictureSelector() {
    this.showPictureSelector = false;
  }

  selectDefaultPicture(picture: ProfilePicture) {
    this.selectedPictureId = picture.picture_id;
    this.selectedPicture = picture;
  }

  confirmPictureSelection() {
    if (this.selectedPicture) {
      this.currentProfilePicture = this.selectedPicture.link;
      this.userForm.patchValue({
        profilePictureId: this.selectedPicture.picture_id
      });
    }
    this.closePictureSelector();
  }

  onThemeChange(event: Event): void {
    const theme = (event.target as HTMLSelectElement).value;
    this.selectedTheme = theme;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.removeItem('theme');
      // Apply system setting
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
