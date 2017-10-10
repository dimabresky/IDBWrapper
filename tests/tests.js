!function (IDBWrapper, QUnit) {

    'use strict';

    var currentTestName = '', store, DB;

    QUnit.module('IDBWrapper тест');

    DB = new IDBWrapper('DBTEST', null, function () {

        this.createStore({
            name: 'test',
            fields: [{
                code: 'name',
                uniq: false
            }, {
                code: 'last_name',
                uniq: false
            }, {
                code: 'email',
                uniq: true
            }]
        });
    });

    DB.connect()
    .then(function () {

        currentTestName = "Создание базы данных DBTEST и создание хранилища test";

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });

        currentTestName = "Переподключение к БД и создание хранилища test2";

            return DB.createNewStore({
                name: 'test2',
                fields: [{
                    code: 'country',
                    uniq: false
                }, {
                    code: 'city',
                    uniq: false
                }]
            });

    })
    .then(function () {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });

        currentTestName = "Добавление записи в хранилище test (метод add)";

        store = DB.store('test');

        return store.add({

            name: 'Jhon',
            last_name: 'Smith',
            email: 'smith@gmail.com'

        });

    }).then(function () {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });

        currentTestName = "Обновление записи в хранилище test (метод update)";

        return store.update(1, {

            name: 'Jacob',
            last_name: 'Smith',
            email: 'smith@gmail.com'

        });

    }).then(function () {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });

        currentTestName = "Получение записи из хранилища test (метод get)";

        return store.get();

    }).then(function (data) {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( data[0].id == 1 && data[0].name === 'Jacob', "выполнен" );
        });

        currentTestName = "Получение записи из хранилища test (метод where id = 1)";

        return store.where('id').equal(1).get();

    }).then(function (data) {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( data[0].id == 1 && data[0].name === 'Jacob', "выполнен" );
        });

        currentTestName = "Получение записи из хранилища test (метод where name = Jacob)";

        return store.where('name').equal('Jacob').get();

    }).then(function (data) {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( data[0].id == 1 && data[0].name === 'Jacob', "выполнен" );
        });

        currentTestName = "Удаление записи из хранилища test (метод delete where id = 1)";

        return store.delete(1);
    }).then(function () {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });

        currentTestName = "Получение списка хранилищ (test и test2)";

        return new Promise(function (resolve, reject) {

            var stores = DB.getStoresList();

            if (stores.indexOf('test') !== -1 && stores.indexOf('test2') !== -1) {

                return resolve(true);
            } else {

                return reject('Упс... Что - то потерялось');
            }

        });

    }).then(function () {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });

        currentTestName = "Удаление хранилища test";

        return DB.deleteStore('test');

    }).then(function () {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });

        currentTestName = "Удаление хранилища test2";

        return DB.deleteStore('test2');
        
    }).then(function () {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен" );
        });

        currentTestName = "Удаление базыданных DBTEST";

        return DB.deleteDatabase("DBTEST");

    }).then(function () {

        QUnit.test( currentTestName, function( assert ) {
            assert.ok( true, "выполнен");
        });

    }).catch(function (message) {
        QUnit.test( currentTestName, function( assert ) {
            assert.notOk( true, "не выполнен (" + message + ")");
        });
    });



}(IDBWrapper, QUnit);
