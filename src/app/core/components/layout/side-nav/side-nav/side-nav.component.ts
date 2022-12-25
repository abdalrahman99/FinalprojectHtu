import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import{BreakpointObserver, BreakpointState} from '@angular/cdk/layout'
import { delay } from 'rxjs';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { NavMenuDto } from 'src/app/core/dto/nav-menu';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit , AfterViewInit{

  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  navMenu:NavMenuDto;
  userData:any;

  loading=true;
  constructor(
    private breakpoint:BreakpointObserver,
    private _sideNav:SidenavService,
    private _authService:AuthService
    ){
      this.navMenu =this._sideNav.getNavMenu()

    }

  ngAfterViewInit(): void {
   this.breakpoint.observe(['max-width:750px'])
   .pipe(delay(1))
   .subscribe((value:BreakpointState)=>{
    if(value.matches){
      this.sidenav.mode='over';
      this.sidenav.close();
    }else{
      this.sidenav.mode='side';
      this.sidenav.open();
    }
   })
  }

  ngOnInit(): void
  {
     this.getuserInf();
  }
getuserInf(){
  this._authService.userInf.subscribe((user)=>{
    this.userData = user;
    console.log(this.userData );
    if(this.userData.role){
      this.loading=false;
    }

  })
}

  onLoggedoutClicked(){
    this._authService.logout();
  }
}
