package com.universign.universigncs.parallel.service.impl;

import com.universign.universigncs.parallel.service.DocumentService;
import com.universign.universigncs.parallel.domain.Document;
import com.universign.universigncs.parallel.repository.DocumentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Document.
 */
@Service
public class DocumentServiceImpl implements DocumentService {

    private final Logger log = LoggerFactory.getLogger(DocumentServiceImpl.class);

    private final DocumentRepository documentRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    /**
     * Save a document.
     *
     * @param document the entity to save
     * @return the persisted entity
     */
    @Override
    public Document save(Document document) {
        log.debug("Request to save Document : {}", document);
        return documentRepository.save(document);
    }

    /**
     * Get all the documents.
     *
     * @return the list of entities
     */
    @Override
    public List<Document> findAll() {
        log.debug("Request to get all Documents");
        return documentRepository.findAll();
    }


    /**
     * Get one document by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<Document> findOne(String id) {
        log.debug("Request to get Document : {}", id);
        return documentRepository.findById(id);
    }

    /**
     * Delete the document by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Document : {}", id);
        documentRepository.deleteById(id);
    }
}
