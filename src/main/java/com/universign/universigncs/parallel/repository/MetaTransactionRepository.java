package com.universign.universigncs.parallel.repository;

import com.universign.universigncs.parallel.domain.MetaTransaction;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the MetaTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetaTransactionRepository extends MongoRepository<MetaTransaction, String> {

}
