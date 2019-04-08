package com.universign.universigncs.parallel.web.rest;

import com.universign.universigncs.parallel.ParallelSignatureApp;

import com.universign.universigncs.parallel.domain.MetaTransaction;
import com.universign.universigncs.parallel.repository.MetaTransactionRepository;
import com.universign.universigncs.parallel.service.MetaTransactionService;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import java.util.List;


import static com.universign.universigncs.parallel.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.universign.universigncs.parallel.domain.enumeration.MetaTansactonsStatus;
/**
 * Test class for the MetaTransactionResource REST controller.
 *
 * @see MetaTransactionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ParallelSignatureApp.class)
public class MetaTransactionResourceIntTest {

    private static final MetaTansactonsStatus DEFAULT_STATUS = MetaTansactonsStatus.NONE;
    private static final MetaTansactonsStatus UPDATED_STATUS = MetaTansactonsStatus.CREATE;

    private static final String DEFAULT_PROFILE = "AAAAAAAAAA";
    private static final String UPDATED_PROFILE = "BBBBBBBBBB";

    private static final String DEFAULT_OWNER = "AAAAAAAAAA";
    private static final String UPDATED_OWNER = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DISPLAY_DATE_TIME_ON_SIGNATURE_FIELD = false;
    private static final Boolean UPDATED_DISPLAY_DATE_TIME_ON_SIGNATURE_FIELD = true;

    private static final Boolean DEFAULT_GEOMETRE_SIGNATURE_REQUIRED = false;
    private static final Boolean UPDATED_GEOMETRE_SIGNATURE_REQUIRED = true;

    private static final byte[] DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD_CONTENT_TYPE = "image/png";

    private static final Integer DEFAULT_METATRANSACTION_DURATION = 1;
    private static final Integer UPDATED_METATRANSACTION_DURATION = 2;

    @Autowired
    private MetaTransactionRepository metaTransactionRepository;

    @Autowired
    private MetaTransactionService metaTransactionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restMetaTransactionMockMvc;

    private MetaTransaction metaTransaction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MetaTransactionResource metaTransactionResource = new MetaTransactionResource(metaTransactionService);
        this.restMetaTransactionMockMvc = MockMvcBuilders.standaloneSetup(metaTransactionResource)
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
    public static MetaTransaction createEntity() {
        MetaTransaction metaTransaction = new MetaTransaction()
            .status(DEFAULT_STATUS)
            .profile(DEFAULT_PROFILE)
            .owner(DEFAULT_OWNER)
            .name(DEFAULT_NAME)
            .displayDateTimeOnSignatureField(DEFAULT_DISPLAY_DATE_TIME_ON_SIGNATURE_FIELD)
            .geometreSignatureRequired(DEFAULT_GEOMETRE_SIGNATURE_REQUIRED)
            .logoForGeometreSignatureField(DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD)
            .logoForGeometreSignatureFieldContentType(DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD_CONTENT_TYPE)
            .metatransactionDuration(DEFAULT_METATRANSACTION_DURATION);
        return metaTransaction;
    }

    @Before
    public void initTest() {
        metaTransactionRepository.deleteAll();
        metaTransaction = createEntity();
    }

    @Test
    public void createMetaTransaction() throws Exception {
        int databaseSizeBeforeCreate = metaTransactionRepository.findAll().size();

        // Create the MetaTransaction
        restMetaTransactionMockMvc.perform(post("/api/meta-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metaTransaction)))
            .andExpect(status().isCreated());

        // Validate the MetaTransaction in the database
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        MetaTransaction testMetaTransaction = metaTransactionList.get(metaTransactionList.size() - 1);
        assertThat(testMetaTransaction.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testMetaTransaction.getProfile()).isEqualTo(DEFAULT_PROFILE);
        assertThat(testMetaTransaction.getOwner()).isEqualTo(DEFAULT_OWNER);
        assertThat(testMetaTransaction.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMetaTransaction.isDisplayDateTimeOnSignatureField()).isEqualTo(DEFAULT_DISPLAY_DATE_TIME_ON_SIGNATURE_FIELD);
        assertThat(testMetaTransaction.isGeometreSignatureRequired()).isEqualTo(DEFAULT_GEOMETRE_SIGNATURE_REQUIRED);
        assertThat(testMetaTransaction.getLogoForGeometreSignatureField()).isEqualTo(DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD);
        assertThat(testMetaTransaction.getLogoForGeometreSignatureFieldContentType()).isEqualTo(DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD_CONTENT_TYPE);
        assertThat(testMetaTransaction.getMetatransactionDuration()).isEqualTo(DEFAULT_METATRANSACTION_DURATION);
    }

    @Test
    public void createMetaTransactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metaTransactionRepository.findAll().size();

        // Create the MetaTransaction with an existing ID
        metaTransaction.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetaTransactionMockMvc.perform(post("/api/meta-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metaTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the MetaTransaction in the database
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkOwnerIsRequired() throws Exception {
        int databaseSizeBeforeTest = metaTransactionRepository.findAll().size();
        // set the field null
        metaTransaction.setOwner(null);

        // Create the MetaTransaction, which fails.

        restMetaTransactionMockMvc.perform(post("/api/meta-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metaTransaction)))
            .andExpect(status().isBadRequest());

        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllMetaTransactions() throws Exception {
        // Initialize the database
        metaTransactionRepository.save(metaTransaction);

        // Get all the metaTransactionList
        restMetaTransactionMockMvc.perform(get("/api/meta-transactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metaTransaction.getId())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].profile").value(hasItem(DEFAULT_PROFILE.toString())))
            .andExpect(jsonPath("$.[*].owner").value(hasItem(DEFAULT_OWNER.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].displayDateTimeOnSignatureField").value(hasItem(DEFAULT_DISPLAY_DATE_TIME_ON_SIGNATURE_FIELD.booleanValue())))
            .andExpect(jsonPath("$.[*].geometreSignatureRequired").value(hasItem(DEFAULT_GEOMETRE_SIGNATURE_REQUIRED.booleanValue())))
            .andExpect(jsonPath("$.[*].logoForGeometreSignatureFieldContentType").value(hasItem(DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logoForGeometreSignatureField").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD))))
            .andExpect(jsonPath("$.[*].metatransactionDuration").value(hasItem(DEFAULT_METATRANSACTION_DURATION)));
    }
    
    @Test
    public void getMetaTransaction() throws Exception {
        // Initialize the database
        metaTransactionRepository.save(metaTransaction);

        // Get the metaTransaction
        restMetaTransactionMockMvc.perform(get("/api/meta-transactions/{id}", metaTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(metaTransaction.getId()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.profile").value(DEFAULT_PROFILE.toString()))
            .andExpect(jsonPath("$.owner").value(DEFAULT_OWNER.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.displayDateTimeOnSignatureField").value(DEFAULT_DISPLAY_DATE_TIME_ON_SIGNATURE_FIELD.booleanValue()))
            .andExpect(jsonPath("$.geometreSignatureRequired").value(DEFAULT_GEOMETRE_SIGNATURE_REQUIRED.booleanValue()))
            .andExpect(jsonPath("$.logoForGeometreSignatureFieldContentType").value(DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD_CONTENT_TYPE))
            .andExpect(jsonPath("$.logoForGeometreSignatureField").value(Base64Utils.encodeToString(DEFAULT_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD)))
            .andExpect(jsonPath("$.metatransactionDuration").value(DEFAULT_METATRANSACTION_DURATION));
    }

    @Test
    public void getNonExistingMetaTransaction() throws Exception {
        // Get the metaTransaction
        restMetaTransactionMockMvc.perform(get("/api/meta-transactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMetaTransaction() throws Exception {
        // Initialize the database
        metaTransactionService.save(metaTransaction);

        int databaseSizeBeforeUpdate = metaTransactionRepository.findAll().size();

        // Update the metaTransaction
        MetaTransaction updatedMetaTransaction = metaTransactionRepository.findById(metaTransaction.getId()).get();
        updatedMetaTransaction
            .status(UPDATED_STATUS)
            .profile(UPDATED_PROFILE)
            .owner(UPDATED_OWNER)
            .name(UPDATED_NAME)
            .displayDateTimeOnSignatureField(UPDATED_DISPLAY_DATE_TIME_ON_SIGNATURE_FIELD)
            .geometreSignatureRequired(UPDATED_GEOMETRE_SIGNATURE_REQUIRED)
            .logoForGeometreSignatureField(UPDATED_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD)
            .logoForGeometreSignatureFieldContentType(UPDATED_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD_CONTENT_TYPE)
            .metatransactionDuration(UPDATED_METATRANSACTION_DURATION);

        restMetaTransactionMockMvc.perform(put("/api/meta-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetaTransaction)))
            .andExpect(status().isOk());

        // Validate the MetaTransaction in the database
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeUpdate);
        MetaTransaction testMetaTransaction = metaTransactionList.get(metaTransactionList.size() - 1);
        assertThat(testMetaTransaction.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testMetaTransaction.getProfile()).isEqualTo(UPDATED_PROFILE);
        assertThat(testMetaTransaction.getOwner()).isEqualTo(UPDATED_OWNER);
        assertThat(testMetaTransaction.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMetaTransaction.isDisplayDateTimeOnSignatureField()).isEqualTo(UPDATED_DISPLAY_DATE_TIME_ON_SIGNATURE_FIELD);
        assertThat(testMetaTransaction.isGeometreSignatureRequired()).isEqualTo(UPDATED_GEOMETRE_SIGNATURE_REQUIRED);
        assertThat(testMetaTransaction.getLogoForGeometreSignatureField()).isEqualTo(UPDATED_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD);
        assertThat(testMetaTransaction.getLogoForGeometreSignatureFieldContentType()).isEqualTo(UPDATED_LOGO_FOR_GEOMETRE_SIGNATURE_FIELD_CONTENT_TYPE);
        assertThat(testMetaTransaction.getMetatransactionDuration()).isEqualTo(UPDATED_METATRANSACTION_DURATION);
    }

    @Test
    public void updateNonExistingMetaTransaction() throws Exception {
        int databaseSizeBeforeUpdate = metaTransactionRepository.findAll().size();

        // Create the MetaTransaction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetaTransactionMockMvc.perform(put("/api/meta-transactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metaTransaction)))
            .andExpect(status().isBadRequest());

        // Validate the MetaTransaction in the database
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMetaTransaction() throws Exception {
        // Initialize the database
        metaTransactionService.save(metaTransaction);

        int databaseSizeBeforeDelete = metaTransactionRepository.findAll().size();

        // Delete the metaTransaction
        restMetaTransactionMockMvc.perform(delete("/api/meta-transactions/{id}", metaTransaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MetaTransaction> metaTransactionList = metaTransactionRepository.findAll();
        assertThat(metaTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MetaTransaction.class);
        MetaTransaction metaTransaction1 = new MetaTransaction();
        metaTransaction1.setId("id1");
        MetaTransaction metaTransaction2 = new MetaTransaction();
        metaTransaction2.setId(metaTransaction1.getId());
        assertThat(metaTransaction1).isEqualTo(metaTransaction2);
        metaTransaction2.setId("id2");
        assertThat(metaTransaction1).isNotEqualTo(metaTransaction2);
        metaTransaction1.setId(null);
        assertThat(metaTransaction1).isNotEqualTo(metaTransaction2);
    }
}
