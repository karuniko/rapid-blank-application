import {webServiceEndpoint} from '../constants'
import {PaginationPage, PaginationPropertySort} from '../common/pagination';
import * as Rx from "rxjs/Rx";

export class PersonService {

    castToPromise($promise:JQueryPromise<any>):Promise<any> {
        return new Promise(function (resolve, reject) {
            $promise.then(resolve, reject);
        });
    }

    findPersons(page:number, pageSize:number, sort:PaginationPropertySort):Rx.Observable<any> {
        let params:any = {size: pageSize, page: page};
        if (sort != null) {
            params.sort = sort.property + "," + sort.direction;
        }
        return <Rx.Observable<PaginationPage<any>>> Rx.Observable.fromPromise(this.castToPromise(
                $.ajax({dataType: "json", url: webServiceEndpoint + '/person', data: params}))
        ).publish().refCount();
    }

    getPerson(id:number):Rx.Observable<any> {
        return <Rx.Observable<any>> Rx.Observable.fromPromise(this.castToPromise(
                $.ajax({dataType: "json", url: webServiceEndpoint + `/person/${id}`}))
        ).publish().refCount();
    }

    deletePerson(id:number):Rx.Observable<any> {
        return <Rx.Observable<any>> Rx.Observable.fromPromise(this.castToPromise(
                $.ajax({method: "DELETE", url: webServiceEndpoint + `/person/${id}`}))
        ).publish().refCount();
    }
}