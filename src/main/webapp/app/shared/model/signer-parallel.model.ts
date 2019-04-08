import { Moment } from 'moment';
import { ITransactionParallel } from 'app/shared/model/transaction-parallel.model';
import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';

export const enum SignerStatus {
    NONE = 'NONE',
    CREATE = 'CREATE',
    LAUNCH = 'LAUNCH',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED',
    FINISH = 'FINISH'
}

export const enum CertificateType {
    Simple = 'Simple',
    Certified = 'Certified',
    Advanced = 'Advanced'
}

export interface ISignerParallel {
    id?: string;
    status?: SignerStatus;
    firstname?: string;
    lastname?: string;
    organization?: string;
    emailAddress?: string;
    phoneNum?: string;
    birthDate?: Moment;
    successURL?: string;
    cancelURL?: string;
    failURL?: string;
    callBackUrl?: string;
    certificateType?: CertificateType;
    relaunchFrequency?: number;
    lastRelaunch?: Moment;
    sendSignedDocumentsByEmail?: boolean;
    textForInvitationEmail?: string;
    textForRelaunchEmail?: string;
    textForSignedDocumentsEmail?: string;
    transaction?: ITransactionParallel;
    metaTransaction?: IMetaTransactionParallel;
}

export class SignerParallel implements ISignerParallel {
    constructor(
        public id?: string,
        public status?: SignerStatus,
        public firstname?: string,
        public lastname?: string,
        public organization?: string,
        public emailAddress?: string,
        public phoneNum?: string,
        public birthDate?: Moment,
        public successURL?: string,
        public cancelURL?: string,
        public failURL?: string,
        public callBackUrl?: string,
        public certificateType?: CertificateType,
        public relaunchFrequency?: number,
        public lastRelaunch?: Moment,
        public sendSignedDocumentsByEmail?: boolean,
        public textForInvitationEmail?: string,
        public textForRelaunchEmail?: string,
        public textForSignedDocumentsEmail?: string,
        public transaction?: ITransactionParallel,
        public metaTransaction?: IMetaTransactionParallel
    ) {
        this.sendSignedDocumentsByEmail = this.sendSignedDocumentsByEmail || false;
    }
}
