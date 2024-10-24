export interface User {
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    isActivated: boolean;
  }
  
  export interface SignupForm {
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    password: string;
  }