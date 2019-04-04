import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ParallelSignatureSharedModule } from 'app/shared';
import {
    MetaTransactionParallelComponent,
    MetaTransactionParallelDetailComponent,
    MetaTransactionParallelUpdateComponent,
    MetaTransactionParallelDeletePopupComponent,
    MetaTransactionParallelDeleteDialogComponent,
    metaTransactionRoute,
    metaTransactionPopupRoute
} from './';

const ENTITY_STATES = [...metaTransactionRoute, ...metaTransactionPopupRoute];

@NgModule({
    imports: [ParallelSignatureSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MetaTransactionParallelComponent,
        MetaTransactionParallelDetailComponent,
        MetaTransactionParallelUpdateComponent,
        MetaTransactionParallelDeleteDialogComponent,
        MetaTransactionParallelDeletePopupComponent
    ],
    entryComponents: [
        MetaTransactionParallelComponent,
        MetaTransactionParallelUpdateComponent,
        MetaTransactionParallelDeleteDialogComponent,
        MetaTransactionParallelDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParallelSignatureMetaTransactionParallelModule {}
