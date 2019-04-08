import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDocumentsParallel } from 'app/shared/model/documents-parallel.model';

@Component({
    selector: 'jhi-documents-parallel-detail',
    templateUrl: './documents-parallel-detail.component.html'
})
export class DocumentsParallelDetailComponent implements OnInit {
    documents: IDocumentsParallel;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documents }) => {
            this.documents = documents;
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
