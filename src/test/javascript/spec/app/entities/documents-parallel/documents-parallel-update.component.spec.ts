/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { DocumentsParallelUpdateComponent } from 'app/entities/documents-parallel/documents-parallel-update.component';
import { DocumentsParallelService } from 'app/entities/documents-parallel/documents-parallel.service';
import { DocumentsParallel } from 'app/shared/model/documents-parallel.model';

describe('Component Tests', () => {
    describe('DocumentsParallel Management Update Component', () => {
        let comp: DocumentsParallelUpdateComponent;
        let fixture: ComponentFixture<DocumentsParallelUpdateComponent>;
        let service: DocumentsParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [DocumentsParallelUpdateComponent]
            })
                .overrideTemplate(DocumentsParallelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentsParallelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentsParallelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DocumentsParallel('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documents = entity;
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
                    const entity = new DocumentsParallel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documents = entity;
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
