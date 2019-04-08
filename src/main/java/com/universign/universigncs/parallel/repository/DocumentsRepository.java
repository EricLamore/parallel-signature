package com.universign.universigncs.parallel.repository;

import com.universign.universigncs.parallel.domain.Documents;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Documents entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentsRepository extends MongoRepository<Documents, String> {

}
