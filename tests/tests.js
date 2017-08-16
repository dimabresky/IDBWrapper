!function (IDBWrapper, QUnit) {

    'use strict';

    QUnit.module('IDBWrapper тест');

    var DB = new IDBWrapper('DBTEST', null, function () {

        this.createStore({
            name: 'test',
            fields: [{
                name: 'name',
                uniq: false
            }, {
                name: 'last_name',
                uniq: false
            }, {
                name: 'email',
                uniq: true
            }]
        });
    });

    DB.connect().then(function () {

        QUnit.test( "Создание базы данных DBTEST и создание хранилища test", function( assert ) {
            assert.ok( true, "выполнен" );
        });

        DB.reconnect(function () {

            this.createStore({
                name: 'test2',
                fields: [{
                    name: 'country',
                    uniq: false
                }, {
                    name: 'city',
                    uniq: false
                }]
            });

        }).then(function () {

            QUnit.test( "Переподключение к БД и создание хранилища test2", function( assert ) {
                assert.ok( true, "выполнен" );
            });

            var store = DB.store('test');

            store.add({

                name: 'Jhon',
                last_name: 'Smith',
                email: 'smith@gmail.com'

            }).then(function () {

                QUnit.test( "Добавление записи в хранилище test (метод add)", function( assert ) {
                    assert.ok( true, "выполнен" );
                });

                store.update(1, {

                    name: 'Jacob',
                    last_name: 'Smith',
                    email: 'smith@gmail.com'

                }).then(function () {

                    QUnit.test( "Обновление записи в хранилище test (метод update)", function( assert ) {
                        assert.ok( true, "выполнен" );
                    });

                    store.get().then(function (data) {

                        QUnit.test( "Получение записи из хранилища test (метод get)", function( assert ) {
                            assert.ok( data[0].id == 1 && data[0].name === 'Jacob', "выполнен" );
                        });

                        store.where('id').equal(1).get().then(function (data) {

                            QUnit.test( "Получение записи из хранилища test (метод where id = 1)", function( assert ) {
                                assert.ok( data[0].id == 1 && data[0].name === 'Jacob', "выполнен" );
                            });

                            store.where('name').equal('Jacob').get().then(function (data) {

                                QUnit.test( "Получение записи из хранилища test (метод where name = Jacob)", function( assert ) {
                                    assert.ok( data[0].id == 1 && data[0].name === 'Jacob', "выполнен" );
                                });

                                store.delete(1).then(function () {

                                    QUnit.test( "Удаление записи из хранилища test (метод delete where id = 1)", function( assert ) {
                                        assert.ok( true, "выполнен" );
                                    });

                                    DB.reconnect(function () {

                                        DB.deleteStore('test');
                                        DB.deleteStore('test2');

                                        QUnit.test( "Удаление хранилищ test и test2", function( assert ) {
                                            assert.ok( true, "выполнен" );
                                        });

                                    }).then(function () {

                                        DB.deleteDatabase("DBTEST").then(function () {

                                            QUnit.test( "Удаление базыданных DBTEST", function( assert ) {
                                                assert.ok( true, "выполнен");
                                            });

                                        }).catch(function () {
                                            QUnit.test( "Удаление базыданных DBTEST", function( assert ) {
                                                assert.notOk( true, "не выполнен (" + message + ")");
                                            });
                                        });

                                    }).catch(function (message) {

                                        QUnit.test( "Удаление хранилищ test и test2", function( assert ) {
                                            assert.notOk( true, "не выполнен (" + message + ")");
                                        });
                                    });

                                }).catch(function (message) {

                                    QUnit.test( "Удаление записи из хранилища test (метод delete where id = 1)", function( assert ) {
                                        assert.notOk( true, "не выполнен (" + message + ")");
                                    });
                                });

                            }).catch(function (message) {

                                QUnit.test( "Получение записи из хранилища test (метод where name = Jacob)", function( assert ) {
                                    assert.notOk( true, "не выполнен (" + message + ")");
                                });
                            });

                        }).catch(function (message) {

                            QUnit.test( "Получение записи из хранилища test (метод where id = 1)", function( assert ) {
                                assert.notOk( true, "не выполнен (" + message + ")");
                            });
                        });

                    }).catch(function (message) {

                        QUnit.test( "Получение записи из хранилища test (метод get)", function( assert ) {
                            assert.notOk( true, "не выполнен (" + message + ")");
                        });
                    });

                }).catch(function (message) {

                    QUnit.test( "Обновление записи в хранилище test (метод update)", function( assert ) {
                        assert.notOk( true, "не выполнен (" + message + ")");
                    });
                });

            }).catch(function (message) {

                QUnit.test( "Добавление записи в хранилище test (метод add)", function( assert ) {
                    assert.notOk( true, "не выполнен (" + message + ")" );
                });
            });

        }).catch(function (message) {

            QUnit.test( "Переподключение к БД и создание хранилища test2", function( assert ) {
                assert.notOk( true, "не выполнен (" + message + ")" );
            });
        });

    }).catch(function (message) {

        QUnit.test( "Создание базы данных DBTEST и создание хранилища test", function( assert ) {
            assert.notOk( true, "не выполнен (" + message + ")" );
        });
    });

}(IDBWrapper, QUnit);
