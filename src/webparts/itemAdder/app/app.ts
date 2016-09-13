import * as angular from 'angular';
import DataService from './services/dataService';
import ItemAdderController from './controllers/ItemAdderController';

const app: ng.IModule = angular.module('itemAdderApp', []);

app.service('dataService', DataService);
app.controller('ItemAdderController', ItemAdderController);
