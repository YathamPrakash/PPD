import { CanActivateFn, CanDeactivateFn, CanMatchFn } from '@angular/router';

// 🔐 CanActivate → protect route
export const canActivateGuard: CanActivateFn = (route, state) => {

  console.log(route,'CanActivate triggered');
  console.log(state,'CanActivate triggered');
  return true;
};


// 🔐 CanMatch → protect lazy module
export const canMatchGuard: CanMatchFn = (route, segments) => {
  console.log('CanMatch triggered');
  return true;
};


// 🔐 CanDeactivate → prevent leaving component
export const canDeactivateGuard: CanDeactivateFn<any> = (component) => {
  console.log('CanDeactivate triggered');
  return confirm('Do you really want to leave this page?');
};