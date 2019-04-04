/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ParallelSignatureTestModule } from '../../../test.module';
import { SignerParallelDeleteDialogComponent } from 'app/entities/signer-parallel/signer-parallel-delete-dialog.component';
import { SignerParallelService } from 'app/entities/signer-parallel/signer-parallel.service';

describe('Component Tests', () => {
    describe('SignerParallel Management Delete Component', () => {
        let comp: SignerParallelDeleteDialogComponent;
        let fixture: ComponentFixture<SignerParallelDeleteDialogComponent>;
        let service: SignerParallelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [SignerParallelDeleteDialogComponent]
            })
                .overrideTemplate(SignerParallelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SignerParallelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SignerParallelService);
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
