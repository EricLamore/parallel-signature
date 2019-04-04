import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IDocumentParallel } from 'app/shared/model/document-parallel.model';
import { DocumentParallelService } from './document-parallel.service';
import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';
import { MetaTransactionParallelService } from 'app/entities/meta-transaction-parallel';

@Component({
    selector: 'jhi-document-parallel-update',
    templateUrl: './document-parallel-update.component.html'
})
export class DocumentParallelUpdateComponent implements OnInit {
    document: IDocumentParallel;
    isSaving: boolean;

    metatransactions: IMetaTransactionParallel[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected documentService: DocumentParallelService,
        protected metaTransactionService: MetaTransactionParallelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
        });
        this.metaTransactionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMetaTransactionParallel[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMetaTransactionParallel[]>) => response.body)
            )
            .subscribe(
                (res: IMetaTransactionParallel[]) => (this.metatransactions = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(this.documentService.create(this.document));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentParallel>>) {
        result.subscribe((res: HttpResponse<IDocumentParallel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMetaTransactionById(index: number, item: IMetaTransactionParallel) {
        return item.id;
    }
}
