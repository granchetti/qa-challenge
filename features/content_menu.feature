@content
Feature: Content Menu

    Scenario Outline: Verify Content Menu
        Given I navigate to "<wikiName>" page
        When I check the Content Menu
        Then I should be able to click on "<section>" option

        Examples:
            | wikiName | section            |
            | Renfe    | Tickets            |
            | Renfe    | Figures.Operations |