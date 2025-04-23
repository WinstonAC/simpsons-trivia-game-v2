# 🎮 Simpsons Trivia Game

A fun and interactive trivia game featuring questions about The Simpsons, built with React and modern web technologies.

## 🌟 Features

- Interactive quiz gameplay with timer
- Progressive difficulty levels
- Score tracking and streak system
- Mobile-responsive design
- Keyboard and touch controls
- Sound effects and visual feedback
- Accessibility features

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simpsons-trivia-game.git
cd simpsons-trivia-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your default browser at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

## 🎮 How to Play

1. Enter your name on the landing page
2. Answer Simpsons-related questions within the time limit
3. Progress through increasingly difficult levels
4. Build up your streak for bonus points
5. Try to reach the highest score!

## 📚 Use Cases & Features

### 🎓 Tutorial Mode
- Access the tutorial by clicking the "?" icon in the top-right corner
- Learn game mechanics through an interactive 5-step guide
- Perfect for first-time players
- Can be accessed at any time during gameplay

### 🔊 Sound Control
- Toggle sound effects using the speaker icon
- Includes classic Simpsons sound clips:
  - "Woo-hoo!" for correct answers
  - "D'oh!" for incorrect answers
  - "Excellent" for level-ups
  - "Ha-ha!" for game over
- Sound preference is saved between sessions

### 🏆 Scoring System
- Base points for correct answers
- Streak multiplier for consecutive correct answers
- Time bonus for quick responses
- Level multiplier for harder questions

### 📱 Mobile Features
- Swipe controls for option navigation
- Tap to select answers
- Haptic feedback for interactions
- Responsive design for all screen sizes

### 🎯 Difficulty Progression
- Questions get progressively harder
- Each level introduces new categories
- Special bonus rounds every 5 levels
- Final boss level with ultimate Simpsons challenges

## 🔧 Technical Features

### Performance
- Optimized asset loading
- Smooth animations
- Efficient state management
- Cached sound effects

### Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode
- Customizable text size

## 🛠️ Built With

- React
- React Router
- CSS3 with modern animations
- Mobile-first responsive design

## 📱 Mobile Features

- Swipe controls for navigation
- Haptic feedback
- Optimized touch controls
- Responsive layout

## 🎯 Future Improvements

- High scores leaderboard
- Additional question categories
- Multiplayer mode
- Social sharing features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- The Simpsons creators and Fox for inspiration
- React community for excellent tools and resources
- All contributors and testers

---

## 🧠 About the Project

This project was created by [William Campbell](#) as a passion project, dev portfolio piece, and experiment in joyful UI design. It's more than trivia — it's a playful, polished, and technically sound product with room to scale.

---

## 🖌️ UI/UX Goals (In Progress)

This project will feature:
- A retro Simpsons TV screen component to display trivia questions
- A modern, high-quality background inspired by the show but reimagined for 2025 aesthetics
- Custom typography and animations that mimic the show's iconic feel
- Carefully selected visuals generated via ChatGPT tools and enhanced via Canva or Figma

💡 *The goal: a design that feels elevated, intentional, and straight out of a designer's dream.*

---

## 🧑‍💻 Built With

- React (Web)
- React Native (Mobile)
- Cursor (Development)
- Xcode (iOS build & testing)
- GitHub (Version control)
- Vercel (Deployment)
- Notion (Product & roadmap planning)
- Canva / Figma (UI Design assets)

---

## 🚀 Getting Started (Cursor + Local Dev)

### Web
Last deployed: [timestamp: ${new Date().toISOString()}]

## 🧪 Testing

### Running Tests

```bash
# Run all tests with coverage report
npm test

# Run tests in watch mode (useful during development)
npm run test:watch
```

### Test Coverage

The project maintains a minimum test coverage threshold of 80% for:
- Branches
- Functions
- Lines
- Statements

Coverage reports are generated in the `coverage` directory after running tests.

### Writing Tests

When contributing new features, please ensure:
1. Tests are written for all new components and utilities
2. Test coverage meets or exceeds the minimum threshold
3. Tests follow the established patterns in existing test files

#### Test Structure

Tests are organized in the `src/__tests__` directory, mirroring the structure of the source code:
- Component tests: `src/__tests__/ComponentName.test.js`
- Utility tests: `src/__tests__/utilityName.test.js`

#### Testing Guidelines

1. **Component Tests**
   - Test all user interactions
   - Verify correct rendering of props
   - Test edge cases and error states
   - Mock external dependencies

2. **Utility Tests**
   - Test all exported functions
   - Cover edge cases
   - Verify correct input/output handling

3. **Integration Tests**
   - Test component interactions
   - Verify state management
   - Test routing and navigation

### Testing Tools

The project uses:
- Jest for test running and assertions
- React Testing Library for component testing
- Jest DOM for DOM-specific assertions
- User Event for simulating user interactions

## Features

- Multiple choice trivia questions about The Simpsons
- Score tracking including correct and incorrect answers
- Sound effects for correct/incorrect answers
- Streak tracking for consecutive correct answers
- Level progression system
- Sound control toggle
- Responsive design
- Accessibility features

## Gameplay

- Answer questions correctly to earn points
- Maintain streaks for bonus points
- Track your progress with the level system
- Monitor your performance with the score display showing both correct and incorrect answers
- Toggle sound effects on/off as needed