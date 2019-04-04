package com.universign.universigncs.parallel.repository;

import com.universign.universigncs.parallel.domain.SignatureField;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the SignatureField entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SignatureFieldRepository extends MongoRepository<SignatureField, String> {

}
