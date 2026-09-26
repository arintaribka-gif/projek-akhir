/**
 * Feature: Recruitment
 * Format: POM (action, assertion, data, intercept)
 * Total: 8 test cases
 */

import RecruitmentPage from "../support/recruitmentPagePOM";
import {
  interceptCandidateSearch,
  interceptVacancyList,
  interceptAddCandidate,
} from "../support/recruitmentIntercepts";

describe("Feature: Recruitment", () => {
  let loginData;
  let recruitmentData; // ganti dari recruitData

  before(() => {
    cy.fixture("loginData").then((f) => (loginData = f));
    cy.fixture("recruitmentData").then((f) => (recruitmentData = f)); // ganti juga di sini
  });

  beforeEach(() => {
    interceptCandidateSearch();
    interceptVacancyList();
    interceptAddCandidate();

    cy.loginAsAdmin(loginData.validUser.username, loginData.validUser.password);

    RecruitmentPage.visit();
    cy.wait("@candidateSearch"); // consume request awal (unfiltered, limit=50&offset=0), WAJIB sebelum test body
    cy.wait("@vacancyList");
  });

  it("TC01 - Menampilkan halaman Recruitment dengan benar", () => {
    RecruitmentPage.assertPageHeader("Recruitment");
  });

  it("TC02 - Pencarian candidate berdasarkan nama valid", () => {
    RecruitmentPage.searchByCandidateName(
      recruitmentData.validCandidate.candidateName, // teks yang diketik, misal "John"
      recruitmentData.validCandidate.clickMatchText, // teks match di dropdown, misal "John Doe"
    );
    RecruitmentPage.assertResultsContainName(
      recruitmentData.validCandidate.candidateName,
    );
  });

  it("TC03 - Pencarian candidate berdasarkan Vacancy", () => {
    RecruitmentPage.selectJobTitle(recruitmentData.jobTitleFilter.jobTitle);
    RecruitmentPage.clickSearch();
    cy.wait("@candidateSearch").its("response.statusCode").should("eq", 200);
    // Tidak assert jumlah data, karena data demo publik bisa kosong sewaktu-waktu
  });

  it("TC04 - Pencarian candidate berdasarkan Status", () => {
    RecruitmentPage.selectStatus(recruitmentData.statusFilter.status); // ganti recruitData
    RecruitmentPage.clickSearch();
    cy.wait("@candidateSearch").its("response.statusCode").should("eq", 200);
    RecruitmentPage.assertResultCountAtLeast(1);
  });

  it("TC05 - Pencarian dengan nama candidate yang tidak terdaftar", () => {
    RecruitmentPage.elements
      .candidateNameInput()
      .clear()
      .type(recruitmentData.invalidCandidate.candidateName);
    cy.wait(500);
    RecruitmentPage.clickSearch();
    RecruitmentPage.assertInvalidCandidateMessage();
  });

  it("TC06 - Tombol Reset mengembalikan filter pencarian ke kondisi awal", () => {
    RecruitmentPage.searchByCandidateName(
      recruitmentData.validCandidateSearch.candidateName,
      recruitmentData.validCandidateSearch.clickMatchText, // tambahkan ini
    );
    RecruitmentPage.clickReset();
    RecruitmentPage.assertFiltersReset();
  });

  it("TC07 - Menambahkan candidate baru dengan data valid", () => {
    RecruitmentPage.clickAdd();
    RecruitmentPage.fillCandidateForm(recruitmentData.newCandidate); // ganti recruitData
    RecruitmentPage.clickSave();
    cy.wait("@addCandidate")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);
    RecruitmentPage.assertAddCandidateSuccess(
      recruitmentData.expectedMessages.successToast, // ganti recruitData
    );
  });

  it("TC08 - Validasi field wajib saat menambah candidate dengan data kosong", () => {
    RecruitmentPage.clickAdd();
    RecruitmentPage.clickSave();
    RecruitmentPage.assertRequiredFieldVisible();
  });
});
