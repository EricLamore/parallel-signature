import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ParallelSignatureSharedModule } from 'app/shared';
import {
    DocumentParallelComponent,
    DocumentParallelDetailComponent,
    DocumentParallelUpdateComponent,
    DocumentParallelDeletePopupComponent,
    DocumentParallelDeleteDialogComponent,
    documentRoute,
    documentPopupRoute
} from './';

const ENTITY_STATES = [...documentRoute, ...documentPopupRoute];

@NgModule({
    imports: [ParallelSignatureSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentParallelComponent,
        DocumentParallelDetailComponent,
        DocumentParallelUpdateComponent,
        DocumentParallelDeleteDialogComponent,
        DocumentParallelDeletePopupComponent
    ],
    entryComponents: [
        DocumentParallelComponent,
        DocumentParallelUpdateComponent,
        DocumentParallelDeleteDialogComponent,
        DocumentParallelDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParallelSignatureDocumentParallelModule {}
