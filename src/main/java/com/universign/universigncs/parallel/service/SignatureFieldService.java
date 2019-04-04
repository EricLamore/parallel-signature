package com.universign.universigncs.parallel.service;

import com.universign.universigncs.parallel.domain.SignatureField;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing SignatureField.
 */
public interface SignatureFieldService {

    /**
     * Save a signatureField.
     *
     * @param signatureField the entity to save
     * @return the persisted entity
     */
    SignatureField save(SignatureField signatureField);

    /**
     * Get all the signatureFields.
     *
     * @return the list of entities
     */
    List<SignatureField> findAll();


    /**
     * Get the "id" signatureField.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SignatureField> findOne(String id);

    /**
     * Delete the "id" signatureField.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
