@front-end
Feature: Create account

  Background: 
    When I open page with url "{{ BASE_URL }}"
    And Click on locator="//a[contains(@class, 'btn1')]" with options
      | delay |     0 |
      | force | false |

  Scenario: User with valid data fill the sign up form and confirms registration
    When I store table as "UserData"
      | firstname   | {{ generate.firstname }}   |
      | lastname    | {{ generate.lastname }}    |
      | email       | {{ generate.email }}       |
      | phonenumber | {{ generate.phonenumber }} |
      | password    | {{ generate.password  }}   |
    And I enter values to '{{ signUpPage }}' from '{{ UserData }}'
    When I store table as "UserData"
      | phonenumber          |           1234567890 |
      | password             | SomeSecretPass123@$_ |
      | passwordConfirmation | SomeSecretPass123@$_ |
    When I enter values to '{{ signUpPage }}' from '{{ UserData }}'
    And Select random option from '{{ signUpPage.occupationSelect }}' select
    And Click on random value from '{{ signUpPage.Genders }}'
    And Click on '{{ signUpPage.ageConfirmation }}'
    And Click on '{{ signUpPage.confirmRegistration }}'
    Then Check that locator="//h1[@class='headcolor']" has text="Account Created Successfully"
