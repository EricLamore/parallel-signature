/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ParallelSignatureTestModule } from '../../../test.module';
import { TransactionParallelComponent } from 'app/entities/transaction-parallel/transaction-parallel.component';
import { TransactionParallelService } from 'app/entities/transaction-parallel/transaction-parallel.service';
import { TransactionParallel } from 'app/shared/model/transaction-parallel.model';

describe('Component Tests', () => {
    describe('TransactionParallel Management Component', () => {
        let comp: TransactionParallelComponent;
        let fixture: ComponentFixture<TransactionParallelComponent>;
        let service: TransactionParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [TransactionParallelComponent],
                providers: []
            })
                .overrideTemplate(TransactionParallelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionParallelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionParallelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransactionParallel('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transactions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
