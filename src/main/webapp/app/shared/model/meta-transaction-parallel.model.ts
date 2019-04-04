import { IDocumentParallel } from 'app/shared/model/document-parallel.model';
import { ISignerParallel } from 'app/shared/model/signer-parallel.model';

export const enum MetaTansactonsStatus {
    NONE = 'NONE',
    CREATE = 'CREATE',
    LAUNCH = 'LAUNCH',
    CANCELED = 'CANCELED',
    FINISH = 'FINISH'
}

export interface IMetaTransactionParallel {
    id?: string;
    status?: MetaTansactonsStatus;
    profile?: string;
    owner?: string;
    name?: string;
    documents?: IDocumentParallel[];
    signers?: ISignerParallel[];
}

export class MetaTransactionParallel implements IMetaTransactionParallel {
    constructor(
        public id?: string,
        public status?: MetaTansactonsStatus,
        public profile?: string,
        public owner?: string,
        public name?: string,
        public documents?: IDocumentParallel[],
        public signers?: ISignerParallel[]
    ) {}
}
