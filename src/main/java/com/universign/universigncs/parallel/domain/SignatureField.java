package com.universign.universigncs.parallel.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SignatureField.
 */
@Document(collection = "signature_field")
public class SignatureField implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("page")
    private Integer page;

    @Field("x")
    private Integer x;

    @Field("y")
    private Integer y;

    @Field("image")
    private byte[] image;

    @Field("image_content_type")
    private String imageContentType;

    @Field("signer_id")
    private Long signerId;

    @DBRef
    @Field("metaTransaction")
    @JsonIgnoreProperties("documents")
    private Document metaTransaction;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getPage() {
        return page;
    }

    public SignatureField page(Integer page) {
        this.page = page;
        return this;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getX() {
        return x;
    }

    public SignatureField x(Integer x) {
        this.x = x;
        return this;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public SignatureField y(Integer y) {
        this.y = y;
        return this;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public byte[] getImage() {
        return image;
    }

    public SignatureField image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public SignatureField imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Long getSignerId() {
        return signerId;
    }

    public SignatureField signerId(Long signerId) {
        this.signerId = signerId;
        return this;
    }

    public void setSignerId(Long signerId) {
        this.signerId = signerId;
    }

    public Document getMetaTransaction() {
        return metaTransaction;
    }

    public SignatureField metaTransaction(Document document) {
        this.metaTransaction = document;
        return this;
    }

    public void setMetaTransaction(Document document) {
        this.metaTransaction = document;
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
        SignatureField signatureField = (SignatureField) o;
        if (signatureField.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), signatureField.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SignatureField{" +
            "id=" + getId() +
            ", page=" + getPage() +
            ", x=" + getX() +
            ", y=" + getY() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", signerId=" + getSignerId() +
            "}";
    }
}
