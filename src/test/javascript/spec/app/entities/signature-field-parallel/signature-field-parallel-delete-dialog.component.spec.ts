/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ParallelSignatureTestModule } from '../../../test.module';
import { SignatureFieldParallelDeleteDialogComponent } from 'app/entities/signature-field-parallel/signature-field-parallel-delete-dialog.component';
import { SignatureFieldParallelService } from 'app/entities/signature-field-parallel/signature-field-parallel.service';

describe('Component Tests', () => {
    describe('SignatureFieldParallel Management Delete Component', () => {
        let comp: SignatureFieldParallelDeleteDialogComponent;
        let fixture: ComponentFixture<SignatureFieldParallelDeleteDialogComponent>;
        let service: SignatureFieldParallelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [SignatureFieldParallelDeleteDialogComponent]
            })
                .overrideTemplate(SignatureFieldParallelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SignatureFieldParallelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SignatureFieldParallelService);
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
