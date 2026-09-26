/**
 * Page Object - Recruitment Page
 * https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates
 */

class RecruitmentPage {
  // ---------- Locators ----------
  elements = {
    candidateNameInput: () => cy.get(".oxd-input-group input").first(),
    selectInputs: () => cy.get(".oxd-select-text"),
    dropdownOption: (text) =>
      cy.get(".oxd-select-dropdown .oxd-select-option").contains(text),
    searchButton: () => cy.contains("button", "Search"),
    resetButton: () => cy.contains("button", "Reset"),
    addButton: () => cy.contains("button", "Add"),
    tableRows: () => cy.get(".oxd-table-card"),
    invalidFieldMessage: () =>
      cy.contains(".oxd-input-group__message", "Invalid"),
    noRecordsFound: () => cy.contains(".oxd-text", "No Records Found"),
    pageHeader: () => cy.get(".oxd-topbar-header-breadcrumb h6"),

    // Add Candidate form
    firstNameInput: () => cy.get('input[name="firstName"]'),
    lastNameInput: () => cy.get('input[name="lastName"]'),
    emailInput: () =>
      cy.contains("label", "Email").parents(".oxd-input-group").find("input"),
    saveButton: () => cy.contains("button", "Save"),
    requiredFieldError: () => cy.get(".oxd-input-group__message"),
    successToast: () => cy.get(".oxd-toast-content"),
  };

  // ---------- Actions ----------
  visit() {
    cy.visit("/web/index.php/recruitment/viewCandidates");
    return this;
  }

  searchByCandidateName(typeName, clickMatchText) {
    this.elements.candidateNameInput().clear().type(typeName);
    cy.wait(500);
    cy.get(".oxd-autocomplete-option")
      .contains(clickMatchText)
      .click({ force: true });
    cy.wait(500);
    this.elements.searchButton().click();
    return this;
  }

  selectVacancy(vacancy) {
    this.elements.selectInputs().eq(0).click();
    this.elements.dropdownOption(vacancy).click();
    return this;
  }
  selectJobTitle(jobTitle) {
    this.elements.selectInputs().eq(0).click(); // index 0 = Job Title
    this.elements.dropdownOption(jobTitle).click();
    return this;
  }

  selectStatus(status) {
    this.elements.selectInputs().eq(3).click(); // index 3 = Status, BUKAN .last()
    this.elements.dropdownOption(status).click();
    return this;
  }

  clickSearch() {
    this.elements.searchButton().click();
    return this;
  }

  clickReset() {
    this.elements.resetButton().click();
    return this;
  }

  clickAdd() {
    this.elements.addButton().click();
    return this;
  }

  fillCandidateForm(candidate) {
    this.elements.firstNameInput().clear().type(candidate.firstName);
    this.elements.lastNameInput().clear().type(candidate.lastName);
    this.elements.emailInput().clear().type(candidate.email);
    return this;
  }

  clickSave() {
    this.elements.saveButton().click();
    return this;
  }

  // ---------- Assertions ----------
  assertResultsContainName(partialName) {
    this.elements.tableRows().first().should("contain.text", partialName);
    return this;
  }

  assertResultCountAtLeast(count) {
    this.elements.tableRows().should("have.length.at.least", count);
    return this;
  }

  assertNoRecordsFound(message) {
    this.elements
      .noRecordsFound()
      .should("be.visible")
      .and("contain.text", message);
    return this;
  }

  assertFiltersReset() {
    this.elements.candidateNameInput().should("have.value", "");
    return this;
  }

  assertPageHeader(title) {
    this.elements.pageHeader().should("be.visible").and("contain.text", title);
    return this;
  }

  assertAddCandidateSuccess(message) {
    this.elements
      .successToast()
      .should("be.visible")
      .and("contain.text", message);
    return this;
  }
  assertInvalidCandidateMessage() {
    this.elements.invalidFieldMessage().should("be.visible");
    return this;
  }

  assertRequiredFieldVisible() {
    this.elements.requiredFieldError().should("have.length.greaterThan", 0);
    return this;
  }
}

export default new RecruitmentPage();
