Cypress.Commands.add("loginAsAdmin", (username, password) => {
  cy.visit("/web/index.php/auth/login");
  cy.get('input[name="username"]')
    .should("be.visible")
    .and("not.be.disabled") // tunggu form benar-benar siap
    .clear()
    .type(username);
  cy.get('input[name="password"]')
    .should("not.be.disabled")
    .clear()
    .type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard/index");
});
