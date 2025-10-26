import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent {
  opportunities: any[] = [];
  searchTerm = '';
  showModal = false;
  selectedOpportunity: any = null;
  successMessage = '';

  application = { name: '', email: '', reason: '' };

  constructor(private api: ApiService) {
    this.loadOpportunities();
  }

  loadOpportunities() {
    this.api.getOpportunities().subscribe((data) => {
      this.opportunities = data;
    });
  }

  filteredOpportunities() {
    if (!this.searchTerm.trim()) return this.opportunities;
    return this.opportunities.filter(o =>
      o.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      o.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal(opp: any) {
    this.selectedOpportunity = opp;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  apply() {
    const payload = {
      ...this.application,
      opportunityId: this.selectedOpportunity._id
    };
   this.api.applyForOpportunity(payload)
.subscribe(() => {
      this.showModal = false;
      this.successMessage = `Application submitted for "${this.selectedOpportunity.title}" 🎉`;
      setTimeout(() => (this.successMessage = ''), 3000);
      this.application = { name: '', email: '', reason: '' };
    });
  }
}
