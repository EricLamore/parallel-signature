import { IDocumentParallel } from 'app/shared/model/document-parallel.model';

export interface ISignatureFieldParallel {
    id?: string;
    page?: number;
    x?: number;
    y?: number;
    imageContentType?: string;
    image?: any;
    signerId?: number;
    metaTransaction?: IDocumentParallel;
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
        public metaTransaction?: IDocumentParallel
    ) {}
}
