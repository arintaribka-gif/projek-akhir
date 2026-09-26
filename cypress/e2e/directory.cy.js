import DirectoryPage from "../support/directoryPagePOM";
import {
  interceptDirectoryGrid,
  interceptDirectorySuggest,
  interceptJobTitleList,
  interceptLocationList,
} from "../support/directoryIntercepts";

describe("Feature: Directory", () => {
  let loginData;
  let dirData;

  before(() => {
    cy.fixture("loginData").then((f) => (loginData = f));
    cy.fixture("directoryData").then((f) => (dirData = f));
  });

  beforeEach(() => {
    interceptDirectoryGrid();
    interceptDirectorySuggest();
    interceptJobTitleList();
    interceptLocationList();

    cy.loginAsAdmin(loginData.validUser.username, loginData.validUser.password);

    DirectoryPage.visit();
    cy.wait("@directoryGrid"); // page load awal, limit=14&offset=0
  });

  it("TC01 - Menampilkan halaman Directory dengan benar", () => {
    DirectoryPage.assertPageHeader("Directory");
    DirectoryPage.assertSearchControlsVisible();
  });

  it("TC02 - Pencarian employee berdasarkan nama valid", () => {
    DirectoryPage.searchByEmployeeName(
      dirData.validEmployee.employeeName,
      dirData.validEmployee.clickMatchText,
    );
    DirectoryPage.assertResultsContainName(
      dirData.validEmployee.expectedNameContains,
    );
  });

  it("TC03 - Pencarian employee berdasarkan Job Title", () => {
    DirectoryPage.selectJobTitle(dirData.jobTitleFilter.jobTitle);
    DirectoryPage.clickSearch();
    cy.wait("@directoryGrid").its("response.statusCode").should("eq", 200);
    DirectoryPage.assertResultCountAtLeast(1);
  });

  it("TC04 - Pencarian employee berdasarkan Location", () => {
    DirectoryPage.selectLocation(dirData.locationFilter.location);
    DirectoryPage.clickSearch();
    cy.wait("@directoryGrid").its("response.statusCode").should("eq", 200);
    DirectoryPage.assertResultCountAtLeast(1);
  });

  it("TC05 - Pencarian employee dengan kombinasi filter nama, job title, dan location", () => {
    const { employeeName, clickMatchText, jobTitle, location } =
      dirData.combinedFilter;
    DirectoryPage.selectJobTitle(jobTitle);
    DirectoryPage.selectLocation(location);
    DirectoryPage.searchByEmployeeName(employeeName, clickMatchText);
    DirectoryPage.assertResultsContainName(employeeName);
  });

  it("TC06 - Pencarian dengan nama employee yang tidak terdaftar", () => {
    DirectoryPage.searchByEmployeeNameNotFound(
      dirData.invalidEmployee.employeeName,
    );
    DirectoryPage.assertInvalidEmployeeMessage(); // ganti dari assertNoRecordsFound
  });

  it("TC07 - Tombol Reset mengembalikan filter ke kondisi awal", () => {
    DirectoryPage.elements.employeeNameInput().clear().type("Peter");
    DirectoryPage.clickReset();
    DirectoryPage.assertFiltersReset();
  });

  it("TC08 - Data pada tabel Directory sesuai dengan response API", () => {
    DirectoryPage.clickSearch();
    cy.wait("@directoryGrid").then((interception) => {
      const totalFromApi = interception.response.body.meta?.total ?? 0;
      if (totalFromApi > 0) {
        DirectoryPage.assertResultCountAtLeast(1);
      } else {
        DirectoryPage.assertNoRecordsFound(dirData.expectedMessages.noRecords);
      }
    });
  });
});
