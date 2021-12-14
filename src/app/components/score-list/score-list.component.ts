import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/career';
import { Score } from 'src/app/models/score';
import { Student } from 'src/app/models/student';
import { Subject } from 'src/app/models/subject';
import { CareerService } from 'src/app/services/career.service';
import { ScoreService } from 'src/app/services/score.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  scoreList: Array<Score> = new Array<Score>();
  studentList: Array<Student> = new Array<Student>();
  subjectList: Array<Subject> = new Array<Subject>();
  careerList: Array<Career> = new Array<Career>();

  constructor(private scoreService: ScoreService, private studentService: StudentService, private subjectService: SubjectService, private careerService: CareerService) { }

  ngOnInit(): void {
    this.scoreService.getAll().subscribe(scores=>{

      this.studentService.getAll().subscribe(students=>{

      this.careerService.getAll().subscribe(careers=>{
        
        this.careerList = careers;

        for (const student of students) {            
          let studentToAdd = Student.jsonTOStudent(student,this.careerList);
          this.studentList.push(studentToAdd);
        }

        this.subjectService.getAll().subscribe(subjects=>{
          this.subjectList = subjects;

          for (const score of scores) {
            console.log(Score.jsonTOScore(score,this.studentList,this.subjectList));
            
            this.scoreList.push(Score.jsonTOScore(score,this.studentList,this.subjectList));
          }

        },error=>console.log(error));

      },error=>console.log(error));
    
    },error=>console.log(error));


    },error=>console.log(error));
  }

}
