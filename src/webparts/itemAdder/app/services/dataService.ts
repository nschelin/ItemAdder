import * as angular from 'angular';

declare var _spPageContextInfo: any;

export default class DataService {
  constructor(private $q: ng.IQService, private $http: ng.IHttpService) {}

  public setItem(listName: string, title: string): ng.IPromise<{}> {
    const deferred: ng.IDeferred<{}> = this.$q.defer();
    let url = _spPageContextInfo.webAbsoluteUrl + `/_api/web/lists/getByTitle('${listName}')/items`;

    this.$http({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/contextinfo',
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose'
        }
    }).then((digestResult: ng.IHttpPromiseCallbackArg<{ d: any }>): void => {
        const requestDigest: any = digestResult.data.d.GetContextWebInformation.FormDigestValue;
        const body: string = JSON.stringify({
          '__metadata': {
            'type': 'SP.Data.' + listName.charAt(0).toUpperCase() +
            listName.slice(1) + 'ListItem'
          },
          'Title': title
        });
        this.$http({
            url: url,
            method: 'POST',
            headers: {
              'Accept': 'application/json;odata=verbose',
              'Content-Type': 'application/json;odata=verbose',
              'X-RequestDigest': requestDigest
            },
            data: body
        }).then((result: ng.IHttpPromiseCallbackArg<{}>): void => {
          deferred.resolve();
        }, (result: ng.IHttpPromiseCallbackArg<{}>): void => {
          deferred.reject();
        });
    });

    return deferred.promise;
  }
}