package com.universign.universigncs.parallel.web.rest;
import com.universign.universigncs.parallel.domain.MetaTransaction;
import com.universign.universigncs.parallel.service.MetaTransactionService;
import com.universign.universigncs.parallel.web.rest.errors.BadRequestAlertException;
import com.universign.universigncs.parallel.web.rest.util.HeaderUtil;
import com.universign.universigncs.parallel.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MetaTransaction.
 */
@RestController
@RequestMapping("/api")
public class MetaTransactionResource {

    private final Logger log = LoggerFactory.getLogger(MetaTransactionResource.class);

    private static final String ENTITY_NAME = "metaTransaction";

    private final MetaTransactionService metaTransactionService;

    public MetaTransactionResource(MetaTransactionService metaTransactionService) {
        this.metaTransactionService = metaTransactionService;
    }

    /**
     * POST  /meta-transactions : Create a new metaTransaction.
     *
     * @param metaTransaction the metaTransaction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new metaTransaction, or with status 400 (Bad Request) if the metaTransaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meta-transactions")
    public ResponseEntity<MetaTransaction> createMetaTransaction(@RequestBody MetaTransaction metaTransaction) throws URISyntaxException {
        log.debug("REST request to save MetaTransaction : {}", metaTransaction);
        if (metaTransaction.getId() != null) {
            throw new BadRequestAlertException("A new metaTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MetaTransaction result = metaTransactionService.save(metaTransaction);
        return ResponseEntity.created(new URI("/api/meta-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meta-transactions : Updates an existing metaTransaction.
     *
     * @param metaTransaction the metaTransaction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated metaTransaction,
     * or with status 400 (Bad Request) if the metaTransaction is not valid,
     * or with status 500 (Internal Server Error) if the metaTransaction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meta-transactions")
    public ResponseEntity<MetaTransaction> updateMetaTransaction(@RequestBody MetaTransaction metaTransaction) throws URISyntaxException {
        log.debug("REST request to update MetaTransaction : {}", metaTransaction);
        if (metaTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MetaTransaction result = metaTransactionService.save(metaTransaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, metaTransaction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meta-transactions : get all the metaTransactions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of metaTransactions in body
     */
    @GetMapping("/meta-transactions")
    public ResponseEntity<List<MetaTransaction>> getAllMetaTransactions(Pageable pageable) {
        log.debug("REST request to get a page of MetaTransactions");
        Page<MetaTransaction> page = metaTransactionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/meta-transactions");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /meta-transactions/:id : get the "id" metaTransaction.
     *
     * @param id the id of the metaTransaction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the metaTransaction, or with status 404 (Not Found)
     */
    @GetMapping("/meta-transactions/{id}")
    public ResponseEntity<MetaTransaction> getMetaTransaction(@PathVariable String id) {
        log.debug("REST request to get MetaTransaction : {}", id);
        Optional<MetaTransaction> metaTransaction = metaTransactionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(metaTransaction);
    }

    /**
     * DELETE  /meta-transactions/:id : delete the "id" metaTransaction.
     *
     * @param id the id of the metaTransaction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meta-transactions/{id}")
    public ResponseEntity<Void> deleteMetaTransaction(@PathVariable String id) {
        log.debug("REST request to delete MetaTransaction : {}", id);
        metaTransactionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
