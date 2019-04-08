package com.universign.universigncs.parallel.web.rest;

import com.universign.universigncs.parallel.ParallelSignatureApp;

import com.universign.universigncs.parallel.domain.Signer;
import com.universign.universigncs.parallel.repository.SignerRepository;
import com.universign.universigncs.parallel.service.SignerService;
import com.universign.universigncs.parallel.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.universign.universigncs.parallel.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.universign.universigncs.parallel.domain.enumeration.SignerStatus;
import com.universign.universigncs.parallel.domain.enumeration.CertificateType;
/**
 * Test class for the SignerResource REST controller.
 *
 * @see SignerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ParallelSignatureApp.class)
public class SignerResourceIntTest {

    private static final SignerStatus DEFAULT_STATUS = SignerStatus.NONE;
    private static final SignerStatus UPDATED_STATUS = SignerStatus.CREATE;

    private static final String DEFAULT_FIRSTNAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRSTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_LASTNAME = "AAAAAAAAAA";
    private static final String UPDATED_LASTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_ORGANIZATION = "AAAAAAAAAA";
    private static final String UPDATED_ORGANIZATION = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUM = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SUCCESS_URL = "AAAAAAAAAA";
    private static final String UPDATED_SUCCESS_URL = "BBBBBBBBBB";

    private static final String DEFAULT_CANCEL_URL = "AAAAAAAAAA";
    private static final String UPDATED_CANCEL_URL = "BBBBBBBBBB";

    private static final String DEFAULT_FAIL_URL = "AAAAAAAAAA";
    private static final String UPDATED_FAIL_URL = "BBBBBBBBBB";

    private static final String DEFAULT_CALL_BACK_URL = "AAAAAAAAAA";
    private static final String UPDATED_CALL_BACK_URL = "BBBBBBBBBB";

    private static final CertificateType DEFAULT_CERTIFICATE_TYPE = CertificateType.Simple;
    private static final CertificateType UPDATED_CERTIFICATE_TYPE = CertificateType.Certified;

    private static final Integer DEFAULT_RELAUNCH_FREQUENCY = 1;
    private static final Integer UPDATED_RELAUNCH_FREQUENCY = 2;

    private static final LocalDate DEFAULT_LAST_RELAUNCH = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_RELAUNCH = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_SEND_SIGNED_DOCUMENTS_BY_EMAIL = false;
    private static final Boolean UPDATED_SEND_SIGNED_DOCUMENTS_BY_EMAIL = true;

    private static final String DEFAULT_TEXT_FOR_INVITATION_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FOR_INVITATION_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_FOR_RELAUNCH_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FOR_RELAUNCH_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_FOR_SIGNED_DOCUMENTS_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_FOR_SIGNED_DOCUMENTS_EMAIL = "BBBBBBBBBB";

    @Autowired
    private SignerRepository signerRepository;

    @Autowired
    private SignerService signerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSignerMockMvc;

    private Signer signer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SignerResource signerResource = new SignerResource(signerService);
        this.restSignerMockMvc = MockMvcBuilders.standaloneSetup(signerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Signer createEntity() {
        Signer signer = new Signer()
            .status(DEFAULT_STATUS)
            .firstname(DEFAULT_FIRSTNAME)
            .lastname(DEFAULT_LASTNAME)
            .organization(DEFAULT_ORGANIZATION)
            .emailAddress(DEFAULT_EMAIL_ADDRESS)
            .phoneNum(DEFAULT_PHONE_NUM)
            .birthDate(DEFAULT_BIRTH_DATE)
            .successURL(DEFAULT_SUCCESS_URL)
            .cancelURL(DEFAULT_CANCEL_URL)
            .failURL(DEFAULT_FAIL_URL)
            .callBackUrl(DEFAULT_CALL_BACK_URL)
            .certificateType(DEFAULT_CERTIFICATE_TYPE)
            .relaunchFrequency(DEFAULT_RELAUNCH_FREQUENCY)
            .lastRelaunch(DEFAULT_LAST_RELAUNCH)
            .sendSignedDocumentsByEmail(DEFAULT_SEND_SIGNED_DOCUMENTS_BY_EMAIL)
            .textForInvitationEmail(DEFAULT_TEXT_FOR_INVITATION_EMAIL)
            .textForRelaunchEmail(DEFAULT_TEXT_FOR_RELAUNCH_EMAIL)
            .textForSignedDocumentsEmail(DEFAULT_TEXT_FOR_SIGNED_DOCUMENTS_EMAIL);
        return signer;
    }

    @Before
    public void initTest() {
        signerRepository.deleteAll();
        signer = createEntity();
    }

    @Test
    public void createSigner() throws Exception {
        int databaseSizeBeforeCreate = signerRepository.findAll().size();

        // Create the Signer
        restSignerMockMvc.perform(post("/api/signers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signer)))
            .andExpect(status().isCreated());

        // Validate the Signer in the database
        List<Signer> signerList = signerRepository.findAll();
        assertThat(signerList).hasSize(databaseSizeBeforeCreate + 1);
        Signer testSigner = signerList.get(signerList.size() - 1);
        assertThat(testSigner.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSigner.getFirstname()).isEqualTo(DEFAULT_FIRSTNAME);
        assertThat(testSigner.getLastname()).isEqualTo(DEFAULT_LASTNAME);
        assertThat(testSigner.getOrganization()).isEqualTo(DEFAULT_ORGANIZATION);
        assertThat(testSigner.getEmailAddress()).isEqualTo(DEFAULT_EMAIL_ADDRESS);
        assertThat(testSigner.getPhoneNum()).isEqualTo(DEFAULT_PHONE_NUM);
        assertThat(testSigner.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testSigner.getSuccessURL()).isEqualTo(DEFAULT_SUCCESS_URL);
        assertThat(testSigner.getCancelURL()).isEqualTo(DEFAULT_CANCEL_URL);
        assertThat(testSigner.getFailURL()).isEqualTo(DEFAULT_FAIL_URL);
        assertThat(testSigner.getCallBackUrl()).isEqualTo(DEFAULT_CALL_BACK_URL);
        assertThat(testSigner.getCertificateType()).isEqualTo(DEFAULT_CERTIFICATE_TYPE);
        assertThat(testSigner.getRelaunchFrequency()).isEqualTo(DEFAULT_RELAUNCH_FREQUENCY);
        assertThat(testSigner.getLastRelaunch()).isEqualTo(DEFAULT_LAST_RELAUNCH);
        assertThat(testSigner.isSendSignedDocumentsByEmail()).isEqualTo(DEFAULT_SEND_SIGNED_DOCUMENTS_BY_EMAIL);
        assertThat(testSigner.getTextForInvitationEmail()).isEqualTo(DEFAULT_TEXT_FOR_INVITATION_EMAIL);
        assertThat(testSigner.getTextForRelaunchEmail()).isEqualTo(DEFAULT_TEXT_FOR_RELAUNCH_EMAIL);
        assertThat(testSigner.getTextForSignedDocumentsEmail()).isEqualTo(DEFAULT_TEXT_FOR_SIGNED_DOCUMENTS_EMAIL);
    }

    @Test
    public void createSignerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = signerRepository.findAll().size();

        // Create the Signer with an existing ID
        signer.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSignerMockMvc.perform(post("/api/signers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signer)))
            .andExpect(status().isBadRequest());

        // Validate the Signer in the database
        List<Signer> signerList = signerRepository.findAll();
        assertThat(signerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkFirstnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = signerRepository.findAll().size();
        // set the field null
        signer.setFirstname(null);

        // Create the Signer, which fails.

        restSignerMockMvc.perform(post("/api/signers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signer)))
            .andExpect(status().isBadRequest());

        List<Signer> signerList = signerRepository.findAll();
        assertThat(signerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkLastnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = signerRepository.findAll().size();
        // set the field null
        signer.setLastname(null);

        // Create the Signer, which fails.

        restSignerMockMvc.perform(post("/api/signers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signer)))
            .andExpect(status().isBadRequest());

        List<Signer> signerList = signerRepository.findAll();
        assertThat(signerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEmailAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = signerRepository.findAll().size();
        // set the field null
        signer.setEmailAddress(null);

        // Create the Signer, which fails.

        restSignerMockMvc.perform(post("/api/signers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signer)))
            .andExpect(status().isBadRequest());

        List<Signer> signerList = signerRepository.findAll();
        assertThat(signerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllSigners() throws Exception {
        // Initialize the database
        signerRepository.save(signer);

        // Get all the signerList
        restSignerMockMvc.perform(get("/api/signers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(signer.getId())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].firstname").value(hasItem(DEFAULT_FIRSTNAME.toString())))
            .andExpect(jsonPath("$.[*].lastname").value(hasItem(DEFAULT_LASTNAME.toString())))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION.toString())))
            .andExpect(jsonPath("$.[*].emailAddress").value(hasItem(DEFAULT_EMAIL_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].phoneNum").value(hasItem(DEFAULT_PHONE_NUM.toString())))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].successURL").value(hasItem(DEFAULT_SUCCESS_URL.toString())))
            .andExpect(jsonPath("$.[*].cancelURL").value(hasItem(DEFAULT_CANCEL_URL.toString())))
            .andExpect(jsonPath("$.[*].failURL").value(hasItem(DEFAULT_FAIL_URL.toString())))
            .andExpect(jsonPath("$.[*].callBackUrl").value(hasItem(DEFAULT_CALL_BACK_URL.toString())))
            .andExpect(jsonPath("$.[*].certificateType").value(hasItem(DEFAULT_CERTIFICATE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].relaunchFrequency").value(hasItem(DEFAULT_RELAUNCH_FREQUENCY)))
            .andExpect(jsonPath("$.[*].lastRelaunch").value(hasItem(DEFAULT_LAST_RELAUNCH.toString())))
            .andExpect(jsonPath("$.[*].sendSignedDocumentsByEmail").value(hasItem(DEFAULT_SEND_SIGNED_DOCUMENTS_BY_EMAIL.booleanValue())))
            .andExpect(jsonPath("$.[*].textForInvitationEmail").value(hasItem(DEFAULT_TEXT_FOR_INVITATION_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].textForRelaunchEmail").value(hasItem(DEFAULT_TEXT_FOR_RELAUNCH_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].textForSignedDocumentsEmail").value(hasItem(DEFAULT_TEXT_FOR_SIGNED_DOCUMENTS_EMAIL.toString())));
    }
    
    @Test
    public void getSigner() throws Exception {
        // Initialize the database
        signerRepository.save(signer);

        // Get the signer
        restSignerMockMvc.perform(get("/api/signers/{id}", signer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(signer.getId()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.firstname").value(DEFAULT_FIRSTNAME.toString()))
            .andExpect(jsonPath("$.lastname").value(DEFAULT_LASTNAME.toString()))
            .andExpect(jsonPath("$.organization").value(DEFAULT_ORGANIZATION.toString()))
            .andExpect(jsonPath("$.emailAddress").value(DEFAULT_EMAIL_ADDRESS.toString()))
            .andExpect(jsonPath("$.phoneNum").value(DEFAULT_PHONE_NUM.toString()))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.successURL").value(DEFAULT_SUCCESS_URL.toString()))
            .andExpect(jsonPath("$.cancelURL").value(DEFAULT_CANCEL_URL.toString()))
            .andExpect(jsonPath("$.failURL").value(DEFAULT_FAIL_URL.toString()))
            .andExpect(jsonPath("$.callBackUrl").value(DEFAULT_CALL_BACK_URL.toString()))
            .andExpect(jsonPath("$.certificateType").value(DEFAULT_CERTIFICATE_TYPE.toString()))
            .andExpect(jsonPath("$.relaunchFrequency").value(DEFAULT_RELAUNCH_FREQUENCY))
            .andExpect(jsonPath("$.lastRelaunch").value(DEFAULT_LAST_RELAUNCH.toString()))
            .andExpect(jsonPath("$.sendSignedDocumentsByEmail").value(DEFAULT_SEND_SIGNED_DOCUMENTS_BY_EMAIL.booleanValue()))
            .andExpect(jsonPath("$.textForInvitationEmail").value(DEFAULT_TEXT_FOR_INVITATION_EMAIL.toString()))
            .andExpect(jsonPath("$.textForRelaunchEmail").value(DEFAULT_TEXT_FOR_RELAUNCH_EMAIL.toString()))
            .andExpect(jsonPath("$.textForSignedDocumentsEmail").value(DEFAULT_TEXT_FOR_SIGNED_DOCUMENTS_EMAIL.toString()));
    }

    @Test
    public void getNonExistingSigner() throws Exception {
        // Get the signer
        restSignerMockMvc.perform(get("/api/signers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSigner() throws Exception {
        // Initialize the database
        signerService.save(signer);

        int databaseSizeBeforeUpdate = signerRepository.findAll().size();

        // Update the signer
        Signer updatedSigner = signerRepository.findById(signer.getId()).get();
        updatedSigner
            .status(UPDATED_STATUS)
            .firstname(UPDATED_FIRSTNAME)
            .lastname(UPDATED_LASTNAME)
            .organization(UPDATED_ORGANIZATION)
            .emailAddress(UPDATED_EMAIL_ADDRESS)
            .phoneNum(UPDATED_PHONE_NUM)
            .birthDate(UPDATED_BIRTH_DATE)
            .successURL(UPDATED_SUCCESS_URL)
            .cancelURL(UPDATED_CANCEL_URL)
            .failURL(UPDATED_FAIL_URL)
            .callBackUrl(UPDATED_CALL_BACK_URL)
            .certificateType(UPDATED_CERTIFICATE_TYPE)
            .relaunchFrequency(UPDATED_RELAUNCH_FREQUENCY)
            .lastRelaunch(UPDATED_LAST_RELAUNCH)
            .sendSignedDocumentsByEmail(UPDATED_SEND_SIGNED_DOCUMENTS_BY_EMAIL)
            .textForInvitationEmail(UPDATED_TEXT_FOR_INVITATION_EMAIL)
            .textForRelaunchEmail(UPDATED_TEXT_FOR_RELAUNCH_EMAIL)
            .textForSignedDocumentsEmail(UPDATED_TEXT_FOR_SIGNED_DOCUMENTS_EMAIL);

        restSignerMockMvc.perform(put("/api/signers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSigner)))
            .andExpect(status().isOk());

        // Validate the Signer in the database
        List<Signer> signerList = signerRepository.findAll();
        assertThat(signerList).hasSize(databaseSizeBeforeUpdate);
        Signer testSigner = signerList.get(signerList.size() - 1);
        assertThat(testSigner.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSigner.getFirstname()).isEqualTo(UPDATED_FIRSTNAME);
        assertThat(testSigner.getLastname()).isEqualTo(UPDATED_LASTNAME);
        assertThat(testSigner.getOrganization()).isEqualTo(UPDATED_ORGANIZATION);
        assertThat(testSigner.getEmailAddress()).isEqualTo(UPDATED_EMAIL_ADDRESS);
        assertThat(testSigner.getPhoneNum()).isEqualTo(UPDATED_PHONE_NUM);
        assertThat(testSigner.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testSigner.getSuccessURL()).isEqualTo(UPDATED_SUCCESS_URL);
        assertThat(testSigner.getCancelURL()).isEqualTo(UPDATED_CANCEL_URL);
        assertThat(testSigner.getFailURL()).isEqualTo(UPDATED_FAIL_URL);
        assertThat(testSigner.getCallBackUrl()).isEqualTo(UPDATED_CALL_BACK_URL);
        assertThat(testSigner.getCertificateType()).isEqualTo(UPDATED_CERTIFICATE_TYPE);
        assertThat(testSigner.getRelaunchFrequency()).isEqualTo(UPDATED_RELAUNCH_FREQUENCY);
        assertThat(testSigner.getLastRelaunch()).isEqualTo(UPDATED_LAST_RELAUNCH);
        assertThat(testSigner.isSendSignedDocumentsByEmail()).isEqualTo(UPDATED_SEND_SIGNED_DOCUMENTS_BY_EMAIL);
        assertThat(testSigner.getTextForInvitationEmail()).isEqualTo(UPDATED_TEXT_FOR_INVITATION_EMAIL);
        assertThat(testSigner.getTextForRelaunchEmail()).isEqualTo(UPDATED_TEXT_FOR_RELAUNCH_EMAIL);
        assertThat(testSigner.getTextForSignedDocumentsEmail()).isEqualTo(UPDATED_TEXT_FOR_SIGNED_DOCUMENTS_EMAIL);
    }

    @Test
    public void updateNonExistingSigner() throws Exception {
        int databaseSizeBeforeUpdate = signerRepository.findAll().size();

        // Create the Signer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSignerMockMvc.perform(put("/api/signers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signer)))
            .andExpect(status().isBadRequest());

        // Validate the Signer in the database
        List<Signer> signerList = signerRepository.findAll();
        assertThat(signerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSigner() throws Exception {
        // Initialize the database
        signerService.save(signer);

        int databaseSizeBeforeDelete = signerRepository.findAll().size();

        // Delete the signer
        restSignerMockMvc.perform(delete("/api/signers/{id}", signer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Signer> signerList = signerRepository.findAll();
        assertThat(signerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Signer.class);
        Signer signer1 = new Signer();
        signer1.setId("id1");
        Signer signer2 = new Signer();
        signer2.setId(signer1.getId());
        assertThat(signer1).isEqualTo(signer2);
        signer2.setId("id2");
        assertThat(signer1).isNotEqualTo(signer2);
        signer1.setId(null);
        assertThat(signer1).isNotEqualTo(signer2);
    }
}
