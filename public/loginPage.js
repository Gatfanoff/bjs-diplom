'use strict'
const login = new UserForm;
login.loginFormCallback = data => {
    ApiConnector.login(data, (response) => {
        if(response.success) {
            console.log("все верно");
            location.reload();
            
        } else {
            console.log("ошибка, не правильно введены данные");
            login.setLoginErrorMessage(response.error)
            
        }
    });
}

login.registerFormCallback = data => {
    ApiConnector.register(data, (response) => {
        if(response.success) {
            location.reload();
            alert("регистрация прошла успешно")
        } else {
            login.setRegisterErrorMessage(response.error)
            alert("ошибка");
        }
    });
}