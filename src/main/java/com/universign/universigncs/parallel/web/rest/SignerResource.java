package com.universign.universigncs.parallel.web.rest;
import com.universign.universigncs.parallel.domain.Signer;
import com.universign.universigncs.parallel.service.SignerService;
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
 * REST controller for managing Signer.
 */
@RestController
@RequestMapping("/api")
public class SignerResource {

    private final Logger log = LoggerFactory.getLogger(SignerResource.class);

    private static final String ENTITY_NAME = "signer";

    private final SignerService signerService;

    public SignerResource(SignerService signerService) {
        this.signerService = signerService;
    }

    /**
     * POST  /signers : Create a new signer.
     *
     * @param signer the signer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new signer, or with status 400 (Bad Request) if the signer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/signers")
    public ResponseEntity<Signer> createSigner(@Valid @RequestBody Signer signer) throws URISyntaxException {
        log.debug("REST request to save Signer : {}", signer);
        if (signer.getId() != null) {
            throw new BadRequestAlertException("A new signer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Signer result = signerService.save(signer);
        return ResponseEntity.created(new URI("/api/signers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /signers : Updates an existing signer.
     *
     * @param signer the signer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated signer,
     * or with status 400 (Bad Request) if the signer is not valid,
     * or with status 500 (Internal Server Error) if the signer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/signers")
    public ResponseEntity<Signer> updateSigner(@Valid @RequestBody Signer signer) throws URISyntaxException {
        log.debug("REST request to update Signer : {}", signer);
        if (signer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Signer result = signerService.save(signer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, signer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /signers : get all the signers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of signers in body
     */
    @GetMapping("/signers")
    public List<Signer> getAllSigners() {
        log.debug("REST request to get all Signers");
        return signerService.findAll();
    }

    /**
     * GET  /signers/:id : get the "id" signer.
     *
     * @param id the id of the signer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the signer, or with status 404 (Not Found)
     */
    @GetMapping("/signers/{id}")
    public ResponseEntity<Signer> getSigner(@PathVariable String id) {
        log.debug("REST request to get Signer : {}", id);
        Optional<Signer> signer = signerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(signer);
    }

    /**
     * DELETE  /signers/:id : delete the "id" signer.
     *
     * @param id the id of the signer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/signers/{id}")
    public ResponseEntity<Void> deleteSigner(@PathVariable String id) {
        log.debug("REST request to delete Signer : {}", id);
        signerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
