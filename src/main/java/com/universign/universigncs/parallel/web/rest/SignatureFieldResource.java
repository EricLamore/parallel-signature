package com.universign.universigncs.parallel.web.rest;
import com.universign.universigncs.parallel.domain.SignatureField;
import com.universign.universigncs.parallel.service.SignatureFieldService;
import com.universign.universigncs.parallel.web.rest.errors.BadRequestAlertException;
import com.universign.universigncs.parallel.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SignatureField.
 */
@RestController
@RequestMapping("/api")
public class SignatureFieldResource {

    private final Logger log = LoggerFactory.getLogger(SignatureFieldResource.class);

    private static final String ENTITY_NAME = "signatureField";

    private final SignatureFieldService signatureFieldService;

    public SignatureFieldResource(SignatureFieldService signatureFieldService) {
        this.signatureFieldService = signatureFieldService;
    }

    /**
     * POST  /signature-fields : Create a new signatureField.
     *
     * @param signatureField the signatureField to create
     * @return the ResponseEntity with status 201 (Created) and with body the new signatureField, or with status 400 (Bad Request) if the signatureField has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/signature-fields")
    public ResponseEntity<SignatureField> createSignatureField(@RequestBody SignatureField signatureField) throws URISyntaxException {
        log.debug("REST request to save SignatureField : {}", signatureField);
        if (signatureField.getId() != null) {
            throw new BadRequestAlertException("A new signatureField cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SignatureField result = signatureFieldService.save(signatureField);
        return ResponseEntity.created(new URI("/api/signature-fields/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /signature-fields : Updates an existing signatureField.
     *
     * @param signatureField the signatureField to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated signatureField,
     * or with status 400 (Bad Request) if the signatureField is not valid,
     * or with status 500 (Internal Server Error) if the signatureField couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/signature-fields")
    public ResponseEntity<SignatureField> updateSignatureField(@RequestBody SignatureField signatureField) throws URISyntaxException {
        log.debug("REST request to update SignatureField : {}", signatureField);
        if (signatureField.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SignatureField result = signatureFieldService.save(signatureField);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, signatureField.getId().toString()))
            .body(result);
    }

    /**
     * GET  /signature-fields : get all the signatureFields.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of signatureFields in body
     */
    @GetMapping("/signature-fields")
    public List<SignatureField> getAllSignatureFields() {
        log.debug("REST request to get all SignatureFields");
        return signatureFieldService.findAll();
    }

    /**
     * GET  /signature-fields/:id : get the "id" signatureField.
     *
     * @param id the id of the signatureField to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the signatureField, or with status 404 (Not Found)
     */
    @GetMapping("/signature-fields/{id}")
    public ResponseEntity<SignatureField> getSignatureField(@PathVariable String id) {
        log.debug("REST request to get SignatureField : {}", id);
        Optional<SignatureField> signatureField = signatureFieldService.findOne(id);
        return ResponseUtil.wrapOrNotFound(signatureField);
    }

    /**
     * DELETE  /signature-fields/:id : delete the "id" signatureField.
     *
     * @param id the id of the signatureField to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/signature-fields/{id}")
    public ResponseEntity<Void> deleteSignatureField(@PathVariable String id) {
        log.debug("REST request to delete SignatureField : {}", id);
        signatureFieldService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
