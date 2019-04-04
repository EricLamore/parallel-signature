import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';

type EntityResponseType = HttpResponse<ISignatureFieldParallel>;
type EntityArrayResponseType = HttpResponse<ISignatureFieldParallel[]>;

@Injectable({ providedIn: 'root' })
export class SignatureFieldParallelService {
    public resourceUrl = SERVER_API_URL + 'api/signature-fields';

    constructor(protected http: HttpClient) {}

    create(signatureField: ISignatureFieldParallel): Observable<EntityResponseType> {
        return this.http.post<ISignatureFieldParallel>(this.resourceUrl, signatureField, { observe: 'response' });
    }

    update(signatureField: ISignatureFieldParallel): Observable<EntityResponseType> {
        return this.http.put<ISignatureFieldParallel>(this.resourceUrl, signatureField, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ISignatureFieldParallel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISignatureFieldParallel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
