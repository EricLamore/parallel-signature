/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ParallelSignatureTestModule } from '../../../test.module';
import { SignatureFieldParallelComponent } from 'app/entities/signature-field-parallel/signature-field-parallel.component';
import { SignatureFieldParallelService } from 'app/entities/signature-field-parallel/signature-field-parallel.service';
import { SignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';

describe('Component Tests', () => {
    describe('SignatureFieldParallel Management Component', () => {
        let comp: SignatureFieldParallelComponent;
        let fixture: ComponentFixture<SignatureFieldParallelComponent>;
        let service: SignatureFieldParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [SignatureFieldParallelComponent],
                providers: []
            })
                .overrideTemplate(SignatureFieldParallelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SignatureFieldParallelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SignatureFieldParallelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SignatureFieldParallel('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.signatureFields[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
