@back-end
Feature: Generic API feature

  Scenario: Create API object using fixture file
    When  I prepare an API test object called "myObject" using fixture file "super-secret-folder/apiSecretData.json"
    Then The string '{{ myObject.requestConfig.data.grant_type }}' will be equal to the string "client_credentials"

  Scenario: Add header to request
    When I prepare an API test object called "apiTestObject" using fixture file '{{ apiTest }}'
    When I add the headers '{\"x-api-key\":\"invalid-api-key-that-is-totally-made-up\"}' to the test object "apiTestObject"
    And I add the headers '{\"secondHeader\": \"second\"}' to the test object "apiTestObject"
    Then The string "{{apiTestObject.requestConfig.headers.x-api-key}}" will be equal to the string "invalid-api-key-that-is-totally-made-up"
    And The string "{{apiTestObject.requestConfig.headers.secondHeader}}" will be equal to the string "second"

  Scenario: Add basic authentication to request
    Given I prepare an API test object called "apiTestObject" using fixture file '{{ apiTest }}'
    When I add basic authentication username: "{{ secrets.customer-salesforce-service.username }}" and password: "{{ secrets.customer-salesforce-service.password }}" to the test object "apiTestObject"
    Then The string "{{apiTestObject.requestConfig.auth.username}}" will contain the string "atbank"
    And The string "{{apiTestObject.requestConfig.auth.password}}" will contain the string "p3ycD"

  Scenario: Add form data to request
    Given I prepare an API test object called "apiTestObject" using fixture file '{{ apiTest }}'
    When I add the form data '{ \"grant_type\": \"form_authorization\" }' to the test object "apiTestObject"
    And I add the form data '{ \"second_data\": \"second\" }' to the test object "apiTestObject"
    Then The string "{{apiTestObject.requestConfig.data.grant_type}}" will be equal to the string "form_authorization"
    And The string "{{apiTestObject.requestConfig.data.second_data}}" will be equal to the string "second"

  Scenario: Add content data to test object
    Given I store "QaSkyducktUser" as "username"
    And I store "TestLead" as "jobTitle"
    And I prepare an API test object called "apiTestObject" using fixture file '{{ apiTest }}'
    When I add the content data '{{ apiData }}' to the test object "apiTestObject"
    And I add the content data '{\"secondKey\": \"second\"}' to the test object "apiTestObject"
    Then The string "{{apiTestObject.requestConfig.data.userData.job}}" will be equal to the string "TestLead"
    And The string "{{apiTestObject.requestConfig.data.secondKey}}" will be equal to the string "second"

  Scenario: Send POST request and check response status
    Given I store "QaSkyducktUser" as "username"
    And I store "TestLead" as "jobTitle"
    And I prepare an API test object called "apiTestObject" using fixture file '{{ apiRegister }}'
    When I perform a POST to "{{ BASE_API_URL }}{{ endpoints.register }}" using "apiTestObject"
    Then the status code for "apiTestObject" will be equal to "200"
    And The string '{{ apiTestObject.response.data.message }}' will be equal to the string "Registered Successfully"
