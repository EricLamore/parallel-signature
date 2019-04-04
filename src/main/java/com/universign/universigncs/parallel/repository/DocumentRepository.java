package com.universign.universigncs.parallel.repository;

import com.universign.universigncs.parallel.domain.Document;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends MongoRepository<Document, String> {

}
