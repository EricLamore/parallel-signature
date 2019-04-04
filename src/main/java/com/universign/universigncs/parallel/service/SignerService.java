package com.universign.universigncs.parallel.service;

import com.universign.universigncs.parallel.domain.Signer;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Signer.
 */
public interface SignerService {

    /**
     * Save a signer.
     *
     * @param signer the entity to save
     * @return the persisted entity
     */
    Signer save(Signer signer);

    /**
     * Get all the signers.
     *
     * @return the list of entities
     */
    List<Signer> findAll();


    /**
     * Get the "id" signer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Signer> findOne(String id);

    /**
     * Delete the "id" signer.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
