/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { SignatureFieldParallelUpdateComponent } from 'app/entities/signature-field-parallel/signature-field-parallel-update.component';
import { SignatureFieldParallelService } from 'app/entities/signature-field-parallel/signature-field-parallel.service';
import { SignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';

describe('Component Tests', () => {
    describe('SignatureFieldParallel Management Update Component', () => {
        let comp: SignatureFieldParallelUpdateComponent;
        let fixture: ComponentFixture<SignatureFieldParallelUpdateComponent>;
        let service: SignatureFieldParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [SignatureFieldParallelUpdateComponent]
            })
                .overrideTemplate(SignatureFieldParallelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SignatureFieldParallelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SignatureFieldParallelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SignatureFieldParallel('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.signatureField = entity;
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
                    const entity = new SignatureFieldParallel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.signatureField = entity;
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
