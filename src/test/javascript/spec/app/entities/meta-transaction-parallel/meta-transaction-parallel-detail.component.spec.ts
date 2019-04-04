/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { MetaTransactionParallelDetailComponent } from 'app/entities/meta-transaction-parallel/meta-transaction-parallel-detail.component';
import { MetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';

describe('Component Tests', () => {
    describe('MetaTransactionParallel Management Detail Component', () => {
        let comp: MetaTransactionParallelDetailComponent;
        let fixture: ComponentFixture<MetaTransactionParallelDetailComponent>;
        const route = ({ data: of({ metaTransaction: new MetaTransactionParallel('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [MetaTransactionParallelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MetaTransactionParallelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MetaTransactionParallelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.metaTransaction).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
