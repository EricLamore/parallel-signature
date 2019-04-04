import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ParallelSignatureSharedModule } from 'app/shared';
import {
    SignerParallelComponent,
    SignerParallelDetailComponent,
    SignerParallelUpdateComponent,
    SignerParallelDeletePopupComponent,
    SignerParallelDeleteDialogComponent,
    signerRoute,
    signerPopupRoute
} from './';

const ENTITY_STATES = [...signerRoute, ...signerPopupRoute];

@NgModule({
    imports: [ParallelSignatureSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SignerParallelComponent,
        SignerParallelDetailComponent,
        SignerParallelUpdateComponent,
        SignerParallelDeleteDialogComponent,
        SignerParallelDeletePopupComponent
    ],
    entryComponents: [
        SignerParallelComponent,
        SignerParallelUpdateComponent,
        SignerParallelDeleteDialogComponent,
        SignerParallelDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParallelSignatureSignerParallelModule {}
