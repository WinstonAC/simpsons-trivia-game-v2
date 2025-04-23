export const questions = {
  characters: {
    easy: [
      {
        question: "What is Homer's favorite food?",
        options: ["Donuts", "Salad", "Pizza", "Tofu"],
        correctAnswer: "Donuts",
        category: "characters",
        difficulty: "easy"
      },
      {
        question: "What is Bart's catchphrase?",
        options: ["Eat my shorts!", "D'oh!", "Woo-hoo!", "Excellent!"],
        correctAnswer: "Eat my shorts!",
        category: "characters",
        difficulty: "easy"
      },
      {
        question: "What is Marge's maiden name?",
        options: ["Bouvier", "Simpson", "Flanders", "Lovejoy"],
        correctAnswer: "Bouvier",
        category: "characters",
        difficulty: "easy"
      },
      {
        question: "What is the name of Bart's sister?",
        options: ["Lisa", "Maggie", "Patty", "Selma"],
        correctAnswer: "Lisa",
        category: "characters",
        difficulty: "easy"
      },
      {
        question: "What is the name of the family's baby?",
        options: ["Maggie", "Lisa", "Bart", "Homer"],
        correctAnswer: "Maggie",
        category: "characters",
        difficulty: "easy"
      }
    ],
    medium: [
      {
        question: "What is the name of Bart's best friend?",
        options: ["Milhouse", "Nelson", "Martin", "Ralph"],
        correctAnswer: "Milhouse",
        category: "characters",
        difficulty: "medium"
      },
      {
        question: "What is the name of the family's pet greyhound?",
        options: ["Santa's Little Helper", "Laddie", "She's the Fastest", "Greyhound"],
        correctAnswer: "Santa's Little Helper",
        category: "characters",
        difficulty: "medium"
      },
      {
        question: "What is the name of Marge's sisters?",
        options: ["Patty and Selma", "Jacqueline and Gladys", "Edna and Agnes", "Ruth and Martha"],
        correctAnswer: "Patty and Selma",
        category: "characters",
        difficulty: "medium"
      }
    ],
    hard: [
      {
        question: "What is the name of the Simpson family's first pet?",
        options: ["Snowball I", "Santa's Little Helper", "Laddie", "She's the Fastest"],
        correctAnswer: "Snowball I",
        category: "characters",
        difficulty: "hard"
      },
      {
        question: "What is the name of the Simpson family's first pet cat?",
        options: ["Snowball II", "Santa's Little Helper", "Coltrane", "Scratchy"],
        correctAnswer: "Snowball II",
        category: "characters",
        difficulty: "hard"
      }
    ]
  },
  episodes: {
    easy: [
      {
        question: "What is the name of the first episode of The Simpsons?",
        options: ["Simpsons Roasting on an Open Fire", "Bart the Genius", "Homer's Odyssey", "There's No Disgrace Like Home"],
        correctAnswer: "Simpsons Roasting on an Open Fire",
        category: "episodes",
        difficulty: "easy"
      },
      {
        question: "In which episode does Homer become the bouncer at Moe's Tavern?",
        options: ["Homer the Bouncer", "Homer's Night Out", "Homer Defined", "Homer's Odyssey"],
        correctAnswer: "Homer the Bouncer",
        category: "episodes",
        difficulty: "easy"
      }
    ],
    medium: [
      {
        question: "In which episode does Homer become the safety inspector at the nuclear power plant?",
        options: ["Homer's Odyssey", "Homer Defined", "Homer the Safety Inspector", "Homer's Night Out"],
        correctAnswer: "Homer's Odyssey",
        category: "episodes",
        difficulty: "medium"
      },
      {
        question: "Which episode features the first appearance of Sideshow Bob?",
        options: ["The Telltale Head", "Krusty Gets Busted", "Bart the Murderer", "Black Widower"],
        correctAnswer: "The Telltale Head",
        category: "episodes",
        difficulty: "medium"
      }
    ],
    hard: [
      {
        question: "In which episode does Homer become the safety inspector at the nuclear power plant?",
        options: ["Homer's Odyssey", "Homer Defined", "Homer the Safety Inspector", "Homer's Night Out"],
        correctAnswer: "Homer's Odyssey",
        category: "episodes",
        difficulty: "hard"
      }
    ]
  },
  quotes: {
    easy: [
      {
        question: "Who said: 'D'oh!'?",
        options: ["Homer", "Bart", "Marge", "Mr. Burns"],
        correctAnswer: "Homer",
        category: "quotes",
        difficulty: "easy"
      },
      {
        question: "Who said: 'Eat my shorts!'?",
        options: ["Bart", "Homer", "Nelson", "Milhouse"],
        correctAnswer: "Bart",
        category: "quotes",
        difficulty: "easy"
      }
    ],
    medium: [
      {
        question: "Who said: 'I'm normally not a praying man, but if you're up there, please save me, Superman!'",
        options: ["Homer", "Bart", "Ned Flanders", "Reverend Lovejoy"],
        correctAnswer: "Homer",
        category: "quotes",
        difficulty: "medium"
      }
    ],
    hard: [
      {
        question: "Who said: 'I'm Bart Simpson, who the hell are you?'",
        options: ["Bart", "Milhouse", "Nelson", "Ralph"],
        correctAnswer: "Bart",
        category: "quotes",
        difficulty: "hard"
      }
    ]
  },
  locations: {
    easy: [
      {
        question: "Where does Homer work?",
        options: ["Springfield Nuclear Power Plant", "Kwik-E-Mart", "Moe's Tavern", "Springfield Elementary"],
        correctAnswer: "Springfield Nuclear Power Plant",
        category: "locations",
        difficulty: "easy"
      }
    ],
    medium: [
      {
        question: "What is the name of the local convenience store?",
        options: ["Kwik-E-Mart", "Stop & Shop", "Quick Mart", "7-Eleven"],
        correctAnswer: "Kwik-E-Mart",
        category: "locations",
        difficulty: "medium"
      }
    ],
    hard: [
      {
        question: "What is the name of Springfield's rival town?",
        options: ["Shelbyville", "Ogdenville", "Capital City", "North Haverbrook"],
        correctAnswer: "Shelbyville",
        category: "locations",
        difficulty: "hard"
      }
    ]
  }
};

export const getQuestionsByDifficulty = (difficulty) => {
  const allQuestions = [];
  Object.values(questions).forEach(category => {
    if (category[difficulty]) {
      allQuestions.push(...category[difficulty]);
    }
  });
  return allQuestions;
};

export const getRandomQuestion = (difficulty) => {
  const questions = getQuestionsByDifficulty(difficulty);
  return questions[Math.floor(Math.random() * questions.length)];
};

export const getQuestionsByCategory = (category, difficulty) => {
  return questions[category]?.[difficulty] || [];
}; 