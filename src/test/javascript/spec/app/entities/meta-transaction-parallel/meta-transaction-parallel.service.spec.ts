/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { MetaTransactionParallelService } from 'app/entities/meta-transaction-parallel/meta-transaction-parallel.service';
import { IMetaTransactionParallel, MetaTransactionParallel, MetaTansactonsStatus } from 'app/shared/model/meta-transaction-parallel.model';

describe('Service Tests', () => {
    describe('MetaTransactionParallel Service', () => {
        let injector: TestBed;
        let service: MetaTransactionParallelService;
        let httpMock: HttpTestingController;
        let elemDefault: IMetaTransactionParallel;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MetaTransactionParallelService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new MetaTransactionParallel(
                'ID',
                MetaTansactonsStatus.NONE,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                false,
                false,
                'image/png',
                'AAAAAAA',
                0
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find('123')
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a MetaTransactionParallel', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new MetaTransactionParallel(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a MetaTransactionParallel', async () => {
                const returnedFromService = Object.assign(
                    {
                        status: 'BBBBBB',
                        profile: 'BBBBBB',
                        owner: 'BBBBBB',
                        name: 'BBBBBB',
                        displayDateTimeOnSignatureField: true,
                        geometreSignatureRequired: true,
                        logoForGeometreSignatureField: 'BBBBBB',
                        metatransactionDuration: 1
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of MetaTransactionParallel', async () => {
                const returnedFromService = Object.assign(
                    {
                        status: 'BBBBBB',
                        profile: 'BBBBBB',
                        owner: 'BBBBBB',
                        name: 'BBBBBB',
                        displayDateTimeOnSignatureField: true,
                        geometreSignatureRequired: true,
                        logoForGeometreSignatureField: 'BBBBBB',
                        metatransactionDuration: 1
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a MetaTransactionParallel', async () => {
                const rxPromise = service.delete('123').subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
