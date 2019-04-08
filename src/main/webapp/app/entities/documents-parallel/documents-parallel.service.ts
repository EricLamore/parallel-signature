import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentsParallel } from 'app/shared/model/documents-parallel.model';

type EntityResponseType = HttpResponse<IDocumentsParallel>;
type EntityArrayResponseType = HttpResponse<IDocumentsParallel[]>;

@Injectable({ providedIn: 'root' })
export class DocumentsParallelService {
    public resourceUrl = SERVER_API_URL + 'api/documents';

    constructor(protected http: HttpClient) {}

    create(documents: IDocumentsParallel): Observable<EntityResponseType> {
        return this.http.post<IDocumentsParallel>(this.resourceUrl, documents, { observe: 'response' });
    }

    update(documents: IDocumentsParallel): Observable<EntityResponseType> {
        return this.http.put<IDocumentsParallel>(this.resourceUrl, documents, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IDocumentsParallel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentsParallel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
