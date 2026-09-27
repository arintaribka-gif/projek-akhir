/**
 * Feature: Login
 * Format: POM (action, assertion, data, intercept)
 * Total: 8 test cases
 */

import LoginPage from "../support/loginPagePOM";

describe("Feature: Login", () => {
  let data;

  before(() => {
    cy.fixture("loginData").then((fixture) => {
      data = fixture;
    });
  });

  beforeEach(() => {
    LoginPage.setupIntercepts();
    LoginPage.visit();
  });

  it("TC01 - Menampilkan elemen form login dengan benar", () => {
    LoginPage.assertLoginFormVisible();
  });

  it("TC02 - Login berhasil dengan kredensial valid", () => {
    LoginPage.login(data.validUser.username, data.validUser.password);
    LoginPage.assertLoginSuccess(data.expectedMessages.dashboardTitle);
  });

  it("TC03 - Login gagal dengan password salah", () => {
    LoginPage.login(
      data.invalidPassword.username,
      data.invalidPassword.password,
    );
    LoginPage.assertErrorMessage(data.expectedMessages.invalidCredential);
    LoginPage.assertStillOnLoginPage();
  });

  it("TC04 - Login gagal dengan username tidak terdaftar", () => {
    LoginPage.login(
      data.invalidUsername.username,
      data.invalidUsername.password,
    );
    LoginPage.assertErrorMessage(data.expectedMessages.invalidCredential);
  });

  it("TC05 - Validasi field wajib saat username dan password kosong", () => {
    LoginPage.clickLoginButton();
    LoginPage.assertRequiredFieldVisible();
    LoginPage.assertStillOnLoginPage();
  });

  it("TC06 - Validasi field wajib saat hanya password kosong", () => {
    LoginPage.fillUsername(data.validUser.username);
    LoginPage.clickLoginButton();
    LoginPage.assertRequiredFieldVisible();
  });

  it("TC07 - Validasi field wajib saat hanya username kosong", () => {
    LoginPage.fillPassword(data.validUser.password);
    LoginPage.clickLoginButton();
    LoginPage.assertRequiredFieldVisible();
  });

  it("TC08 - Navigasi ke halaman Forgot Password", () => {
    LoginPage.clickForgotPassword();
    LoginPage.assertForgotPasswordPage(
      data.expectedMessages.resetPasswordTitle,
    );
  });
});
