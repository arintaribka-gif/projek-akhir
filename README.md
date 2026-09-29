# OrangeHRM QA Automation Project

Final project of the Sanbercode Quality Assurance Bootcamp. Automated UI testing with Cypress and API testing with Postman on the [OrangeHRM demo](https://opensource-demo.orangehrmlive.com/).

## Tools

- Cypress (actions, assertions, intercept)
- Page Object Model (POM)
- Postman (API testing)
- [tambahkan lain kalau ada, mis. Google Sheets untuk test case]

## Scope

| Module      | Test Cases | Description                                      |
| ----------- | ---------- | ------------------------------------------------ |
| Login       | [jumlah]   | [mis. login valid, password salah, field kosong] |
| Directory   | [jumlah]   | [mis. search employee, filter]                   |
| Recruitment | [jumlah]   | [mis. tambah kandidat, cek daftar vacancy]       |

**Total:** [jumlah] automated test cases.

## Project Structure

```
cypress/
  e2e/        # test files
  pages/      # page objects (POM)
postman/      # Postman collection
docs/         # test cases, bug reports, screenshots
```

## How to Run

```bash
npm install
npx cypress open    # interactive mode
npx cypress run     # headless mode
```

## API Testing

Postman collection is in `postman/`. Import it into Postman and run the requests. [Sebutkan endpoint yang dites]

## Test Documentation

- [Test Cases](link-google-sheets)
- [Bug Reports](link-google-sheets)

## Results

![Cypress run result](docs/screenshots/cypress-run.png)

## Author

Arinta Ribka Laura Tampubolon, [LinkedIn](https://www.linkedin.com/in/arintaribkaa)
