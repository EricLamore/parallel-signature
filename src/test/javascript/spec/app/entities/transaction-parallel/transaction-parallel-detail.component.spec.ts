/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { TransactionParallelDetailComponent } from 'app/entities/transaction-parallel/transaction-parallel-detail.component';
import { TransactionParallel } from 'app/shared/model/transaction-parallel.model';

describe('Component Tests', () => {
    describe('TransactionParallel Management Detail Component', () => {
        let comp: TransactionParallelDetailComponent;
        let fixture: ComponentFixture<TransactionParallelDetailComponent>;
        const route = ({ data: of({ transaction: new TransactionParallel('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [TransactionParallelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransactionParallelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransactionParallelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transaction).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
