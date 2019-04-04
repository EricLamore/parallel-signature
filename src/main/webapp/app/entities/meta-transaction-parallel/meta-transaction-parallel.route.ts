import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';
import { MetaTransactionParallelService } from './meta-transaction-parallel.service';
import { MetaTransactionParallelComponent } from './meta-transaction-parallel.component';
import { MetaTransactionParallelDetailComponent } from './meta-transaction-parallel-detail.component';
import { MetaTransactionParallelUpdateComponent } from './meta-transaction-parallel-update.component';
import { MetaTransactionParallelDeletePopupComponent } from './meta-transaction-parallel-delete-dialog.component';
import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';

@Injectable({ providedIn: 'root' })
export class MetaTransactionParallelResolve implements Resolve<IMetaTransactionParallel> {
    constructor(private service: MetaTransactionParallelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMetaTransactionParallel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MetaTransactionParallel>) => response.ok),
                map((metaTransaction: HttpResponse<MetaTransactionParallel>) => metaTransaction.body)
            );
        }
        return of(new MetaTransactionParallel());
    }
}

export const metaTransactionRoute: Routes = [
    {
        path: '',
        component: MetaTransactionParallelComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'MetaTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MetaTransactionParallelDetailComponent,
        resolve: {
            metaTransaction: MetaTransactionParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MetaTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MetaTransactionParallelUpdateComponent,
        resolve: {
            metaTransaction: MetaTransactionParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MetaTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MetaTransactionParallelUpdateComponent,
        resolve: {
            metaTransaction: MetaTransactionParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MetaTransactions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const metaTransactionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MetaTransactionParallelDeletePopupComponent,
        resolve: {
            metaTransaction: MetaTransactionParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MetaTransactions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
