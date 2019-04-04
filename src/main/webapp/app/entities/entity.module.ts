import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'meta-transaction-parallel',
                loadChildren: './meta-transaction-parallel/meta-transaction-parallel.module#ParallelSignatureMetaTransactionParallelModule'
            },
            {
                path: 'document-parallel',
                loadChildren: './document-parallel/document-parallel.module#ParallelSignatureDocumentParallelModule'
            },
            {
                path: 'signature-field-parallel',
                loadChildren: './signature-field-parallel/signature-field-parallel.module#ParallelSignatureSignatureFieldParallelModule'
            },
            {
                path: 'signer-parallel',
                loadChildren: './signer-parallel/signer-parallel.module#ParallelSignatureSignerParallelModule'
            },
            {
                path: 'transaction-parallel',
                loadChildren: './transaction-parallel/transaction-parallel.module#ParallelSignatureTransactionParallelModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParallelSignatureEntityModule {}
