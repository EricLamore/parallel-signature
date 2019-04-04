/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ParallelSignatureTestModule } from '../../../test.module';
import { DocumentParallelComponent } from 'app/entities/document-parallel/document-parallel.component';
import { DocumentParallelService } from 'app/entities/document-parallel/document-parallel.service';
import { DocumentParallel } from 'app/shared/model/document-parallel.model';

describe('Component Tests', () => {
    describe('DocumentParallel Management Component', () => {
        let comp: DocumentParallelComponent;
        let fixture: ComponentFixture<DocumentParallelComponent>;
        let service: DocumentParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [DocumentParallelComponent],
                providers: []
            })
                .overrideTemplate(DocumentParallelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentParallelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentParallelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DocumentParallel('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.documents[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
