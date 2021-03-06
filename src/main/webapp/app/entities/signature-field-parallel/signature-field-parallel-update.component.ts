import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';
import { SignatureFieldParallelService } from './signature-field-parallel.service';
import { IDocumentsParallel } from 'app/shared/model/documents-parallel.model';
import { DocumentsParallelService } from 'app/entities/documents-parallel';

@Component({
    selector: 'jhi-signature-field-parallel-update',
    templateUrl: './signature-field-parallel-update.component.html'
})
export class SignatureFieldParallelUpdateComponent implements OnInit {
    signatureField: ISignatureFieldParallel;
    isSaving: boolean;

    documents: IDocumentsParallel[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected signatureFieldService: SignatureFieldParallelService,
        protected documentsService: DocumentsParallelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ signatureField }) => {
            this.signatureField = signatureField;
        });
        this.documentsService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDocumentsParallel[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDocumentsParallel[]>) => response.body)
            )
            .subscribe((res: IDocumentsParallel[]) => (this.documents = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.signatureField.id !== undefined) {
            this.subscribeToSaveResponse(this.signatureFieldService.update(this.signatureField));
        } else {
            this.subscribeToSaveResponse(this.signatureFieldService.create(this.signatureField));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISignatureFieldParallel>>) {
        result.subscribe(
            (res: HttpResponse<ISignatureFieldParallel>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentsById(index: number, item: IDocumentsParallel) {
        return item.id;
    }
}
