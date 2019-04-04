/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { MetaTransactionParallelUpdateComponent } from 'app/entities/meta-transaction-parallel/meta-transaction-parallel-update.component';
import { MetaTransactionParallelService } from 'app/entities/meta-transaction-parallel/meta-transaction-parallel.service';
import { MetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';

describe('Component Tests', () => {
    describe('MetaTransactionParallel Management Update Component', () => {
        let comp: MetaTransactionParallelUpdateComponent;
        let fixture: ComponentFixture<MetaTransactionParallelUpdateComponent>;
        let service: MetaTransactionParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [MetaTransactionParallelUpdateComponent]
            })
                .overrideTemplate(MetaTransactionParallelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MetaTransactionParallelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetaTransactionParallelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MetaTransactionParallel('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.metaTransaction = entity;
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
                    const entity = new MetaTransactionParallel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.metaTransaction = entity;
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
