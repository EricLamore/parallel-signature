package com.universign.universigncs.parallel.service.impl;

import com.universign.universigncs.parallel.service.TransactionService;
import com.universign.universigncs.parallel.domain.Transaction;
import com.universign.universigncs.parallel.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Transaction.
 */
@Service
public class TransactionServiceImpl implements TransactionService {

    private final Logger log = LoggerFactory.getLogger(TransactionServiceImpl.class);

    private final TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    /**
     * Save a transaction.
     *
     * @param transaction the entity to save
     * @return the persisted entity
     */
    @Override
    public Transaction save(Transaction transaction) {
        log.debug("Request to save Transaction : {}", transaction);
        return transactionRepository.save(transaction);
    }

    /**
     * Get all the transactions.
     *
     * @return the list of entities
     */
    @Override
    public List<Transaction> findAll() {
        log.debug("Request to get all Transactions");
        return transactionRepository.findAll();
    }



    /**
     *  get all the transactions where Signer is null.
     *  @return the list of entities
     */
    public List<Transaction> findAllWhereSignerIsNull() {
        log.debug("Request to get all transactions where Signer is null");
        return StreamSupport
            .stream(transactionRepository.findAll().spliterator(), false)
            .filter(transaction -> transaction.getSigner() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one transaction by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<Transaction> findOne(String id) {
        log.debug("Request to get Transaction : {}", id);
        return transactionRepository.findById(id);
    }

    /**
     * Delete the transaction by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Transaction : {}", id);
        transactionRepository.deleteById(id);
    }
}
