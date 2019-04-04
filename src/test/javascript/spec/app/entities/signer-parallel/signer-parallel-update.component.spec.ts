/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { SignerParallelUpdateComponent } from 'app/entities/signer-parallel/signer-parallel-update.component';
import { SignerParallelService } from 'app/entities/signer-parallel/signer-parallel.service';
import { SignerParallel } from 'app/shared/model/signer-parallel.model';

describe('Component Tests', () => {
    describe('SignerParallel Management Update Component', () => {
        let comp: SignerParallelUpdateComponent;
        let fixture: ComponentFixture<SignerParallelUpdateComponent>;
        let service: SignerParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [SignerParallelUpdateComponent]
            })
                .overrideTemplate(SignerParallelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SignerParallelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SignerParallelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SignerParallel('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.signer = entity;
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
                    const entity = new SignerParallel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.signer = entity;
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
