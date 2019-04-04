import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransactionParallel } from 'app/shared/model/transaction-parallel.model';

type EntityResponseType = HttpResponse<ITransactionParallel>;
type EntityArrayResponseType = HttpResponse<ITransactionParallel[]>;

@Injectable({ providedIn: 'root' })
export class TransactionParallelService {
    public resourceUrl = SERVER_API_URL + 'api/transactions';

    constructor(protected http: HttpClient) {}

    create(transaction: ITransactionParallel): Observable<EntityResponseType> {
        return this.http.post<ITransactionParallel>(this.resourceUrl, transaction, { observe: 'response' });
    }

    update(transaction: ITransactionParallel): Observable<EntityResponseType> {
        return this.http.put<ITransactionParallel>(this.resourceUrl, transaction, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ITransactionParallel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransactionParallel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
