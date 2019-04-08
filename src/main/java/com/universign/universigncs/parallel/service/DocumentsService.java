package com.universign.universigncs.parallel.service;

import com.universign.universigncs.parallel.domain.Documents;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Documents.
 */
public interface DocumentsService {

    /**
     * Save a documents.
     *
     * @param documents the entity to save
     * @return the persisted entity
     */
    Documents save(Documents documents);

    /**
     * Get all the documents.
     *
     * @return the list of entities
     */
    List<Documents> findAll();


    /**
     * Get the "id" documents.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Documents> findOne(String id);

    /**
     * Delete the "id" documents.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
