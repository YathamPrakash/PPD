import { Component } from '@angular/core';
import { RegisterRoleModalComponent } from '../../../Pages/auth/register-role-modal/register-role-modal.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EncryptionService } from '../../../Services/encryption.service';
@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [RegisterRoleModalComponent, CommonModule],
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {
  constructor(private router: Router, private encryptionService: EncryptionService) {}
  showRegisterModal = false;
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  openRegisterModal(): void {
    console.log('Opening register modal');
    this.showRegisterModal = true;
  }

  closeRegisterModal(): void {
    this.showRegisterModal = false;
  }
  
  handleRegistrationSelection(intent: 'guest' | 'pg-operator'): void {
    console.log(`Selected registration intent: ${intent}`);
    let selectedIntent = this.encryptionService.encrypt(intent);
    this.showRegisterModal = false;
      this.router.navigate(['/registration'], { queryParams: { intent: selectedIntent } });
  }
  _doNavToLogin(){
    this.router.navigate(['/login']);
  }
}
