"use strict"

//Выход из личного кабинета

const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(responseBody => responseBody.success ? location.reload() : logoutButton.setLogoutErrorMessage);
}

//Получение информации о пользователе

ApiConnector.current(responseBody => {
  if (responseBody.success) {
    ProfileWidget.showProfile(responseBody.data);
  }
});

//Получение текущих курсов валюты

const ratesBoard = new RatesBoard();

function exchangeRates(responseBody) {
  if (responseBody.success){
    ratesBoard.clearTable();
    ratesBoard.fillTable();
  }
}
exchangeRates();
setInterval(() => exchangeRates(), 60000);

//Операции с деньгами

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, responseBody => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      moneyManager.setMessage(true, "Ваши средства успешно добавлены");
    } else {
      moneyManager.setMessage(false, responseBody.error);
    }
  });
}

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, responseBody => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      moneyManager.setMessage(true, "Ваши средства успешно конвертированы");
    } else {
      moneyManager.setMessage(false, responseBody.error);
    }
  });
}

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, responseBody => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      moneyManager.setMessage(true, "Ваши средства успешно переведены");
    } else {
      moneyManager.setMessage(false, responseBody.error);
    }
  });
}

//Работа с избранным

const favoritesWidget = new FavoritesWidget;

ApiConnector.getFavorites(responseBody => {
  if (responseBody.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable();
    moneyManager.updateUsersList();
  }
});

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, responseBody => {
    if (responseBody.success) {
      addUserCallback.clearTable();
      addUserCallback.fillTable();
      moneyManager.updateUsersList();
      favoritesWidget.setMessage(true, "Вы успешно добавлены в список избранных");
    } else {
      favoritesWidget.setMessage(false, responseBody.error);
    }
  });
}

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, responseBody => {
    if (responseBody.success) {
      addUserCallback.clearTable();
      addUserCallback.fillTable();
      moneyManager.updateUsersList();
      favoritesWidget.setMessage(true, "Пользователь удалён из списка избранного");
    } else {
      favoritesWidget.setMessage(false, responseBody.error);
    }
  });
}