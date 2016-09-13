import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './ItemAdder.module.scss';
import * as strings from 'itemAdderStrings';
import { IItemAdderWebPartProps } from './IItemAdderWebPartProps';
import * as angular from 'angular';
import './app/app';

export default class ItemAdderWebPart extends BaseClientSideWebPart<IItemAdderWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  private injector: ng.auto.IInjectorService;

  public render(): void {

    if(this.renderedOnce === false) {
      this.domElement.innerHTML = `
          <div ng-controller="ItemAdderController as itemAddr">
            <label for="itemTitle">Title:</label><input id="itemTitle" type="text" ng-model="item.title" />
            <button type="button" ng-click="itemAddr.AddItem(item)">Add Something...</button>
            <div ng-repeat="item in itemAddr.items">
              {{ item.title }}
            </div>
          </div>
        `;

      this.injector = angular.bootstrap(this.domElement, ['itemAdderApp']);
    }

    this.injector.get('$rootScope').$broadcast('configurationChanged', {
        listName: this.properties.listName
      });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
