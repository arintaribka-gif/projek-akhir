/**
 * Page Object - Directory Page
 * https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory
 */
import {
  interceptDirectoryGrid,
  interceptDirectorySuggest,
  interceptJobTitleList,
  interceptLocationList,
} from "./directoryIntercepts";

class DirectoryPage {
  // ---------- Locators ----------
  elements = {
    employeeNameInput: () => cy.get(".oxd-autocomplete-wrapper input").first(),
    autocompleteOption: () => cy.get(".oxd-autocomplete-option"),
    selectInputs: () => cy.get(".oxd-select-text"),
    dropdownOption: (text) =>
      cy.get(".oxd-select-dropdown .oxd-select-option").contains(text),
    searchButton: () => cy.contains("button", "Search"),
    resetButton: () => cy.contains("button", "Reset"),
    invalidFieldMessage: () =>
      cy.contains(".oxd-input-group__message", "Invalid"),
    directoryCards: () => cy.get(".orangehrm-directory-card"),
    cardEmployeeName: () => cy.get("p.orangehrm-directory-card-header"),
    noRecordsFound: () => cy.contains(".oxd-text", "No Records Found"),
    pageHeader: () => cy.get(".oxd-topbar-header-breadcrumb h6"),
  };

  // ---------- Setup ----------
  setupIntercepts() {
    interceptDirectoryGrid();
    interceptDirectorySuggest();
    interceptJobTitleList();
    interceptLocationList();
    return this;
  }

  // ---------- Actions ----------
  visit() {
    cy.visit("/web/index.php/directory/viewDirectory");
    return this;
  }

  searchByEmployeeName(typeName, clickMatchText) {
    this.elements.employeeNameInput().clear().type(typeName);
    cy.wait(500);
    cy.get(".oxd-autocomplete-option")
      .contains(clickMatchText)
      .click({ force: true });
    cy.wait(500);
    this.elements.searchButton().click();
    return this;
  }

  searchByEmployeeNameNotFound(name) {
    this.elements.employeeNameInput().clear().type(name);
    cy.wait(500);
    this.elements.searchButton().click();
    return this;
  }

  selectJobTitle(jobTitle) {
    this.elements.selectInputs().eq(0).click();
    this.elements.dropdownOption(jobTitle).click();
    return this;
  }

  selectLocation(location) {
    this.elements.selectInputs().eq(1).click();
    this.elements.dropdownOption(location).click();
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

  // ---------- Assertions ----------
  assertResultsContainName(partialName) {
    this.elements.cardEmployeeName().should(
      ($els) => {
        expect($els.length).to.be.greaterThan(0);
        expect($els.first().text()).to.include(partialName);
      },
      { timeout: 15000 },
    );
    return this;
  }

  assertResultCountAtLeast(count) {
    this.elements.directoryCards().should("have.length.at.least", count);
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
    this.elements.directoryCards().should("have.length", 14);
    return this;
  }

  assertPageHeader(title) {
    this.elements.pageHeader().should("be.visible").and("contain.text", title);
    return this;
  }

  assertInvalidEmployeeMessage() {
    this.elements.invalidFieldMessage().should("be.visible");
    return this;
  }

  assertSearchControlsVisible() {
    this.elements.employeeNameInput().should("be.visible");
    this.elements.searchButton().should("be.visible");
    this.elements.resetButton().should("be.visible");
    return this;
  }
}

export default new DirectoryPage();
