import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject';
import { Career } from 'src/app/models/career';
import { Student } from 'src/app/models/student';
import { CareerService } from 'src/app/services/career.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

import { ScoreService } from 'src/app/services/score.service';
import { Score } from 'src/app/models/score';
import { CustomValidator } from 'src/app/common/custom-validator';

@Component({
  selector: 'app-score-add',
  templateUrl: './score-add.component.html',
  styleUrls: ['./score-add.component.css']
})
export class ScoreAddComponent implements OnInit {

  subjectList: Array<Subject> = new Array<Subject>();
  student: Student;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private subjectService: SubjectService, private scoreService: ScoreService, private router: Router) { }

  scoreForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email],[CustomValidator.emailExists(this.studentService)]),
    subject: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required, CustomValidator.justNumber1To10()])
  });

  get email() { return this.scoreForm.get('email').value }
  get subject() { return this.scoreForm.get('subject').value }
  get value() { return this.scoreForm.get('value').value }

  ngOnInit(): void {
    const studentId:number = Number(this.route.snapshot.paramMap.get("id"));

    console.log("ID "+studentId);
    

    this.subjectService.getAll()
    .subscribe(response=>{
      this.subjectList = response;
    },error=>console.log(error));
   
    this.studentService.getAll().subscribe(response=>{
      for (const student of response) {
        if(student.id == studentId){
          this.student = Student.jsonTOStudent(student,null);

          this.scoreForm.patchValue({
            email: this.student.email
          });
        }
      }
    })
  }

  onSubmit() {  
    let score: Score = new Score();



    this.studentService.getByEmail(this.email).subscribe(response=>{
      score.student = response;
      
      console.log("Subject");
      console.log(score);
      
      this.subjectService.getByName(this.subject).subscribe(response=>{
        score.subject = response;

        score.value = Number(this.value);


      this.scoreService.add(Score.scoreTOjson(score)).subscribe(response=>{
        console.log(response)
        this.router.navigateByUrl('/score/list');
      }, error=>console.log(error));

    },error=>console.log(error));
    
    },error=>console.log(error));



  }

}
