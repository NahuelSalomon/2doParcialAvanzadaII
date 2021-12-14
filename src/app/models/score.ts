import { Subject } from "./subject";
import { Student } from "./student";

export class Score {
    student: Student;
    subject: Subject;
    value: number;

    static jsonTOScore(json: JSON, studentList: Array<Student>, subjectList: Array<Subject>) : Score{
        let score : Score = new Score();

        for (const student of studentList) {
            if(student.studentId == json['studentId']) {
                score.student = student;
            }
        }

        for (const subject of subjectList) {
            if(subject.subjectId == json['subjectId']) {
                score.subject = subject;
            }
        }

        score.value = json['value'];
        
        return score;
    }

    static scoreTOjson(score: Score) : any { 
        var scoreJSOON = { };
    

        Object.assign(scoreJSOON, {studentId: score.student.studentId});
        Object.assign(scoreJSOON, {subjectId: score.subject.subjectId});
        Object.assign(scoreJSOON, {value: score.value});

        return scoreJSOON;
    } 

}
