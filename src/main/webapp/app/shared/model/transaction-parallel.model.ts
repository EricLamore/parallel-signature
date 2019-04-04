import { ISignerParallel } from 'app/shared/model/signer-parallel.model';

export const enum TansactonsStatus {
    None = 'None',
    Ready = 'Ready',
    Expired = 'Expired',
    Canceled = 'Canceled',
    Failed = 'Failed',
    Completed = 'Completed'
}

export interface ITransactionParallel {
    id?: string;
    status?: TansactonsStatus;
    idUniversign?: string;
    signer?: ISignerParallel;
}

export class TransactionParallel implements ITransactionParallel {
    constructor(public id?: string, public status?: TansactonsStatus, public idUniversign?: string, public signer?: ISignerParallel) {}
}
