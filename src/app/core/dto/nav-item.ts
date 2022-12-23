export class NavItemDto{
  displayName:string;
  icon:string;
  route:string;
  roll:string;
  children!:NavItemDto[];

  constructor(
    displayName:string,
      icon:string,
      roll:string,
      route:string,children?:NavItemDto[]){
 this.displayName =displayName;
 this.icon =icon;
 this.route =route;
 this.roll=roll;
 this.children= children? children:[];


  }
}
