/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ParallelSignatureTestModule } from '../../../test.module';
import { SignerParallelComponent } from 'app/entities/signer-parallel/signer-parallel.component';
import { SignerParallelService } from 'app/entities/signer-parallel/signer-parallel.service';
import { SignerParallel } from 'app/shared/model/signer-parallel.model';

describe('Component Tests', () => {
    describe('SignerParallel Management Component', () => {
        let comp: SignerParallelComponent;
        let fixture: ComponentFixture<SignerParallelComponent>;
        let service: SignerParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [SignerParallelComponent],
                providers: []
            })
                .overrideTemplate(SignerParallelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SignerParallelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SignerParallelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SignerParallel('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.signers[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
