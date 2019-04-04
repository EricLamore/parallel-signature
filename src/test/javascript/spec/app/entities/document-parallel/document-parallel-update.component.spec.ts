/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { DocumentParallelUpdateComponent } from 'app/entities/document-parallel/document-parallel-update.component';
import { DocumentParallelService } from 'app/entities/document-parallel/document-parallel.service';
import { DocumentParallel } from 'app/shared/model/document-parallel.model';

describe('Component Tests', () => {
    describe('DocumentParallel Management Update Component', () => {
        let comp: DocumentParallelUpdateComponent;
        let fixture: ComponentFixture<DocumentParallelUpdateComponent>;
        let service: DocumentParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [DocumentParallelUpdateComponent]
            })
                .overrideTemplate(DocumentParallelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentParallelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentParallelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DocumentParallel('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.document = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DocumentParallel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.document = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
