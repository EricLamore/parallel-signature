/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { SignerParallelDetailComponent } from 'app/entities/signer-parallel/signer-parallel-detail.component';
import { SignerParallel } from 'app/shared/model/signer-parallel.model';

describe('Component Tests', () => {
    describe('SignerParallel Management Detail Component', () => {
        let comp: SignerParallelDetailComponent;
        let fixture: ComponentFixture<SignerParallelDetailComponent>;
        const route = ({ data: of({ signer: new SignerParallel('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [SignerParallelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SignerParallelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SignerParallelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.signer).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
