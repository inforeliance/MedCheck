'use strict';

var root = "http://medcheck.rememberthetrash.com";

describe('The application', function() {

    it("should have an email field on the login page", function() {
        browser.get(root + "/login/");
        browser.wait(element(by.model("user.email")).isPresent(), 2000);
    });

    it("should have a name field on the registration page", function() {
        browser.get(root + "/signup/");
        browser.wait(element(by.model("user.name")).isPresent(), 2000);
    });

    it("should have a \"Help\" header on the page of the same name", function() {
        browser.get(root + "/help");
        browser.wait(element(by.css("h1")).isPresent(), 2000);
        expect(element(by.css("h1")).getText()).toBe("Help");
    });

    it("should login", function() {
        browser.get(root + "/login");
        browser.wait(element(by.css("input[type=email]")).isPresent(), 2000);
        element(by.css("input[type=email]")).sendKeys("test@test.com");
        element(by.css("input[type=password]")).sendKeys("test");
        element(by.css("button[type=submit")).click();
    });

    it("should click the add button, or something", function() {
        browser.get(root + "/sandbox");
        browser.wait(element(by.css("button[type=submit]")).isPresent(), 2000);
        element(by.css("button[type=submit]")).click()
    });

    it("should show an information table when the barcode button is pressed", function() {
        browser.get(root);
        browser.wait(element(by.css("button")).isPresent(), 2000);
        element(by.css("button.btn.btn-primary")).click();
        browser.wait(element(by.css("div.panel div.panel-body")).isPresent(), 2000);
    });

    it("should show an error when invalid UPC is entered", function() {
        element(by.model("UPC")).sendKeys("aaaaaaa");
        element(by.css("button.btn.btn-primary")).click();
        browser.wait(element(by.css("div.alert.alert-danger")).isPresent(), 2000);
    });
});
