package com.universign.universigncs.parallel.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.universign.universigncs.parallel.domain.enumeration.MetaTansactonsStatus;

/**
 * A MetaTransaction.
 */
@Document(collection = "meta_transaction")
public class MetaTransaction implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("status")
    private MetaTansactonsStatus status;

    @Field("profile")
    private String profile;

    @NotNull
    @Field("owner")
    private String owner;

    @Field("name")
    private String name;

    @DBRef
    @Field("documents")
    private Set<Document> documents = new HashSet<>();
    @DBRef
    @Field("signers")
    private Set<Signer> signers = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public MetaTansactonsStatus getStatus() {
        return status;
    }

    public MetaTransaction status(MetaTansactonsStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(MetaTansactonsStatus status) {
        this.status = status;
    }

    public String getProfile() {
        return profile;
    }

    public MetaTransaction profile(String profile) {
        this.profile = profile;
        return this;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getOwner() {
        return owner;
    }

    public MetaTransaction owner(String owner) {
        this.owner = owner;
        return this;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getName() {
        return name;
    }

    public MetaTransaction name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public MetaTransaction documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public MetaTransaction addDocuments(Document document) {
        this.documents.add(document);
        document.setMetaTransaction(this);
        return this;
    }

    public MetaTransaction removeDocuments(Document document) {
        this.documents.remove(document);
        document.setMetaTransaction(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Set<Signer> getSigners() {
        return signers;
    }

    public MetaTransaction signers(Set<Signer> signers) {
        this.signers = signers;
        return this;
    }

    public MetaTransaction addSigners(Signer signer) {
        this.signers.add(signer);
        signer.setMetaTransaction(this);
        return this;
    }

    public MetaTransaction removeSigners(Signer signer) {
        this.signers.remove(signer);
        signer.setMetaTransaction(null);
        return this;
    }

    public void setSigners(Set<Signer> signers) {
        this.signers = signers;
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
        MetaTransaction metaTransaction = (MetaTransaction) o;
        if (metaTransaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), metaTransaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MetaTransaction{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", profile='" + getProfile() + "'" +
            ", owner='" + getOwner() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
