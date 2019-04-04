import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentParallel } from 'app/shared/model/document-parallel.model';

type EntityResponseType = HttpResponse<IDocumentParallel>;
type EntityArrayResponseType = HttpResponse<IDocumentParallel[]>;

@Injectable({ providedIn: 'root' })
export class DocumentParallelService {
    public resourceUrl = SERVER_API_URL + 'api/documents';

    constructor(protected http: HttpClient) {}

    create(document: IDocumentParallel): Observable<EntityResponseType> {
        return this.http.post<IDocumentParallel>(this.resourceUrl, document, { observe: 'response' });
    }

    update(document: IDocumentParallel): Observable<EntityResponseType> {
        return this.http.put<IDocumentParallel>(this.resourceUrl, document, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IDocumentParallel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentParallel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
