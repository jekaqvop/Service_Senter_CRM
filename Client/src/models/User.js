export default class User{
    userName;
    login; 
    email;
    phoneNumber; 
    pwd;    
    constructor(userName, login, email, phoneNumber, pwd){
        this.userName = userName;
        this.login = login;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.pwd = pwd;
    }
}