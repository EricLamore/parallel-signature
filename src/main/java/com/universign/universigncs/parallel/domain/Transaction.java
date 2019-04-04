package com.universign.universigncs.parallel.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.universign.universigncs.parallel.domain.enumeration.TansactonsStatus;

/**
 * A Transaction.
 */
@Document(collection = "transaction")
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("status")
    private TansactonsStatus status;

    @NotNull
    @Field("id_universign")
    private String idUniversign;

    @DBRef
    @Field("signer")
    @com.fasterxml.jackson.annotation.JsonBackReference
    private Signer signer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public TansactonsStatus getStatus() {
        return status;
    }

    public Transaction status(TansactonsStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(TansactonsStatus status) {
        this.status = status;
    }

    public String getIdUniversign() {
        return idUniversign;
    }

    public Transaction idUniversign(String idUniversign) {
        this.idUniversign = idUniversign;
        return this;
    }

    public void setIdUniversign(String idUniversign) {
        this.idUniversign = idUniversign;
    }

    public Signer getSigner() {
        return signer;
    }

    public Transaction signer(Signer signer) {
        this.signer = signer;
        return this;
    }

    public void setSigner(Signer signer) {
        this.signer = signer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Transaction transaction = (Transaction) o;
        if (transaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Transaction{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", idUniversign='" + getIdUniversign() + "'" +
            "}";
    }
}
