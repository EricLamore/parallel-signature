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

    @Field("display_date_time_on_signature_field")
    private Boolean displayDateTimeOnSignatureField;

    @Field("geometre_signature_required")
    private Boolean geometreSignatureRequired;

    @Field("logo_for_geometre_signature_field")
    private byte[] logoForGeometreSignatureField;

    @Field("logo_for_geometre_signature_field_content_type")
    private String logoForGeometreSignatureFieldContentType;

    @Field("metatransaction_duration")
    private Integer metatransactionDuration;

    @DBRef
    @Field("documents")
    private Set<Documents> documents = new HashSet<>();
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

    public Boolean isDisplayDateTimeOnSignatureField() {
        return displayDateTimeOnSignatureField;
    }

    public MetaTransaction displayDateTimeOnSignatureField(Boolean displayDateTimeOnSignatureField) {
        this.displayDateTimeOnSignatureField = displayDateTimeOnSignatureField;
        return this;
    }

    public void setDisplayDateTimeOnSignatureField(Boolean displayDateTimeOnSignatureField) {
        this.displayDateTimeOnSignatureField = displayDateTimeOnSignatureField;
    }

    public Boolean isGeometreSignatureRequired() {
        return geometreSignatureRequired;
    }

    public MetaTransaction geometreSignatureRequired(Boolean geometreSignatureRequired) {
        this.geometreSignatureRequired = geometreSignatureRequired;
        return this;
    }

    public void setGeometreSignatureRequired(Boolean geometreSignatureRequired) {
        this.geometreSignatureRequired = geometreSignatureRequired;
    }

    public byte[] getLogoForGeometreSignatureField() {
        return logoForGeometreSignatureField;
    }

    public MetaTransaction logoForGeometreSignatureField(byte[] logoForGeometreSignatureField) {
        this.logoForGeometreSignatureField = logoForGeometreSignatureField;
        return this;
    }

    public void setLogoForGeometreSignatureField(byte[] logoForGeometreSignatureField) {
        this.logoForGeometreSignatureField = logoForGeometreSignatureField;
    }

    public String getLogoForGeometreSignatureFieldContentType() {
        return logoForGeometreSignatureFieldContentType;
    }

    public MetaTransaction logoForGeometreSignatureFieldContentType(String logoForGeometreSignatureFieldContentType) {
        this.logoForGeometreSignatureFieldContentType = logoForGeometreSignatureFieldContentType;
        return this;
    }

    public void setLogoForGeometreSignatureFieldContentType(String logoForGeometreSignatureFieldContentType) {
        this.logoForGeometreSignatureFieldContentType = logoForGeometreSignatureFieldContentType;
    }

    public Integer getMetatransactionDuration() {
        return metatransactionDuration;
    }

    public MetaTransaction metatransactionDuration(Integer metatransactionDuration) {
        this.metatransactionDuration = metatransactionDuration;
        return this;
    }

    public void setMetatransactionDuration(Integer metatransactionDuration) {
        this.metatransactionDuration = metatransactionDuration;
    }

    public Set<Documents> getDocuments() {
        return documents;
    }

    public MetaTransaction documents(Set<Documents> documents) {
        this.documents = documents;
        return this;
    }

    public MetaTransaction addDocuments(Documents documents) {
        this.documents.add(documents);
        documents.setMetaTransaction(this);
        return this;
    }

    public MetaTransaction removeDocuments(Documents documents) {
        this.documents.remove(documents);
        documents.setMetaTransaction(null);
        return this;
    }

    public void setDocuments(Set<Documents> documents) {
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
            ", displayDateTimeOnSignatureField='" + isDisplayDateTimeOnSignatureField() + "'" +
            ", geometreSignatureRequired='" + isGeometreSignatureRequired() + "'" +
            ", logoForGeometreSignatureField='" + getLogoForGeometreSignatureField() + "'" +
            ", logoForGeometreSignatureFieldContentType='" + getLogoForGeometreSignatureFieldContentType() + "'" +
            ", metatransactionDuration=" + getMetatransactionDuration() +
            "}";
    }
}
