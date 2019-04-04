package com.universign.universigncs.parallel.service;

import com.universign.universigncs.parallel.domain.MetaTransaction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing MetaTransaction.
 */
public interface MetaTransactionService {

    /**
     * Save a metaTransaction.
     *
     * @param metaTransaction the entity to save
     * @return the persisted entity
     */
    MetaTransaction save(MetaTransaction metaTransaction);

    /**
     * Get all the metaTransactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MetaTransaction> findAll(Pageable pageable);


    /**
     * Get the "id" metaTransaction.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MetaTransaction> findOne(String id);

    /**
     * Delete the "id" metaTransaction.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
