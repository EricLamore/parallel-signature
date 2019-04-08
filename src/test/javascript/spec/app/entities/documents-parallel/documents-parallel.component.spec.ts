/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ParallelSignatureTestModule } from '../../../test.module';
import { DocumentsParallelComponent } from 'app/entities/documents-parallel/documents-parallel.component';
import { DocumentsParallelService } from 'app/entities/documents-parallel/documents-parallel.service';
import { DocumentsParallel } from 'app/shared/model/documents-parallel.model';

describe('Component Tests', () => {
    describe('DocumentsParallel Management Component', () => {
        let comp: DocumentsParallelComponent;
        let fixture: ComponentFixture<DocumentsParallelComponent>;
        let service: DocumentsParallelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ParallelSignatureTestModule],
                declarations: [DocumentsParallelComponent],
                providers: []
            })
                .overrideTemplate(DocumentsParallelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentsParallelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentsParallelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DocumentsParallel('123')],
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
