import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';

@Component({
    selector: 'jhi-signature-field-parallel-detail',
    templateUrl: './signature-field-parallel-detail.component.html'
})
export class SignatureFieldParallelDetailComponent implements OnInit {
    signatureField: ISignatureFieldParallel;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ signatureField }) => {
            this.signatureField = signatureField;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
