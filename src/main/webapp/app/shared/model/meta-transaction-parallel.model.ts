import { IDocumentsParallel } from 'app/shared/model/documents-parallel.model';
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
    displayDateTimeOnSignatureField?: boolean;
    geometreSignatureRequired?: boolean;
    logoForGeometreSignatureFieldContentType?: string;
    logoForGeometreSignatureField?: any;
    metatransactionDuration?: number;
    documents?: IDocumentsParallel[];
    signers?: ISignerParallel[];
}

export class MetaTransactionParallel implements IMetaTransactionParallel {
    constructor(
        public id?: string,
        public status?: MetaTansactonsStatus,
        public profile?: string,
        public owner?: string,
        public name?: string,
        public displayDateTimeOnSignatureField?: boolean,
        public geometreSignatureRequired?: boolean,
        public logoForGeometreSignatureFieldContentType?: string,
        public logoForGeometreSignatureField?: any,
        public metatransactionDuration?: number,
        public documents?: IDocumentsParallel[],
        public signers?: ISignerParallel[]
    ) {
        this.displayDateTimeOnSignatureField = this.displayDateTimeOnSignatureField || false;
        this.geometreSignatureRequired = this.geometreSignatureRequired || false;
    }
}
