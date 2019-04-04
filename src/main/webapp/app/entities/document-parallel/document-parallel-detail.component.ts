import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDocumentParallel } from 'app/shared/model/document-parallel.model';

@Component({
    selector: 'jhi-document-parallel-detail',
    templateUrl: './document-parallel-detail.component.html'
})
export class DocumentParallelDetailComponent implements OnInit {
    document: IDocumentParallel;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
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
