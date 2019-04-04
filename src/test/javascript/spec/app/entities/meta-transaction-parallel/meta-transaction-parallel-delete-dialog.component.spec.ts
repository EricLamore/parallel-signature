/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ParallelSignatureTestModule } from '../../../test.module';
import { MetaTransactionParallelDeleteDialogComponent } from 'app/entities/meta-transaction-parallel/meta-transaction-parallel-delete-dialog.component';
import { MetaTransactionParallelService } from 'app/entities/meta-transaction-parallel/meta-transaction-parallel.service';

describe('Component Tests', () => {
    describe('MetaTransactionParallel Management Delete Component', () => {
        let comp: MetaTransactionParallelDeleteDialogComponent;
        let fixture: ComponentFixture<MetaTransactionParallelDeleteDialogComponent>;
        let service: MetaTransactionParallelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [MetaTransactionParallelDeleteDialogComponent]
            })
                .overrideTemplate(MetaTransactionParallelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MetaTransactionParallelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetaTransactionParallelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
