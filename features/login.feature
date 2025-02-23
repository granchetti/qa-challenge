@login
Feature: Login to Wikipedia

    Scenario Outline: Successful login
        Given I am in the Wikipedia Login page
        When I sign in with "<userKey>" user
        Then I should successfully login to Wikipedia

        Examples:
            | userKey |
            | default |