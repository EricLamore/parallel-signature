package com.universign.universigncs.parallel.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Document.
 */
@Document(collection = "jhi_document")
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("content")
    private byte[] content;

    @Field("content_content_type")
    private String contentContentType;

    @Field("file_name")
    private String fileName;

    @Field("title")
    private String title;

    @DBRef
    @Field("documents")
    private Set<SignatureField> documents = new HashSet<>();
    @DBRef
    @Field("metaTransaction")
    @JsonIgnoreProperties("documents")
    private MetaTransaction metaTransaction;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public byte[] getContent() {
        return content;
    }

    public Document content(byte[] content) {
        this.content = content;
        return this;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getContentContentType() {
        return contentContentType;
    }

    public Document contentContentType(String contentContentType) {
        this.contentContentType = contentContentType;
        return this;
    }

    public void setContentContentType(String contentContentType) {
        this.contentContentType = contentContentType;
    }

    public String getFileName() {
        return fileName;
    }

    public Document fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getTitle() {
        return title;
    }

    public Document title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<SignatureField> getDocuments() {
        return documents;
    }

    public Document documents(Set<SignatureField> signatureFields) {
        this.documents = signatureFields;
        return this;
    }

    public Document addDocuments(SignatureField signatureField) {
        this.documents.add(signatureField);
        signatureField.setMetaTransaction(this);
        return this;
    }

    public Document removeDocuments(SignatureField signatureField) {
        this.documents.remove(signatureField);
        signatureField.setMetaTransaction(null);
        return this;
    }

    public void setDocuments(Set<SignatureField> signatureFields) {
        this.documents = signatureFields;
    }

    public MetaTransaction getMetaTransaction() {
        return metaTransaction;
    }

    public Document metaTransaction(MetaTransaction metaTransaction) {
        this.metaTransaction = metaTransaction;
        return this;
    }

    public void setMetaTransaction(MetaTransaction metaTransaction) {
        this.metaTransaction = metaTransaction;
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
        Document document = (Document) o;
        if (document.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), document.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", contentContentType='" + getContentContentType() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
