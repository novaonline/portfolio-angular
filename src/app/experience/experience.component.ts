import { Component, OnInit } from '@angular/core';
import { PortfolioExperience } from '../shared/portfolio-experience';
import { PortfolioResponse } from '../shared/portfolio-response';
import { PortfolioApiService } from '../shared/services/portfolio-api.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  experience: PortfolioExperience[] = [];

  constructor(private portoflioApi: PortfolioApiService) { }

  ngOnInit(): void {
    this.portoflioApi.getExperience(1).subscribe((data: PortfolioResponse<PortfolioExperience>) => {
      this.experience = data.results
      console.log(this.experience);
    })
  }

}
