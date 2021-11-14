import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  public generatedCode: string;
  public maxCodeLength: number = 6;
  public score: number = 0;
  public userName: string = '';
  public resultsMessage: string = '';

  public cypressForm: FormGroup;
  public questionaryForm: FormGroup;

  constructor(private _http: HttpClient) { 
    this.generatedCode = this._generateVerificationCode();
    
    this.cypressForm =  new FormGroup({
      userName: new FormControl('', Validators.required),
      verificationCode: new FormControl('', [Validators.maxLength(6), this.validateVerificationCode(this.generatedCode)]),
    });

    this.questionaryForm =  new FormGroup({
      question1: new FormControl('', Validators.required),
      question2: new FormControl('', Validators.required),
      question3: new FormControl('', Validators.required),
      question4: new FormControl('', Validators.required),
      question5: new FormControl('', Validators.required),
      question6: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  private _generateVerificationCode() : string {
    const generatedNum = Math.floor(Math.random() * 999999);

    return this._fixCode(generatedNum);
  }

  private _fixCode(code:number) : string {
    let convertedCode = code.toString();
    const sizeDifference = this.maxCodeLength - convertedCode.length;
    
    if(sizeDifference > 0) {
      const codeArray = convertedCode.split('');
      for(let i = 0; i < sizeDifference; i++){
        codeArray.unshift('0');
      }
      convertedCode = codeArray.join('');      
    }
    
    return convertedCode;
  }

  private _getScore() {
    let correctAnswers = 0;
    let totalQuestions = 0;
    this._http.get('/assets/data.json').subscribe((response: any) => {
      for(let question in this.questionaryForm.controls) {
        this.questionaryForm.controls[question].value === response[question] ? correctAnswers++ : null;
        totalQuestions++;
      }
      this.score = Math.floor((correctAnswers/totalQuestions) * 100);
      this._getResultsMessage();
      this.questionaryForm.reset();
    });
  }

  private _getResultsMessage() {
    this.resultsMessage = this.score <= 50 ? 'We recommend you to take again the class and practice a little more.' : 'Good job! You have answer correctly all the answers.'
  }

  public validateVerificationCode(code: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value == code ? null : {validateCode: {value: true}};
    }
  }

  public openQuiz() {
   this.userName = this.cypressForm.controls['userName'].value;
  }

  public getResults(): void {
    this._getScore();
  }

  
}
