import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthoComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //this.getHeroes();    
  }

  login(user: string, pass: string): void {
    user = user.trim();
    pass = pass.trim();
    if (!user) { return; }
    if (!pass) { return; }
    this.authService.login(
      {
        "username": user,
        "password": pass
      } as Usuario)
      .subscribe(ok => {        
        this.router.navigate(['/tipo-cambio']);
      });
  }

}
