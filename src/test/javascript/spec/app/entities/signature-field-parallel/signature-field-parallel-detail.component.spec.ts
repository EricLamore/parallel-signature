/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { SignatureFieldParallelDetailComponent } from 'app/entities/signature-field-parallel/signature-field-parallel-detail.component';
import { SignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';

describe('Component Tests', () => {
    describe('SignatureFieldParallel Management Detail Component', () => {
        let comp: SignatureFieldParallelDetailComponent;
        let fixture: ComponentFixture<SignatureFieldParallelDetailComponent>;
        const route = ({ data: of({ signatureField: new SignatureFieldParallel('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [SignatureFieldParallelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SignatureFieldParallelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SignatureFieldParallelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.signatureField).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
