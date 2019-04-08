/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ParallelSignatureTestModule } from '../../../test.module';
import { DocumentsParallelDeleteDialogComponent } from 'app/entities/documents-parallel/documents-parallel-delete-dialog.component';
import { DocumentsParallelService } from 'app/entities/documents-parallel/documents-parallel.service';

describe('Component Tests', () => {
    describe('DocumentsParallel Management Delete Component', () => {
        let comp: DocumentsParallelDeleteDialogComponent;
        let fixture: ComponentFixture<DocumentsParallelDeleteDialogComponent>;
        let service: DocumentsParallelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [DocumentsParallelDeleteDialogComponent]
            })
                .overrideTemplate(DocumentsParallelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentsParallelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentsParallelService);
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
