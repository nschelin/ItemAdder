import * as angular from 'angular';
import DataService from '../services/dataService';

export default class ItemAdderController {
  items: Array<Item>;
  listName: string
  constructor(private $scope: ng.IScope,
              private $rootScope: ng.IRootScopeService,
              private dataService: DataService) {
    this.items = new Array<Item>();
    $rootScope.$on('configurationChanged',
      (event: ng.IAngularEvent,
       args: {
         listName: string;
       }) : void => {
          this.listName = args.listName;
       });
  }

  AddItem(input: any): void {
    let item = new Item();
    item.title = input.title;
    this.items.push(item);
    this.dataService.setItem(this.listName, item.title);

    input.title = '';
  }
}

export class Item {
  public title: string;
}