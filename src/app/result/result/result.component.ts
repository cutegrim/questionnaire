import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ResultPassingService } from "src/app/services/result-passing.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  result: number = 0;
 
  riskLevels = [
    { minScore: 0, maxScore: 4, level: 'Very high risk or severe mental health concerns' },
    { minScore: 5, maxScore: 8, level: 'High risk or significant mental health concerns' },
    { minScore: 9, maxScore: 12, level: 'Moderate risk or mild mental health concerns' },
    { minScore: 13, maxScore: 16, level: 'Low risk or healthy mental condition' }
  ];

  constructor( 
    private resultService: ResultPassingService,
    private router: Router
    ) { }

  ngOnInit() {
    
   this.result = this.resultService.result;
   
  }

  calculateRiskLevel(score: number): string {
    for (const level of this.riskLevels) {
      if (score >= level.minScore && score <= level.maxScore) {
        return level.level;
      }
    }
    return "Error"
  }
  goToQuestionnaire() {
    this.router.navigate(['']);
  }

}
