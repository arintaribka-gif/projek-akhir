/**
 * Intercept - Login
 * Menangkap request yang terjadi saat proses submit form login
 * dan saat validasi index/dashboard setelah login berhasil.
 */

export const interceptLoginRequest = () => {
  cy.intercept('POST', '**/auth/login').as('loginSubmit');
};

export const interceptDashboardIndex = () => {
  cy.intercept('GET', '**/dashboard/index').as('dashboardIndex');
};

export const interceptValidateUser = () => {
  cy.intercept('GET', '**/api/v2/admin/i18n/**').as('validateUser');
};
