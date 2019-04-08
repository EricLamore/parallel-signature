import { IDocumentsParallel } from 'app/shared/model/documents-parallel.model';

export interface ISignatureFieldParallel {
    id?: string;
    page?: number;
    x?: number;
    y?: number;
    imageContentType?: string;
    image?: any;
    signerId?: number;
    metaTransaction?: IDocumentsParallel;
}

export class SignatureFieldParallel implements ISignatureFieldParallel {
    constructor(
        public id?: string,
        public page?: number,
        public x?: number,
        public y?: number,
        public imageContentType?: string,
        public image?: any,
        public signerId?: number,
        public metaTransaction?: IDocumentsParallel
    ) {}
}
