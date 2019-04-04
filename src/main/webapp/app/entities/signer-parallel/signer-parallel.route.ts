import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SignerParallel } from 'app/shared/model/signer-parallel.model';
import { SignerParallelService } from './signer-parallel.service';
import { SignerParallelComponent } from './signer-parallel.component';
import { SignerParallelDetailComponent } from './signer-parallel-detail.component';
import { SignerParallelUpdateComponent } from './signer-parallel-update.component';
import { SignerParallelDeletePopupComponent } from './signer-parallel-delete-dialog.component';
import { ISignerParallel } from 'app/shared/model/signer-parallel.model';

@Injectable({ providedIn: 'root' })
export class SignerParallelResolve implements Resolve<ISignerParallel> {
    constructor(private service: SignerParallelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISignerParallel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SignerParallel>) => response.ok),
                map((signer: HttpResponse<SignerParallel>) => signer.body)
            );
        }
        return of(new SignerParallel());
    }
}

export const signerRoute: Routes = [
    {
        path: '',
        component: SignerParallelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Signers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SignerParallelDetailComponent,
        resolve: {
            signer: SignerParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Signers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SignerParallelUpdateComponent,
        resolve: {
            signer: SignerParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Signers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SignerParallelUpdateComponent,
        resolve: {
            signer: SignerParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Signers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const signerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SignerParallelDeletePopupComponent,
        resolve: {
            signer: SignerParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Signers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
