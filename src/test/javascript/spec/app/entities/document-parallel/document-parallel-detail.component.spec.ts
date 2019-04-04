/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { DocumentParallelDetailComponent } from 'app/entities/document-parallel/document-parallel-detail.component';
import { DocumentParallel } from 'app/shared/model/document-parallel.model';

describe('Component Tests', () => {
    describe('DocumentParallel Management Detail Component', () => {
        let comp: DocumentParallelDetailComponent;
        let fixture: ComponentFixture<DocumentParallelDetailComponent>;
        const route = ({ data: of({ document: new DocumentParallel('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [DocumentParallelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentParallelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentParallelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.document).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
