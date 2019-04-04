import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentParallel } from 'app/shared/model/document-parallel.model';
import { DocumentParallelService } from './document-parallel.service';

@Component({
    selector: 'jhi-document-parallel-delete-dialog',
    templateUrl: './document-parallel-delete-dialog.component.html'
})
export class DocumentParallelDeleteDialogComponent {
    document: IDocumentParallel;

    constructor(
        protected documentService: DocumentParallelService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.documentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentListModification',
                content: 'Deleted an document'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-parallel-delete-popup',
    template: ''
})
export class DocumentParallelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ document }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentParallelDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.document = document;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/document-parallel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/document-parallel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
