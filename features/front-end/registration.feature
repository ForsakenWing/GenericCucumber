@front-end
Feature: Create account

    Background:
        When Open page with url "https://rahulshettyacademy.com/client/"
        And Click on locator="//a[contains(@class, 'btn1')]" with options

        | delay | 0 |
        | force | false |

    Scenario: User with valid data fill the sign up form and confirms registration
        Given Valid User
        When Enter values to "InputFields" from User
        When Select random option from "occupationSelect" select 
        When Click on random value from "Genders"
        When Click on "ageConfirmation"
        When Click on "confirmRegistration"
        Then Check that locator="//h1[@class='headcolor']" has text="Account Created Successfully"

        When I send request I see response 200 and headers=... body=...
        
    # Scenario Outline: Useinvalidr with  data fill the sign up form and confirms registration
    #     Given User with invalid <email>
    #     Then The validation error message Email should contain... is displayed
    #     And User has opportunity to enter email without page reloading
    #     And Other fields are not become empty

    #     Examples:
    #         | email                    |
    #         | IAMGROOT@GROOT..GROOT    |
    #         | IAM123@NOT_GROOT.com     |
    #         | AreYouGroot__@@gmail.com |

    # Scenario Outline: User with short password fill the sign up form and confirms registration
    #     Given User with short <password>
    #     Then The validation error message 'Password must be 8 characters long' is displayed
    #     And User has opportunity to re-enter password without page reloading
    #     And Other fields are not become empty

    #     Examples:
    #         | password              |
    #         | 123456789             |
    #         | 0123456789            |
    #         | IAMNOTWEEEEEK         |
    #         | IAMGROOOT!            |
    #         | IAMINVALIDPASSWORD!!! |


