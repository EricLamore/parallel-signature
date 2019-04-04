import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TransactionParallel } from 'app/shared/model/transaction-parallel.model';
import { TransactionParallelService } from './transaction-parallel.service';
import { TransactionParallelComponent } from './transaction-parallel.component';
import { TransactionParallelDetailComponent } from './transaction-parallel-detail.component';
import { TransactionParallelUpdateComponent } from './transaction-parallel-update.component';
import { TransactionParallelDeletePopupComponent } from './transaction-parallel-delete-dialog.component';
import { ITransactionParallel } from 'app/shared/model/transaction-parallel.model';

@Injectable({ providedIn: 'root' })
export class TransactionParallelResolve implements Resolve<ITransactionParallel> {
    constructor(private service: TransactionParallelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransactionParallel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TransactionParallel>) => response.ok),
                map((transaction: HttpResponse<TransactionParallel>) => transaction.body)
            );
        }
        return of(new TransactionParallel());
    }
}

export const transactionRoute: Routes = [
    {
        path: '',
        component: TransactionParallelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TransactionParallelDetailComponent,
        resolve: {
            transaction: TransactionParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TransactionParallelUpdateComponent,
        resolve: {
            transaction: TransactionParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TransactionParallelUpdateComponent,
        resolve: {
            transaction: TransactionParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TransactionParallelDeletePopupComponent,
        resolve: {
            transaction: TransactionParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Transactions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
