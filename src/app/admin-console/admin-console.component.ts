import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {
  addNewMod: FormGroup;
  removeMod: FormGroup;
  banUser:FormGroup;
  restoreUser:FormGroup;


  constructor(private authService:AuthService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.banUser = new FormGroup({
      bannedName: new FormControl(''),
    })
    this.restoreUser = new FormGroup({
      bannedName: new FormControl(''),
    })
    this.addNewMod = new FormGroup({
      modName: new FormControl(''),
    })
    this.removeMod = new FormGroup({
      modName: new FormControl(''),
    })
  }
  banUserbyName(){
    this.authService.banUser(this.banUser.get('bannedName').value).subscribe(() =>{
      this.toastr.success('User has been banned');
    }, error => {
      this.toastr.error("Error incorrect details");
    })
  }
  restoreUserByName(){
    this.authService.unBanUser(this.restoreUser.get('bannedName').value).subscribe(() =>{
      this.toastr.success('User has been unbanned');
    }, error => {
      this.toastr.error("Error incorrect details");
    })
  }
  addMod(){
    this.authService.addAdmin(this.addNewMod.get('modName').value).subscribe(() =>{
      this.toastr.success('User has been promoted');
    }, error => {
      this.toastr.error("Error incorrect details");
    })
  }
  removeModerator(){
    this.authService.removeAdmin(this.removeMod.get('modName').value).subscribe(() =>{
      this.toastr.success('User has been demoted');
    }, error => {
      this.toastr.error("Error incorrect details");
    })
  }
  }
  


