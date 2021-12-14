import { CareerService } from "../services/career.service";
import { Career } from "./career";

export class Student {
    studentId: number;
    career: Career;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;

    static jsonTOStudent(json: JSON, careerList: Array<Career>) : Student{
        let student : Student = new Student();
        
        student.studentId = json['studentId'];
        student.firstName = json['firstName'];
        student.lastName = json['lastName'];
        student.email = json['email'];

        if(json['careerId']) {
            for (const career of careerList) {
                if(career.careerId == json['careerId']) {
                    student.career = career;
                }
            }
        }
        
        return student;
    }

   /*  static productTOjson(product: Product) : any { 
        var productJSON = { };
        
        Object.assign(productJSON, {name: product.name});
        Object.assign(productJSON, {description: product.description});
        Object.assign(productJSON, {price: product.price});
        Object.assign(productJSON, {productCategoryId: product.productCategory.productCategoryId});
        Object.assign(productJSON, {productId: product.productId});        

        return productJSON;
    } */
}
