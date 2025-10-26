import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeTab: 'pending' | 'approved' | 'rejected' = 'pending';
  pendingApplications: any[] = [];
  approvedApplications: any[] = [];
  rejectedApplications: any[] = [];
  isLoading = false;
  feedbackMessage = '';

  constructor(private api: ApiService) {
    this.loadApplications();
  }

  loadApplications() {
    this.isLoading = true;
    this.api.getApplications().subscribe({
      next: (apps: any[]) => {
        this.pendingApplications = apps.filter(a => a.status === 'pending');
        this.approvedApplications = apps.filter(a => a.status === 'approved');
        this.rejectedApplications = apps.filter(a => a.status === 'rejected');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading applications:', err);
        this.isLoading = false;
      }
    });
  }

  approve(app: any) {
    this.api.updateApplicationStatus(app._id, 'approved').subscribe({
      next: () => {
        this.feedbackMessage = `✅ ${app.name}'s application approved!`;
        this.loadApplications();
        this.clearMessage();
      },
      error: (err) => console.error('Approval failed:', err)
    });
  }

  reject(app: any) {
    this.api.updateApplicationStatus(app._id, 'rejected').subscribe({
      next: () => {
        this.feedbackMessage = `❌ ${app.name}'s application rejected.`;
        this.loadApplications();
        this.clearMessage();
      },
      error: (err) => console.error('Rejection failed:', err)
    });
  }

  clearMessage() {
    setTimeout(() => (this.feedbackMessage = ''), 3000);
  }

  getActiveList() {
    if (this.activeTab === 'pending') return this.pendingApplications;
    if (this.activeTab === 'approved') return this.approvedApplications;
    if (this.activeTab === 'rejected') return this.rejectedApplications;
    return [];
  }
}
