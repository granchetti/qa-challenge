@history
Feature: View history

    Scenario Outline: Scenario Outline name: Verify View history
        Given I navigate to "<wikiName>" page
        When I select View history
        Then I should be redirected to "<relativeUrl>"
        And I should be able to see that the wiki was edited on "<editTime>" with "<relatedInfo>" info
        And I should see that the wiki was edited on last month
        Examples:
            | wikiName | relativeUrl                                | editTime               | relatedInfo     |
            | Wizz_Air | /w/index.php?title=Wizz_Air&action=history | 13:16, 8 November 2024 | all you can fly |



