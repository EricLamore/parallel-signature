import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISignerParallel } from 'app/shared/model/signer-parallel.model';
import { SignerParallelService } from './signer-parallel.service';

@Component({
    selector: 'jhi-signer-parallel-delete-dialog',
    templateUrl: './signer-parallel-delete-dialog.component.html'
})
export class SignerParallelDeleteDialogComponent {
    signer: ISignerParallel;

    constructor(
        protected signerService: SignerParallelService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.signerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'signerListModification',
                content: 'Deleted an signer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-signer-parallel-delete-popup',
    template: ''
})
export class SignerParallelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ signer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SignerParallelDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.signer = signer;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/signer-parallel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/signer-parallel', { outlets: { popup: null } }]);
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
