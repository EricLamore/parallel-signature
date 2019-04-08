package com.universign.universigncs.parallel.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.universign.universigncs.parallel.domain.enumeration.SignerStatus;

import com.universign.universigncs.parallel.domain.enumeration.CertificateType;

/**
 * A Signer.
 */
@Document(collection = "signer")
public class Signer implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("status")
    private SignerStatus status;

    @NotNull
    @Field("firstname")
    private String firstname;

    @NotNull
    @Field("lastname")
    private String lastname;

    @Field("organization")
    private String organization;

    @NotNull
    @Field("email_address")
    private String emailAddress;

    @Field("phone_num")
    private String phoneNum;

    @Field("birth_date")
    private LocalDate birthDate;

    @Field("success_url")
    private String successURL;

    @Field("cancel_url")
    private String cancelURL;

    @Field("fail_url")
    private String failURL;

    @Field("call_back_url")
    private String callBackUrl;

    @Field("certificate_type")
    private CertificateType certificateType;

    @Field("relaunch_frequency")
    private Integer relaunchFrequency;

    @Field("last_relaunch")
    private LocalDate lastRelaunch;

    @Field("send_signed_documents_by_email")
    private Boolean sendSignedDocumentsByEmail;

    @Field("text_for_invitation_email")
    private String textForInvitationEmail;

    @Field("text_for_relaunch_email")
    private String textForRelaunchEmail;

    @Field("text_for_signed_documents_email")
    private String textForSignedDocumentsEmail;

    @DBRef
    @Field("transaction")
    private Transaction transaction;

    @DBRef
    @Field("metaTransaction")
    @JsonIgnoreProperties("signers")
    private MetaTransaction metaTransaction;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public SignerStatus getStatus() {
        return status;
    }

    public Signer status(SignerStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(SignerStatus status) {
        this.status = status;
    }

    public String getFirstname() {
        return firstname;
    }

    public Signer firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public Signer lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getOrganization() {
        return organization;
    }

    public Signer organization(String organization) {
        this.organization = organization;
        return this;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public Signer emailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
        return this;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public Signer phoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
        return this;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public Signer birthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getSuccessURL() {
        return successURL;
    }

    public Signer successURL(String successURL) {
        this.successURL = successURL;
        return this;
    }

    public void setSuccessURL(String successURL) {
        this.successURL = successURL;
    }

    public String getCancelURL() {
        return cancelURL;
    }

    public Signer cancelURL(String cancelURL) {
        this.cancelURL = cancelURL;
        return this;
    }

    public void setCancelURL(String cancelURL) {
        this.cancelURL = cancelURL;
    }

    public String getFailURL() {
        return failURL;
    }

    public Signer failURL(String failURL) {
        this.failURL = failURL;
        return this;
    }

    public void setFailURL(String failURL) {
        this.failURL = failURL;
    }

    public String getCallBackUrl() {
        return callBackUrl;
    }

    public Signer callBackUrl(String callBackUrl) {
        this.callBackUrl = callBackUrl;
        return this;
    }

    public void setCallBackUrl(String callBackUrl) {
        this.callBackUrl = callBackUrl;
    }

    public CertificateType getCertificateType() {
        return certificateType;
    }

    public Signer certificateType(CertificateType certificateType) {
        this.certificateType = certificateType;
        return this;
    }

    public void setCertificateType(CertificateType certificateType) {
        this.certificateType = certificateType;
    }

    public Integer getRelaunchFrequency() {
        return relaunchFrequency;
    }

    public Signer relaunchFrequency(Integer relaunchFrequency) {
        this.relaunchFrequency = relaunchFrequency;
        return this;
    }

    public void setRelaunchFrequency(Integer relaunchFrequency) {
        this.relaunchFrequency = relaunchFrequency;
    }

    public LocalDate getLastRelaunch() {
        return lastRelaunch;
    }

    public Signer lastRelaunch(LocalDate lastRelaunch) {
        this.lastRelaunch = lastRelaunch;
        return this;
    }

    public void setLastRelaunch(LocalDate lastRelaunch) {
        this.lastRelaunch = lastRelaunch;
    }

    public Boolean isSendSignedDocumentsByEmail() {
        return sendSignedDocumentsByEmail;
    }

    public Signer sendSignedDocumentsByEmail(Boolean sendSignedDocumentsByEmail) {
        this.sendSignedDocumentsByEmail = sendSignedDocumentsByEmail;
        return this;
    }

    public void setSendSignedDocumentsByEmail(Boolean sendSignedDocumentsByEmail) {
        this.sendSignedDocumentsByEmail = sendSignedDocumentsByEmail;
    }

    public String getTextForInvitationEmail() {
        return textForInvitationEmail;
    }

    public Signer textForInvitationEmail(String textForInvitationEmail) {
        this.textForInvitationEmail = textForInvitationEmail;
        return this;
    }

    public void setTextForInvitationEmail(String textForInvitationEmail) {
        this.textForInvitationEmail = textForInvitationEmail;
    }

    public String getTextForRelaunchEmail() {
        return textForRelaunchEmail;
    }

    public Signer textForRelaunchEmail(String textForRelaunchEmail) {
        this.textForRelaunchEmail = textForRelaunchEmail;
        return this;
    }

    public void setTextForRelaunchEmail(String textForRelaunchEmail) {
        this.textForRelaunchEmail = textForRelaunchEmail;
    }

    public String getTextForSignedDocumentsEmail() {
        return textForSignedDocumentsEmail;
    }

    public Signer textForSignedDocumentsEmail(String textForSignedDocumentsEmail) {
        this.textForSignedDocumentsEmail = textForSignedDocumentsEmail;
        return this;
    }

    public void setTextForSignedDocumentsEmail(String textForSignedDocumentsEmail) {
        this.textForSignedDocumentsEmail = textForSignedDocumentsEmail;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public Signer transaction(Transaction transaction) {
        this.transaction = transaction;
        return this;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public MetaTransaction getMetaTransaction() {
        return metaTransaction;
    }

    public Signer metaTransaction(MetaTransaction metaTransaction) {
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
        Signer signer = (Signer) o;
        if (signer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), signer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Signer{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", firstname='" + getFirstname() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", organization='" + getOrganization() + "'" +
            ", emailAddress='" + getEmailAddress() + "'" +
            ", phoneNum='" + getPhoneNum() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", successURL='" + getSuccessURL() + "'" +
            ", cancelURL='" + getCancelURL() + "'" +
            ", failURL='" + getFailURL() + "'" +
            ", callBackUrl='" + getCallBackUrl() + "'" +
            ", certificateType='" + getCertificateType() + "'" +
            ", relaunchFrequency=" + getRelaunchFrequency() +
            ", lastRelaunch='" + getLastRelaunch() + "'" +
            ", sendSignedDocumentsByEmail='" + isSendSignedDocumentsByEmail() + "'" +
            ", textForInvitationEmail='" + getTextForInvitationEmail() + "'" +
            ", textForRelaunchEmail='" + getTextForRelaunchEmail() + "'" +
            ", textForSignedDocumentsEmail='" + getTextForSignedDocumentsEmail() + "'" +
            "}";
    }
}
