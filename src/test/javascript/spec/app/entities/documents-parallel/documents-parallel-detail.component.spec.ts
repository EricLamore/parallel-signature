/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ParallelSignatureTestModule } from '../../../test.module';
import { DocumentsParallelDetailComponent } from 'app/entities/documents-parallel/documents-parallel-detail.component';
import { DocumentsParallel } from 'app/shared/model/documents-parallel.model';

describe('Component Tests', () => {
    describe('DocumentsParallel Management Detail Component', () => {
        let comp: DocumentsParallelDetailComponent;
        let fixture: ComponentFixture<DocumentsParallelDetailComponent>;
        const route = ({ data: of({ documents: new DocumentsParallel('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [DocumentsParallelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DocumentsParallelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentsParallelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.documents).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
