/**
 * Page Object - Login Page
 * https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
 */

class LoginPage {
  // ---------- Locators ----------
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
    errorMessage: () => cy.get('.oxd-alert-content-text'),
    requiredFieldError: () => cy.get('.oxd-input-group__message'),
    dashboardHeader: () => cy.get('.oxd-topbar-header-breadcrumb h6'),
    orangeHrmLogo: () => cy.get('.orangehrm-login-branding img'),
    forgotPasswordLink: () => cy.contains('p', 'Forgot your password'),
    resetPasswordTitle: () => cy.get('.orangehrm-forgot-password-title'),
  };

  // ---------- Actions ----------
  visit() {
    cy.visit('/web/index.php/auth/login');
    return this;
  }

  fillUsername(username) {
    this.elements.usernameInput().clear().type(username, { delay: 0 });
    return this;
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password, { delay: 0 });
    return this;
  }

  clickLoginButton() {
    this.elements.loginButton().click();
    return this;
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLoginButton();
    return this;
  }

  clickForgotPassword() {
    this.elements.forgotPasswordLink().click();
    return this;
  }

  // ---------- Assertions ----------
  assertLoginSuccess(dashboardTitle) {
    cy.url().should('include', '/dashboard/index');
    this.elements.dashboardHeader().should('be.visible').and('contain.text', dashboardTitle);
    return this;
  }

  assertErrorMessage(message) {
    this.elements.errorMessage().should('be.visible').and('contain.text', message);
    return this;
  }

  assertRequiredFieldVisible() {
    this.elements.requiredFieldError().should('have.length.greaterThan', 0);
    return this;
  }

  assertStillOnLoginPage() {
    cy.url().should('include', '/auth/login');
    return this;
  }

  assertLoginFormVisible() {
    this.elements.orangeHrmLogo().should('be.visible');
    this.elements.usernameInput().should('be.visible');
    this.elements.passwordInput().should('be.visible');
    this.elements.loginButton().should('be.visible').and('contain.text', 'Login');
    return this;
  }

  assertForgotPasswordPage(title) {
    this.elements.resetPasswordTitle().should('be.visible').and('contain.text', title);
    return this;
  }
}

export default new LoginPage();
