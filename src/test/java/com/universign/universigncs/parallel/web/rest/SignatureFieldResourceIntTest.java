package com.universign.universigncs.parallel.web.rest;

import com.universign.universigncs.parallel.ParallelSignatureApp;

import com.universign.universigncs.parallel.domain.SignatureField;
import com.universign.universigncs.parallel.repository.SignatureFieldRepository;
import com.universign.universigncs.parallel.service.SignatureFieldService;
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

/**
 * Test class for the SignatureFieldResource REST controller.
 *
 * @see SignatureFieldResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ParallelSignatureApp.class)
public class SignatureFieldResourceIntTest {

    private static final Integer DEFAULT_PAGE = 1;
    private static final Integer UPDATED_PAGE = 2;

    private static final Integer DEFAULT_X = 1;
    private static final Integer UPDATED_X = 2;

    private static final Integer DEFAULT_Y = 1;
    private static final Integer UPDATED_Y = 2;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Long DEFAULT_SIGNER_ID = 1L;
    private static final Long UPDATED_SIGNER_ID = 2L;

    @Autowired
    private SignatureFieldRepository signatureFieldRepository;

    @Autowired
    private SignatureFieldService signatureFieldService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSignatureFieldMockMvc;

    private SignatureField signatureField;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SignatureFieldResource signatureFieldResource = new SignatureFieldResource(signatureFieldService);
        this.restSignatureFieldMockMvc = MockMvcBuilders.standaloneSetup(signatureFieldResource)
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
    public static SignatureField createEntity() {
        SignatureField signatureField = new SignatureField()
            .page(DEFAULT_PAGE)
            .x(DEFAULT_X)
            .y(DEFAULT_Y)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .signerId(DEFAULT_SIGNER_ID);
        return signatureField;
    }

    @Before
    public void initTest() {
        signatureFieldRepository.deleteAll();
        signatureField = createEntity();
    }

    @Test
    public void createSignatureField() throws Exception {
        int databaseSizeBeforeCreate = signatureFieldRepository.findAll().size();

        // Create the SignatureField
        restSignatureFieldMockMvc.perform(post("/api/signature-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureField)))
            .andExpect(status().isCreated());

        // Validate the SignatureField in the database
        List<SignatureField> signatureFieldList = signatureFieldRepository.findAll();
        assertThat(signatureFieldList).hasSize(databaseSizeBeforeCreate + 1);
        SignatureField testSignatureField = signatureFieldList.get(signatureFieldList.size() - 1);
        assertThat(testSignatureField.getPage()).isEqualTo(DEFAULT_PAGE);
        assertThat(testSignatureField.getX()).isEqualTo(DEFAULT_X);
        assertThat(testSignatureField.getY()).isEqualTo(DEFAULT_Y);
        assertThat(testSignatureField.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testSignatureField.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testSignatureField.getSignerId()).isEqualTo(DEFAULT_SIGNER_ID);
    }

    @Test
    public void createSignatureFieldWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = signatureFieldRepository.findAll().size();

        // Create the SignatureField with an existing ID
        signatureField.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSignatureFieldMockMvc.perform(post("/api/signature-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureField)))
            .andExpect(status().isBadRequest());

        // Validate the SignatureField in the database
        List<SignatureField> signatureFieldList = signatureFieldRepository.findAll();
        assertThat(signatureFieldList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkPageIsRequired() throws Exception {
        int databaseSizeBeforeTest = signatureFieldRepository.findAll().size();
        // set the field null
        signatureField.setPage(null);

        // Create the SignatureField, which fails.

        restSignatureFieldMockMvc.perform(post("/api/signature-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureField)))
            .andExpect(status().isBadRequest());

        List<SignatureField> signatureFieldList = signatureFieldRepository.findAll();
        assertThat(signatureFieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkXIsRequired() throws Exception {
        int databaseSizeBeforeTest = signatureFieldRepository.findAll().size();
        // set the field null
        signatureField.setX(null);

        // Create the SignatureField, which fails.

        restSignatureFieldMockMvc.perform(post("/api/signature-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureField)))
            .andExpect(status().isBadRequest());

        List<SignatureField> signatureFieldList = signatureFieldRepository.findAll();
        assertThat(signatureFieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkYIsRequired() throws Exception {
        int databaseSizeBeforeTest = signatureFieldRepository.findAll().size();
        // set the field null
        signatureField.setY(null);

        // Create the SignatureField, which fails.

        restSignatureFieldMockMvc.perform(post("/api/signature-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureField)))
            .andExpect(status().isBadRequest());

        List<SignatureField> signatureFieldList = signatureFieldRepository.findAll();
        assertThat(signatureFieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkSignerIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = signatureFieldRepository.findAll().size();
        // set the field null
        signatureField.setSignerId(null);

        // Create the SignatureField, which fails.

        restSignatureFieldMockMvc.perform(post("/api/signature-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureField)))
            .andExpect(status().isBadRequest());

        List<SignatureField> signatureFieldList = signatureFieldRepository.findAll();
        assertThat(signatureFieldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllSignatureFields() throws Exception {
        // Initialize the database
        signatureFieldRepository.save(signatureField);

        // Get all the signatureFieldList
        restSignatureFieldMockMvc.perform(get("/api/signature-fields?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(signatureField.getId())))
            .andExpect(jsonPath("$.[*].page").value(hasItem(DEFAULT_PAGE)))
            .andExpect(jsonPath("$.[*].x").value(hasItem(DEFAULT_X)))
            .andExpect(jsonPath("$.[*].y").value(hasItem(DEFAULT_Y)))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].signerId").value(hasItem(DEFAULT_SIGNER_ID.intValue())));
    }
    
    @Test
    public void getSignatureField() throws Exception {
        // Initialize the database
        signatureFieldRepository.save(signatureField);

        // Get the signatureField
        restSignatureFieldMockMvc.perform(get("/api/signature-fields/{id}", signatureField.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(signatureField.getId()))
            .andExpect(jsonPath("$.page").value(DEFAULT_PAGE))
            .andExpect(jsonPath("$.x").value(DEFAULT_X))
            .andExpect(jsonPath("$.y").value(DEFAULT_Y))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.signerId").value(DEFAULT_SIGNER_ID.intValue()));
    }

    @Test
    public void getNonExistingSignatureField() throws Exception {
        // Get the signatureField
        restSignatureFieldMockMvc.perform(get("/api/signature-fields/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSignatureField() throws Exception {
        // Initialize the database
        signatureFieldService.save(signatureField);

        int databaseSizeBeforeUpdate = signatureFieldRepository.findAll().size();

        // Update the signatureField
        SignatureField updatedSignatureField = signatureFieldRepository.findById(signatureField.getId()).get();
        updatedSignatureField
            .page(UPDATED_PAGE)
            .x(UPDATED_X)
            .y(UPDATED_Y)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .signerId(UPDATED_SIGNER_ID);

        restSignatureFieldMockMvc.perform(put("/api/signature-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSignatureField)))
            .andExpect(status().isOk());

        // Validate the SignatureField in the database
        List<SignatureField> signatureFieldList = signatureFieldRepository.findAll();
        assertThat(signatureFieldList).hasSize(databaseSizeBeforeUpdate);
        SignatureField testSignatureField = signatureFieldList.get(signatureFieldList.size() - 1);
        assertThat(testSignatureField.getPage()).isEqualTo(UPDATED_PAGE);
        assertThat(testSignatureField.getX()).isEqualTo(UPDATED_X);
        assertThat(testSignatureField.getY()).isEqualTo(UPDATED_Y);
        assertThat(testSignatureField.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testSignatureField.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testSignatureField.getSignerId()).isEqualTo(UPDATED_SIGNER_ID);
    }

    @Test
    public void updateNonExistingSignatureField() throws Exception {
        int databaseSizeBeforeUpdate = signatureFieldRepository.findAll().size();

        // Create the SignatureField

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSignatureFieldMockMvc.perform(put("/api/signature-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signatureField)))
            .andExpect(status().isBadRequest());

        // Validate the SignatureField in the database
        List<SignatureField> signatureFieldList = signatureFieldRepository.findAll();
        assertThat(signatureFieldList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSignatureField() throws Exception {
        // Initialize the database
        signatureFieldService.save(signatureField);

        int databaseSizeBeforeDelete = signatureFieldRepository.findAll().size();

        // Delete the signatureField
        restSignatureFieldMockMvc.perform(delete("/api/signature-fields/{id}", signatureField.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SignatureField> signatureFieldList = signatureFieldRepository.findAll();
        assertThat(signatureFieldList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SignatureField.class);
        SignatureField signatureField1 = new SignatureField();
        signatureField1.setId("id1");
        SignatureField signatureField2 = new SignatureField();
        signatureField2.setId(signatureField1.getId());
        assertThat(signatureField1).isEqualTo(signatureField2);
        signatureField2.setId("id2");
        assertThat(signatureField1).isNotEqualTo(signatureField2);
        signatureField1.setId(null);
        assertThat(signatureField1).isNotEqualTo(signatureField2);
    }
}
