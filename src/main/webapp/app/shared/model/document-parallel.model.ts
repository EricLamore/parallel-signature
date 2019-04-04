import { ISignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';
import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';

export interface IDocumentParallel {
    id?: string;
    contentContentType?: string;
    content?: any;
    fileName?: string;
    title?: string;
    documents?: ISignatureFieldParallel[];
    metaTransaction?: IMetaTransactionParallel;
}

export class DocumentParallel implements IDocumentParallel {
    constructor(
        public id?: string,
        public contentContentType?: string,
        public content?: any,
        public fileName?: string,
        public title?: string,
        public documents?: ISignatureFieldParallel[],
        public metaTransaction?: IMetaTransactionParallel
    ) {}
}
