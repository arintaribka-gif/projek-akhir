/**
 * Intercept - Directory
 * Menangkap request GET pencarian employee pada menu Directory.
 *
 * Catatan penting:
 * OrangeHRM Directory punya 2 jenis request GET yang mirip tapi beda fungsi:
 * 1. "directorySuggest" -> nameOrId=... (typeahead saat mengetik, TANPA limit/offset)
 * 2. "directoryGrid"    -> limit=...&offset=... (request yang benar-benar merender grid/card)
 * Keduanya harus dipisah alias-nya, karena kalau digabung satu alias generik,
 * cy.wait() bisa ke-consume oleh request yang salah (request suggestion, bukan grid).
 */

export const interceptDirectoryGrid = () => {
  cy.intercept("GET", "**/api/v2/directory/employees?limit=*").as(
    "directoryGrid",
  );
};

export const interceptDirectorySuggest = () => {
  cy.intercept("GET", "**/api/v2/directory/employees?nameOrId=*").as(
    "directorySuggest",
  );
};

export const interceptJobTitleList = () => {
  cy.intercept("GET", "**/api/v2/admin/job-titles**").as("jobTitleList");
};

export const interceptLocationList = () => {
  cy.intercept("GET", "**/api/v2/admin/locations**").as("locationList");
};
