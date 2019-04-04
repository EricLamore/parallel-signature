import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';
import { SignatureFieldParallelService } from './signature-field-parallel.service';
import { SignatureFieldParallelComponent } from './signature-field-parallel.component';
import { SignatureFieldParallelDetailComponent } from './signature-field-parallel-detail.component';
import { SignatureFieldParallelUpdateComponent } from './signature-field-parallel-update.component';
import { SignatureFieldParallelDeletePopupComponent } from './signature-field-parallel-delete-dialog.component';
import { ISignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';

@Injectable({ providedIn: 'root' })
export class SignatureFieldParallelResolve implements Resolve<ISignatureFieldParallel> {
    constructor(private service: SignatureFieldParallelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISignatureFieldParallel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SignatureFieldParallel>) => response.ok),
                map((signatureField: HttpResponse<SignatureFieldParallel>) => signatureField.body)
            );
        }
        return of(new SignatureFieldParallel());
    }
}

export const signatureFieldRoute: Routes = [
    {
        path: '',
        component: SignatureFieldParallelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SignatureFields'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SignatureFieldParallelDetailComponent,
        resolve: {
            signatureField: SignatureFieldParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SignatureFields'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SignatureFieldParallelUpdateComponent,
        resolve: {
            signatureField: SignatureFieldParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SignatureFields'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SignatureFieldParallelUpdateComponent,
        resolve: {
            signatureField: SignatureFieldParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SignatureFields'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const signatureFieldPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SignatureFieldParallelDeletePopupComponent,
        resolve: {
            signatureField: SignatureFieldParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SignatureFields'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
