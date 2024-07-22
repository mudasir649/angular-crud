import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {

  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: studentModel = new studentModel();
  studentList: studentModel[] = []; 

  ngOnInit(): void {
    this.getStudentList();    
  }

  

  openModal(){
    const stdModal = document.getElementById('myModal');
    if(stdModal != null){
      stdModal.style.display = 'block'
    }
  }

  closeModal(){
    if(this.model != null){
      this.model.nativeElement.style.display = 'none';
    }
  }

  onSaveform(){
    let localData = localStorage.getItem('studentdata');

    if(localData != null){
      const stdData = JSON.parse(localData);
      stdData.push(this.studentObj);
      localStorage.setItem('studentdata', JSON.stringify(stdData));
    }else{
      const newStudent = [];
      newStudent.push(this.studentObj);
      localStorage.setItem('studentdata', JSON.stringify(newStudent));
    }
    this.closeModal();  
    this.getStudentList();
  }

  onEditStudent(studentData: studentModel){
    this.studentObj = studentData;
    this.openModal();
  }

  getStudentList(){
    const localData = localStorage.getItem('studentdata');
    console.log(localData);
    
    if(localData != null){
      this.studentList = JSON.parse(localData)
    }
  }

}


export class studentModel{
  name: string
  mobile: string
  email: string
  gender: string
  doj: string
  address: string
  status: boolean
  constructor(){
    this.gender= "";
    this.email = "";
    this.mobile = "";
    this.name = "";
    this.doj = "";
    this.address = "";
    this.status = false;
  }
}
