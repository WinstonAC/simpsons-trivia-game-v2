describe('Simpsons Trivia Game', () => {
  beforeEach(() => {
    cy.startNewGame();
  });

  it('should display the game screen with initial state', () => {
    cy.get('.game-screen').should('be.visible');
    cy.get('.question-text').should('be.visible');
    cy.get('.option').should('have.length', 4);
    cy.checkLevel(1);
    cy.checkScore(0);
    cy.checkStreak(0);
  });

  it('should handle correct answer selection', () => {
    // Get the correct answer from the question
    cy.get('.option').first().invoke('text').then((correctAnswer) => {
      cy.answerQuestion(correctAnswer);
      cy.get('.option.correct').should('be.visible');
      cy.checkScore(100); // Base score for easy level
      cy.checkStreak(1);
    });
  });

  it('should handle incorrect answer selection', () => {
    // Get an incorrect answer
    cy.get('.option').not(':first').first().invoke('text').then((incorrectAnswer) => {
      cy.answerQuestion(incorrectAnswer);
      cy.get('.option.disabled').should('be.visible');
      cy.checkScore(0);
      cy.checkStreak(0);
    });
  });

  it('should progress through levels', () => {
    // Answer correctly to progress through levels
    for (let i = 1; i <= 5; i++) {
      cy.get('.option').first().invoke('text').then((correctAnswer) => {
        cy.answerQuestion(correctAnswer);
        cy.wait(1500); // Wait for next question
      });
    }
    cy.checkLevel(6);
  });

  it('should handle game over condition', () => {
    // Answer incorrectly multiple times to trigger game over
    for (let i = 0; i < 5; i++) {
      cy.get('.option').not(':first').first().invoke('text').then((incorrectAnswer) => {
        cy.answerQuestion(incorrectAnswer);
        cy.wait(1500); // Wait for next question
      });
    }
    cy.checkGameOver(false);
  });

  it('should handle winning the game', () => {
    // Answer correctly to reach the final level
    for (let i = 1; i <= 15; i++) {
      cy.get('.option').first().invoke('text').then((correctAnswer) => {
        cy.answerQuestion(correctAnswer);
        cy.wait(1500); // Wait for next question
      });
    }
    cy.checkGameOver(true);
  });

  it('should handle sound toggle', () => {
    cy.get('button[aria-label*="Sound"]').click();
    cy.get('button[aria-label*="Sound"]').should('have.attr', 'aria-label', 'Sound Off');
  });

  it('should display tutorial when help button is clicked', () => {
    cy.get('button[aria-label*="Help"]').click();
    cy.get('.tutorial').should('be.visible');
  });

  it('should handle mobile touch events', () => {
    cy.viewport('iphone-6');
    cy.get('.option').first().trigger('touchstart');
    cy.get('.option').first().trigger('touchend');
    cy.get('.option.selected').should('be.visible');
  });
}); 