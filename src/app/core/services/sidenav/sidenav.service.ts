import { Injectable } from '@angular/core';
import { NavItemDto } from '../../dto/nav-item';
import { NavMenuDto } from '../../dto/nav-menu';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  getNavMenu():NavMenuDto{
    return new NavMenuDto('NavMenu',[
      new NavItemDto('Startups','dashboard' ,'', '/startup'),
      new NavItemDto('Approval','approval','admin','/approval'),
      new NavItemDto('Sectors','dashboard','admin','/sectors'),
    ])
  }

}
