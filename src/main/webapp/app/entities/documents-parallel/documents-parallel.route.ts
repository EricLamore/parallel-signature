import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocumentsParallel } from 'app/shared/model/documents-parallel.model';
import { DocumentsParallelService } from './documents-parallel.service';
import { DocumentsParallelComponent } from './documents-parallel.component';
import { DocumentsParallelDetailComponent } from './documents-parallel-detail.component';
import { DocumentsParallelUpdateComponent } from './documents-parallel-update.component';
import { DocumentsParallelDeletePopupComponent } from './documents-parallel-delete-dialog.component';
import { IDocumentsParallel } from 'app/shared/model/documents-parallel.model';

@Injectable({ providedIn: 'root' })
export class DocumentsParallelResolve implements Resolve<IDocumentsParallel> {
    constructor(private service: DocumentsParallelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocumentsParallel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DocumentsParallel>) => response.ok),
                map((documents: HttpResponse<DocumentsParallel>) => documents.body)
            );
        }
        return of(new DocumentsParallel());
    }
}

export const documentsRoute: Routes = [
    {
        path: '',
        component: DocumentsParallelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DocumentsParallelDetailComponent,
        resolve: {
            documents: DocumentsParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DocumentsParallelUpdateComponent,
        resolve: {
            documents: DocumentsParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DocumentsParallelUpdateComponent,
        resolve: {
            documents: DocumentsParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DocumentsParallelDeletePopupComponent,
        resolve: {
            documents: DocumentsParallelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
