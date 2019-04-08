package com.universign.universigncs.parallel.service.impl;

import com.universign.universigncs.parallel.service.DocumentsService;
import com.universign.universigncs.parallel.domain.Documents;
import com.universign.universigncs.parallel.repository.DocumentsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Documents.
 */
@Service
public class DocumentsServiceImpl implements DocumentsService {

    private final Logger log = LoggerFactory.getLogger(DocumentsServiceImpl.class);

    private final DocumentsRepository documentsRepository;

    public DocumentsServiceImpl(DocumentsRepository documentsRepository) {
        this.documentsRepository = documentsRepository;
    }

    /**
     * Save a documents.
     *
     * @param documents the entity to save
     * @return the persisted entity
     */
    @Override
    public Documents save(Documents documents) {
        log.debug("Request to save Documents : {}", documents);
        return documentsRepository.save(documents);
    }

    /**
     * Get all the documents.
     *
     * @return the list of entities
     */
    @Override
    public List<Documents> findAll() {
        log.debug("Request to get all Documents");
        return documentsRepository.findAll();
    }


    /**
     * Get one documents by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<Documents> findOne(String id) {
        log.debug("Request to get Documents : {}", id);
        return documentsRepository.findById(id);
    }

    /**
     * Delete the documents by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Documents : {}", id);
        documentsRepository.deleteById(id);
    }
}
