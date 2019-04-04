package com.universign.universigncs.parallel.service.impl;

import com.universign.universigncs.parallel.service.SignatureFieldService;
import com.universign.universigncs.parallel.domain.SignatureField;
import com.universign.universigncs.parallel.repository.SignatureFieldRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing SignatureField.
 */
@Service
public class SignatureFieldServiceImpl implements SignatureFieldService {

    private final Logger log = LoggerFactory.getLogger(SignatureFieldServiceImpl.class);

    private final SignatureFieldRepository signatureFieldRepository;

    public SignatureFieldServiceImpl(SignatureFieldRepository signatureFieldRepository) {
        this.signatureFieldRepository = signatureFieldRepository;
    }

    /**
     * Save a signatureField.
     *
     * @param signatureField the entity to save
     * @return the persisted entity
     */
    @Override
    public SignatureField save(SignatureField signatureField) {
        log.debug("Request to save SignatureField : {}", signatureField);
        return signatureFieldRepository.save(signatureField);
    }

    /**
     * Get all the signatureFields.
     *
     * @return the list of entities
     */
    @Override
    public List<SignatureField> findAll() {
        log.debug("Request to get all SignatureFields");
        return signatureFieldRepository.findAll();
    }


    /**
     * Get one signatureField by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<SignatureField> findOne(String id) {
        log.debug("Request to get SignatureField : {}", id);
        return signatureFieldRepository.findById(id);
    }

    /**
     * Delete the signatureField by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete SignatureField : {}", id);
        signatureFieldRepository.deleteById(id);
    }
}
