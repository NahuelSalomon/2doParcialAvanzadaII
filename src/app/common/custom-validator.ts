import { AbstractControl, AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { StudentService } from "../services/student.service";

export class CustomValidator {

    
    static justNumber1To10(): ValidatorFn {

        return(control: AbstractControl): {[key:string]: any} | null => {
            let justNumber1To10 = false;

            if(control.value > 0 && control.value < 11) {
                    justNumber1To10 = true;
            }
            

            return !justNumber1To10 ? { 'lettersOnly': {value: control.value}} : null;
        };

    }

    static emailExists(studentService: StudentService) : AsyncValidatorFn {
        return (control : AbstractControl) : Promise<{[key:string]: any} | null> => {
            if(control.value == '') {
                return null!;
            } else {
                return studentService.getByEmail(control.value).toPromise()
                    .then(response => {
                        return !response ? { 'emailExists': { value: control.value}} : null;
                    })
            }

        }
    }

}


