import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactionParallel } from 'app/shared/model/transaction-parallel.model';
import { TransactionParallelService } from './transaction-parallel.service';

@Component({
    selector: 'jhi-transaction-parallel-delete-dialog',
    templateUrl: './transaction-parallel-delete-dialog.component.html'
})
export class TransactionParallelDeleteDialogComponent {
    transaction: ITransactionParallel;

    constructor(
        protected transactionService: TransactionParallelService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.transactionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transactionListModification',
                content: 'Deleted an transaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-parallel-delete-popup',
    template: ''
})
export class TransactionParallelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transaction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransactionParallelDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transaction = transaction;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/transaction-parallel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/transaction-parallel', { outlets: { popup: null } }]);
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
