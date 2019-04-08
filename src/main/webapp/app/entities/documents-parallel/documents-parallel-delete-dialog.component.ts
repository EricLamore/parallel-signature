import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentsParallel } from 'app/shared/model/documents-parallel.model';
import { DocumentsParallelService } from './documents-parallel.service';

@Component({
    selector: 'jhi-documents-parallel-delete-dialog',
    templateUrl: './documents-parallel-delete-dialog.component.html'
})
export class DocumentsParallelDeleteDialogComponent {
    documents: IDocumentsParallel;

    constructor(
        protected documentsService: DocumentsParallelService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.documentsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentsListModification',
                content: 'Deleted an documents'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-documents-parallel-delete-popup',
    template: ''
})
export class DocumentsParallelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documents }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentsParallelDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.documents = documents;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/documents-parallel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/documents-parallel', { outlets: { popup: null } }]);
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
