/**
 * Intercept - Recruitment
 * Menangkap request GET (search candidate) dan POST (add candidate)
 * pada menu Recruitment.
 */

export const interceptCandidateSearch = () => {
  cy.intercept('GET', '**/api/v2/recruitment/candidates**').as('candidateSearch');
};

export const interceptVacancyList = () => {
  cy.intercept('GET', '**/api/v2/recruitment/vacancies**').as('vacancyList');
};

export const interceptAddCandidate = () => {
  cy.intercept('POST', '**/api/v2/recruitment/candidates').as('addCandidate');
};
