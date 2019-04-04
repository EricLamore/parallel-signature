import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';
import { SignatureFieldParallelService } from './signature-field-parallel.service';

@Component({
    selector: 'jhi-signature-field-parallel-delete-dialog',
    templateUrl: './signature-field-parallel-delete-dialog.component.html'
})
export class SignatureFieldParallelDeleteDialogComponent {
    signatureField: ISignatureFieldParallel;

    constructor(
        protected signatureFieldService: SignatureFieldParallelService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.signatureFieldService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'signatureFieldListModification',
                content: 'Deleted an signatureField'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-signature-field-parallel-delete-popup',
    template: ''
})
export class SignatureFieldParallelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ signatureField }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SignatureFieldParallelDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.signatureField = signatureField;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/signature-field-parallel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/signature-field-parallel', { outlets: { popup: null } }]);
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
