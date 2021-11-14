/// <reference types="cypress" />

describe('Automating forms', ()=> {
  let commonSelectors = '';
  let formData = '';

  before(() => {
    cy.fixture("form-data").then((data)=> {
      formData = data;
    });
    cy.fixture("common-locators").then((data) => {
      commonSelectors = data;
    });
    cy.visit("localhost:4200");
  })

  it("Entering form values using fixture", ()=> {
    /* Navigating to quiz */
    cy.get(commonSelectors.navigationSelectors.quizLink).click();
    /* Entering userName value */
    cy.get(commonSelectors.quizSelectors.userNameInput).type(formData.name);
    /* Selecting gender */
    cy.get(commonSelectors.quizSelectors.userGenderInput).select(formData.gender);

    /* Getting generated code */
    cy.get("#verificationCode").next().get("p").then((element)=> {
      const validationCode = element.text().trim();
      cy.get(commonSelectors.quizSelectors.verificationCodeInput).type(validationCode);
    });

    /* Clicking on submit button */
    cy.get(".col-12 > form button[type='submit']").click();

    cy.get("#questionaryModalLabel").should('have.text',' Automated Robot Quick quiz');
  });
});