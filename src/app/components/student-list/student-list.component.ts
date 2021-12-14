import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Career } from 'src/app/models/career';
import { Student } from 'src/app/models/student';
import { CareerService } from 'src/app/services/career.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  
  studentList: Array<Student> = new Array<Student>();
  careerList: Array<Career>;

  constructor(private studentService: StudentService, private careerService: CareerService, private route: Router) { }

  ngOnInit(): void {
    this.studentService.getAll().subscribe(
      students=>{
        
      
        this.careerService.getAll().subscribe(careers=>{
          this.careerList = careers;

          for (const student of students) {            
            let studentToAdd = Student.jsonTOStudent(student,this.careerList);

            if(studentToAdd.career != null) {
              if(studentToAdd.career.isActive && studentToAdd.isActive) {
                this.studentList.push(studentToAdd);
              }
            }
          }

        },error=>console.log(error));

      }
      ,error=>console.log(error)
    );
  }

  onClick(idStudent: number){
    this.route.navigateByUrl(`/score/add/${idStudent}`);
  }

}
