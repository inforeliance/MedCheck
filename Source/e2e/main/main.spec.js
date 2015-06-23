'use strict';

describe('Main View', function() {

  it("should have an email field on the login page", function() {
      browser.get("http://localhost:9000/login/");
      browser.wait(element(by.model("user.email")).isPresent(), 2000);
  });

  it("should have a name field on the registration page", function() {
      browser.get("http://localhost:9000/signup/");
      browser.wait(element(by.model("user.name")).isPresent(), 2000);
  });

  it("should have a \"Help\" header on the page of the same name", function() {
      browser.get("http://localhost:9000/help");
      browser.wait(element(by.css("h1")).isPresent(), 2000);
      expect(element(by.css("h1")).getText()).toBe("Help");
  });

  it("should successfully login", function() {
      browser.get("http://localhost:9000/login");
      browser.wait(element(by.css("input[type=email]")).isPresent(), 2000);
      element(by.css("input[type=email]")).sendKeys("test@test.com");
      element(by.css("input[type=password]")).sendKeys("test");
      element(by.css("button[type=submit")).click();
  });

  it("should click the add button, or something", function() {
      browser.get("http://localhost:9000/sandbox");
      browser.wait(element(by.css("button[type=submit]")).isPresent(), 2000);
      element(by.css("button[type=submit]")).click()
  });
});
