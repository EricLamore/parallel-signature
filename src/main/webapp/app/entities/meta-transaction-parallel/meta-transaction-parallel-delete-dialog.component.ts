import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';
import { MetaTransactionParallelService } from './meta-transaction-parallel.service';

@Component({
    selector: 'jhi-meta-transaction-parallel-delete-dialog',
    templateUrl: './meta-transaction-parallel-delete-dialog.component.html'
})
export class MetaTransactionParallelDeleteDialogComponent {
    metaTransaction: IMetaTransactionParallel;

    constructor(
        protected metaTransactionService: MetaTransactionParallelService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.metaTransactionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'metaTransactionListModification',
                content: 'Deleted an metaTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meta-transaction-parallel-delete-popup',
    template: ''
})
export class MetaTransactionParallelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ metaTransaction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MetaTransactionParallelDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.metaTransaction = metaTransaction;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/meta-transaction-parallel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/meta-transaction-parallel', { outlets: { popup: null } }]);
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
