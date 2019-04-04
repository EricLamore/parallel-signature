import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ParallelSignatureSharedModule } from 'app/shared';
import {
    TransactionParallelComponent,
    TransactionParallelDetailComponent,
    TransactionParallelUpdateComponent,
    TransactionParallelDeletePopupComponent,
    TransactionParallelDeleteDialogComponent,
    transactionRoute,
    transactionPopupRoute
} from './';

const ENTITY_STATES = [...transactionRoute, ...transactionPopupRoute];

@NgModule({
    imports: [ParallelSignatureSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransactionParallelComponent,
        TransactionParallelDetailComponent,
        TransactionParallelUpdateComponent,
        TransactionParallelDeleteDialogComponent,
        TransactionParallelDeletePopupComponent
    ],
    entryComponents: [
        TransactionParallelComponent,
        TransactionParallelUpdateComponent,
        TransactionParallelDeleteDialogComponent,
        TransactionParallelDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParallelSignatureTransactionParallelModule {}
