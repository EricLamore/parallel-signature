package com.universign.universigncs.parallel.web.rest;
import com.universign.universigncs.parallel.domain.Transaction;
import com.universign.universigncs.parallel.service.TransactionService;
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
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Transaction.
 */
@RestController
@RequestMapping("/api")
public class TransactionResource {

    private final Logger log = LoggerFactory.getLogger(TransactionResource.class);

    private static final String ENTITY_NAME = "transaction";

    private final TransactionService transactionService;

    public TransactionResource(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    /**
     * POST  /transactions : Create a new transaction.
     *
     * @param transaction the transaction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transaction, or with status 400 (Bad Request) if the transaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transactions")
    public ResponseEntity<Transaction> createTransaction(@Valid @RequestBody Transaction transaction) throws URISyntaxException {
        log.debug("REST request to save Transaction : {}", transaction);
        if (transaction.getId() != null) {
            throw new BadRequestAlertException("A new transaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Transaction result = transactionService.save(transaction);
        return ResponseEntity.created(new URI("/api/transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transactions : Updates an existing transaction.
     *
     * @param transaction the transaction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transaction,
     * or with status 400 (Bad Request) if the transaction is not valid,
     * or with status 500 (Internal Server Error) if the transaction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transactions")
    public ResponseEntity<Transaction> updateTransaction(@Valid @RequestBody Transaction transaction) throws URISyntaxException {
        log.debug("REST request to update Transaction : {}", transaction);
        if (transaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Transaction result = transactionService.save(transaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transaction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transactions : get all the transactions.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of transactions in body
     */
    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions(@RequestParam(required = false) String filter) {
        if ("signer-is-null".equals(filter)) {
            log.debug("REST request to get all Transactions where signer is null");
            return transactionService.findAllWhereSignerIsNull();
        }
        log.debug("REST request to get all Transactions");
        return transactionService.findAll();
    }

    /**
     * GET  /transactions/:id : get the "id" transaction.
     *
     * @param id the id of the transaction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transaction, or with status 404 (Not Found)
     */
    @GetMapping("/transactions/{id}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable String id) {
        log.debug("REST request to get Transaction : {}", id);
        Optional<Transaction> transaction = transactionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transaction);
    }

    /**
     * DELETE  /transactions/:id : delete the "id" transaction.
     *
     * @param id the id of the transaction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable String id) {
        log.debug("REST request to delete Transaction : {}", id);
        transactionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
