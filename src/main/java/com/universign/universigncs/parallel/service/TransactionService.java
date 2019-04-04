package com.universign.universigncs.parallel.service;

import com.universign.universigncs.parallel.domain.Transaction;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Transaction.
 */
public interface TransactionService {

    /**
     * Save a transaction.
     *
     * @param transaction the entity to save
     * @return the persisted entity
     */
    Transaction save(Transaction transaction);

    /**
     * Get all the transactions.
     *
     * @return the list of entities
     */
    List<Transaction> findAll();
    /**
     * Get all the TransactionDTO where Signer is null.
     *
     * @return the list of entities
     */
    List<Transaction> findAllWhereSignerIsNull();


    /**
     * Get the "id" transaction.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Transaction> findOne(String id);

    /**
     * Delete the "id" transaction.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
