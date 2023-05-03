'use strict'
const logout = new LogoutButton();
logout.action = () => {
    ApiConnector.logout((response) => {
        if(response.success)
        location.reload();
    })
}

ApiConnector.current(cur => {
    if(cur.success) {
        ProfileWidget.showProfile(cur.data);
    }
})


const ratesBoard = new RatesBoard;
ratesBoard.obtainsBoard = () => {
    ApiConnector.getStocks(cur => {
        if(cur.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(cur.data);
        }
    })
}
ratesBoard.obtainsBoard();
setInterval(ratesBoard.obtainsBoard(), 60000)

const moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс пополнен");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация произведена");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод произведен");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data)
        moneyManager.updateUsersList(response.data)
    }
}) 

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь добавлен")
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удалён")
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}



















