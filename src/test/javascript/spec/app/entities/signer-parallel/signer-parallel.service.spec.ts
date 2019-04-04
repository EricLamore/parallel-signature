/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SignerParallelService } from 'app/entities/signer-parallel/signer-parallel.service';
import { ISignerParallel, SignerParallel, SignerStatus, CertificateType } from 'app/shared/model/signer-parallel.model';

describe('Service Tests', () => {
    describe('SignerParallel Service', () => {
        let injector: TestBed;
        let service: SignerParallelService;
        let httpMock: HttpTestingController;
        let elemDefault: ISignerParallel;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(SignerParallelService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new SignerParallel(
                'ID',
                SignerStatus.NONE,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                CertificateType.Simple
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        birthDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find('123')
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a SignerParallel', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID',
                        birthDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        birthDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new SignerParallel(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a SignerParallel', async () => {
                const returnedFromService = Object.assign(
                    {
                        status: 'BBBBBB',
                        firstname: 'BBBBBB',
                        lastname: 'BBBBBB',
                        organization: 'BBBBBB',
                        emailAddress: 'BBBBBB',
                        phoneNum: 'BBBBBB',
                        birthDate: currentDate.format(DATE_FORMAT),
                        successURL: 'BBBBBB',
                        cancelURL: 'BBBBBB',
                        failURL: 'BBBBBB',
                        certificateType: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        birthDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of SignerParallel', async () => {
                const returnedFromService = Object.assign(
                    {
                        status: 'BBBBBB',
                        firstname: 'BBBBBB',
                        lastname: 'BBBBBB',
                        organization: 'BBBBBB',
                        emailAddress: 'BBBBBB',
                        phoneNum: 'BBBBBB',
                        birthDate: currentDate.format(DATE_FORMAT),
                        successURL: 'BBBBBB',
                        cancelURL: 'BBBBBB',
                        failURL: 'BBBBBB',
                        certificateType: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        birthDate: currentDate
                    },
                    returnedFromService
                );
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

            it('should delete a SignerParallel', async () => {
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
