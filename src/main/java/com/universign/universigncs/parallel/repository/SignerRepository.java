package com.universign.universigncs.parallel.repository;

import com.universign.universigncs.parallel.domain.Signer;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Signer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SignerRepository extends MongoRepository<Signer, String> {

}
