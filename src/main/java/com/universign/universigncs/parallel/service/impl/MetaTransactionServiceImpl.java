package com.universign.universigncs.parallel.service.impl;

import com.universign.universigncs.parallel.service.MetaTransactionService;
import com.universign.universigncs.parallel.domain.MetaTransaction;
import com.universign.universigncs.parallel.repository.MetaTransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing MetaTransaction.
 */
@Service
public class MetaTransactionServiceImpl implements MetaTransactionService {

    private final Logger log = LoggerFactory.getLogger(MetaTransactionServiceImpl.class);

    private final MetaTransactionRepository metaTransactionRepository;

    public MetaTransactionServiceImpl(MetaTransactionRepository metaTransactionRepository) {
        this.metaTransactionRepository = metaTransactionRepository;
    }

    /**
     * Save a metaTransaction.
     *
     * @param metaTransaction the entity to save
     * @return the persisted entity
     */
    @Override
    public MetaTransaction save(MetaTransaction metaTransaction) {
        log.debug("Request to save MetaTransaction : {}", metaTransaction);
        return metaTransactionRepository.save(metaTransaction);
    }

    /**
     * Get all the metaTransactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<MetaTransaction> findAll(Pageable pageable) {
        log.debug("Request to get all MetaTransactions");
        return metaTransactionRepository.findAll(pageable);
    }


    /**
     * Get one metaTransaction by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<MetaTransaction> findOne(String id) {
        log.debug("Request to get MetaTransaction : {}", id);
        return metaTransactionRepository.findById(id);
    }

    /**
     * Delete the metaTransaction by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete MetaTransaction : {}", id);
        metaTransactionRepository.deleteById(id);
    }
}
