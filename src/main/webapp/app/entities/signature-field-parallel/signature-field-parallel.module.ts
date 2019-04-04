import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ParallelSignatureSharedModule } from 'app/shared';
import {
    SignatureFieldParallelComponent,
    SignatureFieldParallelDetailComponent,
    SignatureFieldParallelUpdateComponent,
    SignatureFieldParallelDeletePopupComponent,
    SignatureFieldParallelDeleteDialogComponent,
    signatureFieldRoute,
    signatureFieldPopupRoute
} from './';

const ENTITY_STATES = [...signatureFieldRoute, ...signatureFieldPopupRoute];

@NgModule({
    imports: [ParallelSignatureSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SignatureFieldParallelComponent,
        SignatureFieldParallelDetailComponent,
        SignatureFieldParallelUpdateComponent,
        SignatureFieldParallelDeleteDialogComponent,
        SignatureFieldParallelDeletePopupComponent
    ],
    entryComponents: [
        SignatureFieldParallelComponent,
        SignatureFieldParallelUpdateComponent,
        SignatureFieldParallelDeleteDialogComponent,
        SignatureFieldParallelDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParallelSignatureSignatureFieldParallelModule {}
