import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocumentParallel } from 'app/shared/model/document-parallel.model';
import { DocumentParallelService } from './document-parallel.service';
import { DocumentParallelComponent } from './document-parallel.component';
import { DocumentParallelDetailComponent } from './document-parallel-detail.component';
import { DocumentParallelUpdateComponent } from './document-parallel-update.component';
import { DocumentParallelDeletePopupComponent } from './document-parallel-delete-dialog.component';
import { IDocumentParallel } from 'app/shared/model/document-parallel.model';

@Injectable({ providedIn: 'root' })
export class DocumentParallelResolve implements Resolve<IDocumentParallel> {
    constructor(private service: DocumentParallelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocumentParallel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DocumentParallel>) => response.ok),
                map((document: HttpResponse<DocumentParallel>) => document.body)
            );
        }
        return of(new DocumentParallel());
    }
}

export const documentRoute: Routes = [
    {
        path: '',
        component: DocumentParallelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DocumentParallelDetailComponent,
        resolve: {
            document: DocumentParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DocumentParallelUpdateComponent,
        resolve: {
            document: DocumentParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DocumentParallelUpdateComponent,
        resolve: {
            document: DocumentParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DocumentParallelDeletePopupComponent,
        resolve: {
            document: DocumentParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
