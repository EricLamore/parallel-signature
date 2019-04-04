import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';

type EntityResponseType = HttpResponse<IMetaTransactionParallel>;
type EntityArrayResponseType = HttpResponse<IMetaTransactionParallel[]>;

@Injectable({ providedIn: 'root' })
export class MetaTransactionParallelService {
    public resourceUrl = SERVER_API_URL + 'api/meta-transactions';

    constructor(protected http: HttpClient) {}

    create(metaTransaction: IMetaTransactionParallel): Observable<EntityResponseType> {
        return this.http.post<IMetaTransactionParallel>(this.resourceUrl, metaTransaction, { observe: 'response' });
    }

    update(metaTransaction: IMetaTransactionParallel): Observable<EntityResponseType> {
        return this.http.put<IMetaTransactionParallel>(this.resourceUrl, metaTransaction, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IMetaTransactionParallel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMetaTransactionParallel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
