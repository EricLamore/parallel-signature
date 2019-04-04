package com.universign.universigncs.parallel.service.impl;

import com.universign.universigncs.parallel.service.SignerService;
import com.universign.universigncs.parallel.domain.Signer;
import com.universign.universigncs.parallel.repository.SignerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Signer.
 */
@Service
public class SignerServiceImpl implements SignerService {

    private final Logger log = LoggerFactory.getLogger(SignerServiceImpl.class);

    private final SignerRepository signerRepository;

    public SignerServiceImpl(SignerRepository signerRepository) {
        this.signerRepository = signerRepository;
    }

    /**
     * Save a signer.
     *
     * @param signer the entity to save
     * @return the persisted entity
     */
    @Override
    public Signer save(Signer signer) {
        log.debug("Request to save Signer : {}", signer);
        return signerRepository.save(signer);
    }

    /**
     * Get all the signers.
     *
     * @return the list of entities
     */
    @Override
    public List<Signer> findAll() {
        log.debug("Request to get all Signers");
        return signerRepository.findAll();
    }


    /**
     * Get one signer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<Signer> findOne(String id) {
        log.debug("Request to get Signer : {}", id);
        return signerRepository.findById(id);
    }

    /**
     * Delete the signer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Signer : {}", id);
        signerRepository.deleteById(id);
    }
}
