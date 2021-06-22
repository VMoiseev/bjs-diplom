"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = data => {
  ApiConnector.login(data, responseBody => responseBody.success ? location.reload() : userForm.setLoginErrorMessage);
}

userForm.registerFormCallback = data => {
  ApiConnector.register(data, responseBody => responseBody.success ? location.reload() : userForm.setRegisterErrorMessage);
}
