import { Component} from '@angular/core';
import questionnaireData from 'src/app/questionnaireTemplates/mentalHealthQuest.json'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ResultPassingService } from "src/app/services/result-passing.service";


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent {

  questionnaireName: string;
  questions: any[];
  questionnaireForm: FormGroup

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private resultService: ResultPassingService
    ) {
      
    this.questionnaireName = questionnaireData.name;
    this.questions = questionnaireData.questions;
  
    this.questionnaireForm = this.formBuilder.group({});
    this.questions.forEach((question, index) => {
      this.questionnaireForm.addControl(`question${index}`, this.formBuilder.control('', Validators.required));
    });
  }

  updateAnswer(index: number, optionIndex:number) {
    this.questions[index].answer = optionIndex;
  }
  
  isQuestionInvalid(controlName: string): boolean {
    let control = this.questionnaireForm.get(controlName);
    if (control?.invalid && control?.touched) return true;
    return  false;
  }
    
  submitForm() {
    if (this.questionnaireForm.valid) {
  
      let result = this.calculateResult();
      
      this.resultService.setResult(result)
      this.router.navigate(['/result']);
      
    } else {
      this.markFormControlsAsTouched();
    }
  }

  calculateResult(): number {
    let result = 0;
    console.log(this.questions);
    
    for (let question of this.questions) {
      result += question.answer;
    }
    return result;
  }

  markFormControlsAsTouched() {
    Object.keys(this.questionnaireForm.controls).forEach(controlName => {
      this.questionnaireForm.get(controlName)?.markAsTouched();
    });
  }
}
