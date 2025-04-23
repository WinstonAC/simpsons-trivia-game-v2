import '@testing-library/cypress/add-commands';

// Custom command to start a new game
Cypress.Commands.add('startNewGame', (playerName = 'Test Player') => {
  cy.visit('/');
  cy.get('input[type="text"]').type(playerName);
  cy.get('button').contains('Start Game').click();
});

// Custom command to answer a question
Cypress.Commands.add('answerQuestion', (optionText) => {
  cy.get('.option').contains(optionText).click();
});

// Custom command to check if game is over
Cypress.Commands.add('checkGameOver', (isWin = false) => {
  if (isWin) {
    cy.get('.game-over-content h1').should('contain', 'Congratulations!');
  } else {
    cy.get('.game-over-content h1').should('contain', 'Game Over');
  }
});

// Custom command to check score
Cypress.Commands.add('checkScore', (expectedScore) => {
  cy.get('.stat-value').first().should('contain', expectedScore);
});

// Custom command to check level
Cypress.Commands.add('checkLevel', (expectedLevel) => {
  cy.get('.level').should('contain', `Level ${expectedLevel}`);
});

// Custom command to check streak
Cypress.Commands.add('checkStreak', (expectedStreak) => {
  cy.get('.streak').should('contain', `Streak: ${expectedStreak}`);
}); 