/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { TransactionParallelUpdateComponent } from 'app/entities/transaction-parallel/transaction-parallel-update.component';
import { TransactionParallelService } from 'app/entities/transaction-parallel/transaction-parallel.service';
import { TransactionParallel } from 'app/shared/model/transaction-parallel.model';

describe('Component Tests', () => {
    describe('TransactionParallel Management Update Component', () => {
        let comp: TransactionParallelUpdateComponent;
        let fixture: ComponentFixture<TransactionParallelUpdateComponent>;
        let service: TransactionParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [TransactionParallelUpdateComponent]
            })
                .overrideTemplate(TransactionParallelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionParallelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionParallelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransactionParallel('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transaction = entity;
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
                    const entity = new TransactionParallel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transaction = entity;
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
