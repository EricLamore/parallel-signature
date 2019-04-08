import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ParallelSignatureSharedModule } from 'app/shared';
import {
    DocumentsParallelComponent,
    DocumentsParallelDetailComponent,
    DocumentsParallelUpdateComponent,
    DocumentsParallelDeletePopupComponent,
    DocumentsParallelDeleteDialogComponent,
    documentsRoute,
    documentsPopupRoute
} from './';

const ENTITY_STATES = [...documentsRoute, ...documentsPopupRoute];

@NgModule({
    imports: [ParallelSignatureSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentsParallelComponent,
        DocumentsParallelDetailComponent,
        DocumentsParallelUpdateComponent,
        DocumentsParallelDeleteDialogComponent,
        DocumentsParallelDeletePopupComponent
    ],
    entryComponents: [
        DocumentsParallelComponent,
        DocumentsParallelUpdateComponent,
        DocumentsParallelDeleteDialogComponent,
        DocumentsParallelDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParallelSignatureDocumentsParallelModule {}
