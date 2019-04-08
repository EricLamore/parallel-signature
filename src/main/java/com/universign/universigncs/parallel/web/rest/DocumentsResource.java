package com.universign.universigncs.parallel.web.rest;
import com.universign.universigncs.parallel.domain.Documents;
import com.universign.universigncs.parallel.service.DocumentsService;
import com.universign.universigncs.parallel.web.rest.errors.BadRequestAlertException;
import com.universign.universigncs.parallel.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Documents.
 */
@RestController
@RequestMapping("/api")
public class DocumentsResource {

    private final Logger log = LoggerFactory.getLogger(DocumentsResource.class);

    private static final String ENTITY_NAME = "documents";

    private final DocumentsService documentsService;

    public DocumentsResource(DocumentsService documentsService) {
        this.documentsService = documentsService;
    }

    /**
     * POST  /documents : Create a new documents.
     *
     * @param documents the documents to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documents, or with status 400 (Bad Request) if the documents has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/documents")
    public ResponseEntity<Documents> createDocuments(@Valid @RequestBody Documents documents) throws URISyntaxException {
        log.debug("REST request to save Documents : {}", documents);
        if (documents.getId() != null) {
            throw new BadRequestAlertException("A new documents cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Documents result = documentsService.save(documents);
        return ResponseEntity.created(new URI("/api/documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documents : Updates an existing documents.
     *
     * @param documents the documents to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documents,
     * or with status 400 (Bad Request) if the documents is not valid,
     * or with status 500 (Internal Server Error) if the documents couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/documents")
    public ResponseEntity<Documents> updateDocuments(@Valid @RequestBody Documents documents) throws URISyntaxException {
        log.debug("REST request to update Documents : {}", documents);
        if (documents.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Documents result = documentsService.save(documents);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documents.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documents : get all the documents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documents in body
     */
    @GetMapping("/documents")
    public List<Documents> getAllDocuments() {
        log.debug("REST request to get all Documents");
        return documentsService.findAll();
    }

    /**
     * GET  /documents/:id : get the "id" documents.
     *
     * @param id the id of the documents to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documents, or with status 404 (Not Found)
     */
    @GetMapping("/documents/{id}")
    public ResponseEntity<Documents> getDocuments(@PathVariable String id) {
        log.debug("REST request to get Documents : {}", id);
        Optional<Documents> documents = documentsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(documents);
    }

    /**
     * DELETE  /documents/:id : delete the "id" documents.
     *
     * @param id the id of the documents to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/documents/{id}")
    public ResponseEntity<Void> deleteDocuments(@PathVariable String id) {
        log.debug("REST request to delete Documents : {}", id);
        documentsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
