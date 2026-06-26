# IELTS Retro Classroom Adventure 🎮🏫

An interactive, retro GameBoy-styled classroom simulation designed to make learning and practicing IELTS vocabulary and comprehension engaging and fun. Step into the shoes of a student, navigate a beautifully styled pixel-art CRT classroom, and interact with various objects to uncover clues, study materials, and complete exams!

---

## 🎨 Features & Highlights

- **Aesthetic CRT Design**: Implements a classic, handheld retro console interface complete with custom-crafted buttons, action triggers, and tactile vibration/sound simulation.
- **Ambient Web Audio Synth**: Includes an optional, procedural background soundscape that generates relaxing chords and soft melodies to help you focus.
- **Dynamic IELTS Clue System**: Interactive room items (Trash Can, Computer, Bookshelf, Student Desk, School Lockers, Blackboard, Window, Backpack) change description depending on active quest parameters.
- **Humorous Filler Text**: Added a procedural random factor that sprinkles easter eggs and jokes when interacting with default items.
- **Safety First Restart Prompt**: Includes confirmation dialogs to prevent resetting solved progress by accident.

---

## 🚀 Getting Started

### Prerequisites

You will need **Node.js** (v18 or higher recommended) and **npm** installed on your system.

### Installation

1. Clone or download your repository:
   ```bash
   git clone <your-repository-url>
   cd <your-repository-name>
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the Vite development server locally:
```bash
npm run dev
```
Once started, open [http://localhost:3000](http://localhost:3000) in your web browser.

### Building for Production

To compile and bundle the React and Tailwind assets for production:
```bash
npm run build
```
The compiled, production-ready static assets will be output to the `dist/` folder.

---

## 🌐 Deploying to GitHub Pages

This repository includes a pre-configured GitHub Actions deployment workflow (`.github/workflows/deploy.yml`) to build and host your classroom adventure for free on **GitHub Pages**:

1. **Push your code** to your GitHub repository (either `main` or `master` branch).
2. Go to your repository page on **GitHub**.
3. Click on the **Settings** tab.
4. Select **Pages** from the left navigation sidebar.
5. Under **Build and deployment** -> **Source**, change the dropdown selection from **Deploy from a branch** to **GitHub Actions**.
6. That's it! GitHub Actions will automatically compile the application and publish your site at `https://<your-username>.github.io/<your-repo-name>/`.

---

## 🕹️ Controls & Navigation

You can play using either the on-screen tactile GameBoy buttons or your computer keyboard:

- **Move Around**: Use **Arrow Keys** or **W, A, S, D** to walk around the classroom.
- **Action Button (A)**: Use **Spacebar** or **Enter** (or click the green on-screen **(A)** button) to inspect objects, progress dialogues, submit answers, or confirm resets.
- **Start / Reset Exam**: Click the **START** button or press on-screen reset to trigger a session reset.
- **Sound Toggle**: Use the **Volume** icon to enable/disable retro sound effects.
- **Ambient Music**: Use the **Music Note** icon to toggle the generative synthesizers on/off.

---

## 🛠️ Built With

- **React 19 & TypeScript**: Solid, strongly-typed front-end components.
- **Vite**: Ultra-fast bundling and local development.
- **Tailwind CSS**: Modern utility styling.
- **Motion**: Elegant layout transitions and interface animations.
- **Lucide Icons**: Clean vector iconography.
- **Web Audio API**: Real-time generative synthesizer context.
