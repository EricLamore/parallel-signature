import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISignerParallel } from 'app/shared/model/signer-parallel.model';

type EntityResponseType = HttpResponse<ISignerParallel>;
type EntityArrayResponseType = HttpResponse<ISignerParallel[]>;

@Injectable({ providedIn: 'root' })
export class SignerParallelService {
    public resourceUrl = SERVER_API_URL + 'api/signers';

    constructor(protected http: HttpClient) {}

    create(signer: ISignerParallel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(signer);
        return this.http
            .post<ISignerParallel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(signer: ISignerParallel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(signer);
        return this.http
            .put<ISignerParallel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ISignerParallel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISignerParallel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(signer: ISignerParallel): ISignerParallel {
        const copy: ISignerParallel = Object.assign({}, signer, {
            birthDate: signer.birthDate != null && signer.birthDate.isValid() ? signer.birthDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.birthDate = res.body.birthDate != null ? moment(res.body.birthDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((signer: ISignerParallel) => {
                signer.birthDate = signer.birthDate != null ? moment(signer.birthDate) : null;
            });
        }
        return res;
    }
}
