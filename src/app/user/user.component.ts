import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  formgroup:any;
  id:any;
  posting = false;

  constructor(private api:ApiService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      name : new FormControl("",Validators.required),
      age : new FormControl(""),
      education : new FormControl("",Validators.required),
      email : new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])),
      number : new FormControl("",Validators.compose([Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]))
    })

    this.id = this.route.snapshot.params['id'];

    if(this.id != undefined){
      this.api.get("https://63c8db7a320a0c4c953be2f4.mockapi.io/api/v1/usersCrud/" + this.id).subscribe((result:any)=>{
        this.formgroup = new FormGroup({
          name : new FormControl(result.name,Validators.required),
          age : new FormControl(result.age),
          education : new FormControl(result.education,Validators.required),
          email : new FormControl(result.email,Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])),
          number : new FormControl(result.number,Validators.compose([Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]))
        })
      })
    }
  }


  submit(data:any){
    // console.log(data);
    this.posting = true;

    if(this.id == undefined){
        this.api.post("https://63c8db7a320a0c4c953be2f4.mockapi.io/api/v1/usersCrud",data).subscribe((result:any)=>{
        this.router.navigate(['']);
      })
    }
    else{
        this.api.put("https://63c8db7a320a0c4c953be2f4.mockapi.io/api/v1/usersCrud/" + this.id,data).subscribe((result:any)=>{
        this.router.navigate(['']);
      })
    }

  }
}
