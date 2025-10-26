import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ngo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ngo.component.html',
  styleUrls: ['./ngo.component.css']
})
export class NgoComponent {
  newOpportunity = { title: '', description: '', location: '', date: '' };
  opportunities: any[] = [];

  constructor(private api: ApiService) {
    this.loadOpportunities();
  }

  loadOpportunities() {
    this.api.getOpportunities().subscribe((data) => {
      this.opportunities = data;
    });
  }

  onSubmit() {
    this.api.createOpportunity(this.newOpportunity)
.subscribe(() => {
      this.newOpportunity = { title: '', description: '', location: '', date: '' };
      this.loadOpportunities();
    });
  }

  // ✅ this fixes the missing method
  deleteOpportunity(opportunity: any) {
    // If you add delete API later, call it here
    this.opportunities = this.opportunities.filter(o => o !== opportunity);
  }
}
