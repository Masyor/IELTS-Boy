import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, RefreshCw, Trophy, HelpCircle, X, Award, Info, ArrowRight, Music } from "lucide-react";

// Fallback question bank in case external Questions.js isn't loaded
const fallbackQuestionBank = [
  {
    "id": 1,
    "question": "Which 4 core countries officially accept an IELTS score for migration?",
    "objectModifiers": {
      "trashcan": "There is a ripped travel brochure in the trash. It highlights: Australia, Canada, UK, and New Zealand.",
      "computer": "The screen flickers. A website shows visa requirements for: Australia, Canada, UK, and New Zealand.",
      "bookshelf": "You pull out a migration handbook. It lists 4 core countries: Australia, Canada, UK, and New Zealand.",
      "desk": "Carved into the wood: Migration open for Australia, Canada, UK, and New Zealand.",
      "lockers": "Tape onto a locker door: Focus on relocating to Australia, Canada, UK, or New Zealand.",
      "blackboard": "Erased text reveals: Migration Passports accepted in Australia, Canada, UK, NZ.",
      "window": "Looking out, you see flags representing Australia, Canada, UK, and New Zealand.",
      "backpack": "Inside the bag is a flyer: 'Move to Australia, Canada, UK, or New Zealand!'"
    },
    "acceptedAnswers": ["australia, canada, uk, new zealand", "uk, canada, australia, new zealand", "australia canada uk new zealand"]
  },
  {
    "id": 2,
    "question": "How long is the total IELTS test duration (excluding paper-based transfer time)?",
    "objectModifiers": {
      "trashcan": "A crushed schedule sheet reads: Total exam window approx. 2 hours 45 minutes.",
      "computer": "A digital timer on screen is set exactly to: 2 hours 45 minutes.",
      "bookshelf": "The spine of an official logbook is stamped: Total Timing = 2 hours 45 minutes.",
      "desk": "A student log card states: Test duration is approx. 2 hours 45 minutes.",
      "lockers": "A sticker inside a locker says: 'Sit tight! The test takes 2 hours 45 minutes.'",
      "blackboard": "Written in chalk: 'Total Test Block: Approx. 2 hours 45 minutes.'",
      "window": "The courtyard clock tower reflects a test runtime of 2 hours 45 minutes.",
      "backpack": "A digital watch inside is running a countdown from 2 hours 45 minutes."
    },
    "acceptedAnswers": ["2 hours 45 minutes", "2h 45m", "2 hours 45 mins", "2:45", "165 minutes", "165 mins"]
  },
  {
    "id": 3,
    "question": "In Speaking Part 2, how many minutes are you required to speak uninterrupted?",
    "objectModifiers": {
      "trashcan": "A discarded cue card has notes matching an uninterrupted 2 minute speech.",
      "computer": "An audio recorder program shows a recording length of exactly 2 minutes.",
      "bookshelf": "A booklet named 'Part 2 Mastery' says: Speak continuously for 2 minutes straight.",
      "desk": "A sticky note reads: 'Speaking Part 2 = Keep talking for a full 2 minutes!'",
      "lockers": "Graffiti on the panel says: 'Don't stop talking in Part 2 until 2 minutes are up!'",
      "blackboard": "Under the section 'Speaking': 'Part 2: Speak uninterrupted for 2 minutes.'",
      "window": "A bird chirps outside continuously for what feels like 2 minutes.",
      "backpack": "A flashcard inside states: 'Target speaking duration for Part 2: 2 minutes.'"
    },
    "acceptedAnswers": ["2 minutes", "2", "2 mins", "two minutes"]
  },
  {
    "id": 4,
    "question": "In Speaking Part 2, how much preparation time do you get to make notes?",
    "objectModifiers": {
      "trashcan": "An empty notepad page has scribble reading: '1 minute prep went too fast.'",
      "computer": "A countdown helper app displays: Preparation countdown = 1 minute.",
      "bookshelf": "A bookmark has an outline: 'Use your 1 minute of planning time wisely.'",
      "desk": "Pencil marks trace the words: 'You have exactly 1 minute to sketch your notes!'",
      "lockers": "A note magnet reads: 'Don't panic, you get 1 minute to outline your speech.'",
      "blackboard": "A flowchart note says: 'Card handed out -> 1 minute preparation time.'",
      "window": "The second hand on your watch ticks round exactly once (1 minute) for prep.",
      "backpack": "A note scratched on a scrap paper: 'Prep time limit is exactly 1 minute.'"
    },
    "acceptedAnswers": ["1 minute", "1", "1 min", "one minute"]
  },
  {
    "id": 5,
    "question": "How many total questions are there in the Listening test?",
    "objectModifiers": {
      "trashcan": "A graded score sheet shows an exam tally out of 40 total questions.",
      "computer": "An online answer sheet is numbered from 1 down to 40 questions.",
      "bookshelf": "A syllabus states: 'The Listening Section comprises exactly 40 questions.'",
      "desk": "Scratched into the corner: '40 listening questions to clear!'",
      "lockers": "A jersey inside has the number 40 with the label 'Listening Items'.",
      "blackboard": "A summary chart reads: 'Listening Test: 4 Parts, 40 Questions.'",
      "window": "There are exactly 40 panes of glass on the large window frame.",
      "backpack": "A practice sheet bundle contains a packet labeled: '40 Listening Questions Total.'"
    },
    "acceptedAnswers": ["40", "40 questions", "forty"]
  },
  {
    "id": 6,
    "question": "How many minutes long is the Listening test duration?",
    "objectModifiers": {
      "trashcan": "A broken stopwatch is frozen at the 30 minutes mark for the audio run.",
      "computer": "An audio track progress bar shows a runtime of exactly 30 minutes.",
      "bookshelf": "An instructional pamphlet states: Listening section runtime = 30 minutes.",
      "desk": "A sticky reminder says: 'Keep focus high for all 30 minutes of Listening.'",
      "lockers": "An old timetable has a block reading: 'IELTS Listening Audio: 30 minutes.'",
      "blackboard": "Written prominently: 'Listening Session Length = 30 minutes.'",
      "window": "The sun position indicates a quick 30 minutes session for the listening block.",
      "backpack": "An exam confirmation card reads: 'Listening audio duration: 30 minutes.'"
    },
    "acceptedAnswers": ["30", "30 minutes", "30 mins", "thirty minutes"]
  },
  {
    "id": 7,
    "question": "How many minutes do you have to complete the entire Academic Reading test?",
    "objectModifiers": {
      "trashcan": "A crushed warning note reads: 'Ran out of time during the 60 minutes reading limit.'",
      "computer": "A lock screen warning states: 'Reading Module Session limit: 60 minutes.'",
      "bookshelf": "A reading strategy book reads: 'You must complete all 3 sections in 60 minutes.'",
      "desk": "A time chart pasted down shows: 'Reading Test Window = 60 minutes.'",
      "lockers": "A calendar schedule lists: '10:00 to 11:00 AM - Reading Exam (60 minutes).'",
      "blackboard": "A header notice reads: 'Academic Reading Module: 60 minutes total.'",
      "window": "The bell rings outside indicating the completion of an entire 60 minutes block.",
      "backpack": "A textbook bookmark states: 'Simulate real conditions: set timer to 60 minutes.'"
    },
    "acceptedAnswers": ["60", "60 minutes", "60 mins", "sixty minutes"]
  },
  {
    "id": 8,
    "question": "Is spelling marked strictly and considered important in the Reading test?",
    "objectModifiers": {
      "trashcan": "A paper with 'speling' crossed out in red ink confirms: Yes, spelling is vital.",
      "computer": "A spellcheck error pop-up states: Correct spelling is required to score points.",
      "bookshelf": "A dictionary preface warns: 'In the reading module, spelling accuracy matters. Yes.'",
      "desk": "Carved into the desk: 'Check your spellings! Points are lost if you get it wrong. Yes.'",
      "lockers": "A flashcard on a locker hook says: 'Is spelling important? Absolutely Yes!'",
      "blackboard": "A reminder notice reads: 'Spelling counts in your final answer key. Yes!'",
      "window": "A clean view reminds you that clarity and accurate spelling are required. Yes.",
      "backpack": "A red-pen corrected mock text warns: Incorrect spelling costs points. Yes."
    },
    "acceptedAnswers": ["yes", "it is", "true"]
  },
  {
    "id": 9,
    "question": "Which Writing Task is worth double points and should always be done first?",
    "objectModifiers": {
      "trashcan": "A messy essay outline says: 'Spend 40 minutes on Task 2 because it is worth double points.'",
      "computer": "An open document editor reads: 'Strategy Alert: Do Task 2 first to secure double value.'",
      "bookshelf": "An IELTS guidebook is bookmarked: 'Task 2 yields double weights. Prioritize it.'",
      "desk": "Scratched into the laminate: 'Task 2 = Double Points. Start here!'",
      "lockers": "A note card inside reads: 'Do not waste time on Task 1 first. Task 2 is worth double.'",
      "blackboard": "A bulleted point reads: 'Writing Strategy: Task 2 is worth twice as much as Task 1.'",
      "window": "Looking through the double panes reminds you: Task 2 holds double the value.",
      "backpack": "A notebook header reads: 'CRITICAL: Task 2 is worth double points! Start with it!'"
    },
    "acceptedAnswers": ["task 2", "2", "writing task 2"]
  }
];

// Baseline descriptions for the exactly 8 interactive objects
const baselineDescriptions: { [key: string]: string } = {
  trashcan: "Eew, why am I rooting around in the trash?",
  computer: "The computer is turned off.",
  bookshelf: "Just a bunch of old, dusty textbooks.",
  desk: "An empty student desk.",
  lockers: "A row of standard school lockers.",
  blackboard: "Clean slate. Nothing written here.",
  window: "You look outside. Weather looks nice.",
  backpack: "An unzipped backpack with some loose pens."
};

// Multiple funny text strings for each object used as humorous filler
const funnyStrings: { [key: string]: string[] } = {
  trashcan: [
    "You find a half-eaten banana. It doesn't care about IELTS.",
    "Nothing here but the hopes and dreams of students who didn't pass GEP12.",
    "A discarded coffee cup.",
    "You find a crumpled tissue. Don't touch it."
  ],
  computer: [
    "You try to open Solitaire, but the teacher blocked it. Devastating.",
    "A screensaver of a flying toaster is playing. Very 90s.",
    "The browser history is just searches for: 'how to score band 9 in 2 hours'.",
    "An email is open: 'Dear student, your library book is 4 years overdue.'"
  ],
  bookshelf: [
    "A dictionary is open to the word: 'Procrastination'. How fitting.",
    "You find a dusty copy of 'IELTS for Toddlers'. Seems a bit advanced.",
    "A book titled 'How to Speak Fluent Seagull' has been checked out 50 times.",
    "An ancient scroll labeled 'Secrets of Band 10' is completely blank inside.",
    "The shelves are smelling faintly of old paper and broken pencil lead."
  ],
  desk: [
    "Someone carved 'HELP ME' into the desk, followed by a sad face.",
    "A dry piece of chewing gum is stuck underneath. True archaeological treasure.",
    "You find a doodle of a giant monster destroying an IELTS testing center.",
    "An empty ink cartridge with a scribbled note: 'This tasted terrible'",
    "A pencil outline of a keyboard. You press 'F' to pay respects."
  ],
  lockers: [
    "A gym locker containing a single, extremely smelly sock. High hazard level.",
    "You open a locker and find a mirror. A true genius is looking back at you.",
    "A forgotten lunch box containing a sandwich that has achieved sentience.",
    "A locker jam-packed with crumpled loose-leaf sheets of paper."
  ],
  blackboard: [
    "A dusty chalkboard drawing of a cat wearing a tophat.",
    "Written in the corner: 'Do not eat the chalk. It is not candy.'",
    "A math equation that somehow equals 'Study Harder'. Interesting math.",
    "A chalkboard eraser is resting here, waiting to silence your mistakes."
  ],
  window: [
    "You see a squirrel outside doing parkour on a tree branch. 10/10 performance.",
    "The glass is smudged with a handprint. Someone wanted to escape this test.",
    "A pigeon is staring at you with judging eyes. Somehow you know that t thinks your grammar is weak.",
    "The sun is shining, but the classroom remains cool, quiet, and CRT-tinted.",
    "A heavy raindrop runs down the windowpane. It's racing another raindrop."
  ],
  backpack: [
    "A copy of Ready For IELTS is inside. It's so heavy it could be used for self-defense.",
    "You find three broken pencil tips and a single blue pen cap.",
    "A pocket dictionary that is missing all words starting with 'I'. How ironic.",
    "A plastic key tag reading: 'I survived Writing Task 2 (barely).'",
    "A packet of mints. Empty. A tragedy in one act."
  ]
};

const objectLabels: { [key: string]: string } = {
  trashcan: "Trash Can",
  computer: "Computer Desk",
  bookshelf: "Bookshelf",
  desk: "Student Desk",
  lockers: "School Lockers",
  blackboard: "Blackboard",
  window: "Large Window",
  backpack: "Backpack"
};

// Rectangles for AABB collision detection in 400x400 canvas
interface Obstacle {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sound/Vibration simulation states
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Web Audio ambient music synthesizer state and references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<any>(null);

  // Game Engine state managed in refs for performance (avoid re-render lag)
  const playerRef = useRef({
    x: 200,
    y: 280,
    w: 20,
    h: 24,
    speed: 2.6,
    facing: "down",
    isMoving: false,
    shoved: false
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    Space: false
  });

  // State machine and questions management
  const [questionQueue, setQuestionQueue] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [clueDistribution, setClueDistribution] = useState<{ [key: string]: string }>({});
  const activeObjectRangeRef = useRef<string | null>(null);

  // Conversation & Dialogue Overlay state
  const [dialogActive, setDialogActive] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogFullText, setDialogFullText] = useState("");
  const [dialogDisplayText, setDialogDisplayText] = useState("");
  const [dialogMode, setDialogMode] = useState<"inspect" | "teacher_question" | "teacher_shove" | "teacher_correct" | "completed">("inspect");
  
  // Selection choice index for dialogue questions (0: Answer, 1: I don't know)
  const [teacherChoiceIndex, setTeacherChoiceIndex] = useState(0);

  // Absolute input entry state
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [enteredAnswer, setEnteredAnswer] = useState("");
  const [feedbackFlash, setFeedbackFlash] = useState<"correct" | "incorrect" | null>(null);

  // Win State
  const [hasGraduated, setHasGraduated] = useState(false);
  const [showGraduationSplash, setShowGraduationSplash] = useState(false);
  const [stats, setStats] = useState({
    attempts: 0,
    failures: 0,
    startTime: Date.now(),
    endTime: Date.now()
  });

  // Prompt reset confirmation modal states
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetChoiceIndex, setResetChoiceIndex] = useState(0); // 0: Keep Playing, 1: Restart

  // Synchronized refs to allow the canvas game loop to read the latest state values without rebuilding the loop
  const dialogActiveRef = useRef(dialogActive);
  useEffect(() => {
    dialogActiveRef.current = dialogActive;
  }, [dialogActive]);

  const showAnswerInputRef = useRef(showAnswerInput);
  useEffect(() => {
    showAnswerInputRef.current = showAnswerInput;
  }, [showAnswerInput]);

  const showGraduationSplashRef = useRef(showGraduationSplash);
  useEffect(() => {
    showGraduationSplashRef.current = showGraduationSplash;
  }, [showGraduationSplash]);

  const showResetConfirmRef = useRef(showResetConfirm);
  useEffect(() => {
    showResetConfirmRef.current = showResetConfirm;
  }, [showResetConfirm]);

  const resetChoiceIndexRef = useRef(resetChoiceIndex);
  useEffect(() => {
    resetChoiceIndexRef.current = resetChoiceIndex;
  }, [resetChoiceIndex]);

  // Exactly 8 interactive objects with elegant symmetrical padding to avoid wall-clipping
  const obstacles = useRef<Obstacle[]>([
    { id: "window", label: "Large Window", x: 80, y: 15, w: 40, h: 25 },
    { id: "blackboard", label: "Blackboard", x: 160, y: 10, w: 80, h: 30 },
    { id: "lockers", label: "School Lockers", x: 22, y: 100, w: 30, h: 100 },
    { id: "bookshelf", label: "Bookshelf", x: 348, y: 120, w: 30, h: 90 },
    { id: "trashcan", label: "Trash Can", x: 45, y: 320, w: 25, h: 25 },
    { id: "computer", label: "Computer Desk", x: 75, y: 180, w: 55, h: 35 },
    { id: "desk", label: "Student Desk", x: 270, y: 190, w: 45, h: 35 },
    { id: "backpack", label: "Backpack", x: 285, y: 325, w: 22, h: 22 }
  ]);

  // Teacher NPC and Locked Door details
  const teacherNPC = useRef({
    x: 215,
    y: 80,
    w: 30,
    h: 30,
    label: "Grumpy Teacher"
  });

  const exitDoor = useRef({
    x: 315,
    y: 10,
    w: 45,
    h: 30,
    locked: true
  });

  // Sound effects synthesis using Web Audio API
  const playSound = (type: "select" | "correct" | "wrong" | "text" | "door") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (type === "select") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "text") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "correct") {
        // Double ding!
        [0, 0.08].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(idx === 0 ? 523.25 : 659.25, ctx.currentTime + delay); // C5 then E5
          gain.gain.setValueAtTime(0.05, ctx.currentTime + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 0.2);
        });
      } else if (type === "wrong") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "door") {
        // Shrill fanfare
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      console.warn("Audio context blocked or unsupported:", e);
    }
  };

  // 1.5. Relaxing procedural ambient background music using standard Web Audio API oscillators
  const startAmbientMusic = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      let tickCount = 0;
      const chimeScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C major pentatonic (C4, D4, E4, G4, A4, C5, D5, E5)
      const padChords = [
        [130.81, 196.00, 261.63], // C3, G3, C4
        [146.83, 220.00, 293.66], // D3, A3, D4
        [174.61, 261.63, 349.23], // F3, C4, F4
        [220.00, 329.63, 440.00]  // A3, E4, A4
      ];

      const masterVolume = ctx.createGain();
      masterVolume.gain.setValueAtTime(0.06, ctx.currentTime); // Gentle low baseline volume
      masterVolume.connect(ctx.destination);

      const playTick = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") return;
        const now = ctx.currentTime;

        // Swelling synth-pad chord backing every 6 seconds (4 ticks of 1.5s)
        if (tickCount % 4 === 0) {
          const chordIdx = Math.floor(tickCount / 4) % padChords.length;
          const freqs = padChords[chordIdx];

          freqs.forEach(freq => {
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, now);

            filter.type = "lowpass";
            filter.frequency.setValueAtTime(350, now); // Low-pass filter for cozy warmth

            // Swell envelope: slow rise, sustain, fade out
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.04, now + 2);
            gain.gain.setValueAtTime(0.04, now + 4);
            gain.gain.linearRampToValueAtTime(0, now + 6);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(masterVolume);

            osc.start(now);
            osc.stop(now + 6.1);
          });
        }

        // Random sweet, high-pitched chime droplet (80% chance every tick)
        if (Math.random() < 0.8) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          const randomFreq = chimeScale[Math.floor(Math.random() * chimeScale.length)];
          osc.type = "sine";
          osc.frequency.setValueAtTime(randomFreq, now);

          filter.type = "bandpass";
          filter.frequency.setValueAtTime(randomFreq, now);
          filter.Q.setValueAtTime(1.5, now);

          // Fast pluck attack, slow bell-like release
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.1, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(masterVolume);

          osc.start(now);
          osc.stop(now + 2.5);
        }

        tickCount++;
      };

      playTick();
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
      }
      musicIntervalRef.current = setInterval(playTick, 1500);
    } catch (err) {
      console.warn("Failed to boot ambient synth loop:", err);
    }
  };

  const stopAmbientMusic = () => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
  };

  const handleResetRequest = (soundType: "select" | "door" = "select") => {
    playSound(soundType);
    if ((stats.attempts > 0 || currentQuestionIndex > 0) && !showGraduationSplash) {
      setShowResetConfirm(true);
      setResetChoiceIndex(0); // Choose "No, keep playing" as safe default
    } else {
      initGame();
    }
  };

  // 1. Shuffles and initializes IELTS questions
  const initGame = () => {
    const rawBank = (window as any).ieltsQuestionBank || fallbackQuestionBank;
    // Shuffle the bank
    const shuffled = [...rawBank].sort(() => Math.random() - 0.5);
    setQuestionQueue(shuffled);
    setCurrentQuestionIndex(0);
    setHasGraduated(false);
    setShowGraduationSplash(false);
    exitDoor.current.locked = true;
    playerRef.current.x = 200;
    playerRef.current.y = 280;
    playerRef.current.facing = "down";
    
    setStats({
      attempts: 0,
      failures: 0,
      startTime: Date.now(),
      endTime: Date.now()
    });

    configureActiveClues(shuffled, 0);
    setDialogActive(false);
    setShowAnswerInput(false);
  };

  // Configure target clue & red herrings dynamically
  const configureActiveClues = (shuffledList: any[], index: number) => {
    if (shuffledList.length === 0 || index >= shuffledList.length) return;

    const activeQ = shuffledList[index];
    const objectKeys = Object.keys(baselineDescriptions); // Exactly 8 keys
    
    // Pick 1 target container
    const targetContainer = objectKeys[Math.floor(Math.random() * objectKeys.length)];
    
    // Pick 3 red herrings from the remaining 7 objects
    const remainingForHerrings = objectKeys.filter(k => k !== targetContainer);
    const shuffledHerrings = [...remainingForHerrings].sort(() => Math.random() - 0.5).slice(0, 3);
    
    // Find other questions to pull random red herrings from
    const rawBank = (window as any).ieltsQuestionBank || fallbackQuestionBank;
    const otherQuestions = rawBank.filter((q: any) => q.id !== activeQ.id);

    const newClues: { [key: string]: string } = {};
    const defaultKeys: string[] = [];

    objectKeys.forEach(objKey => {
      if (objKey === targetContainer) {
        // The core answer clue!
        newClues[objKey] = activeQ.objectModifiers[objKey] || baselineDescriptions[objKey];
      } else if (shuffledHerrings.includes(objKey)) {
        // Red herring! Pick a random other question and extract its modifier for this key
        const randomOtherQ = otherQuestions[Math.floor(Math.random() * otherQuestions.length)] || activeQ;
        newClues[objKey] = randomOtherQ.objectModifiers[objKey] || baselineDescriptions[objKey];
      } else {
        // Default baseline text
        newClues[objKey] = baselineDescriptions[objKey];
        defaultKeys.push(objKey);
      }
    });

    // 20% chance of picking one of the default keys to receive a funny text string appropriate to the object
    if (defaultKeys.length > 0 && Math.random() < 0.20) {
      const chosenDefaultKey = defaultKeys[Math.floor(Math.random() * defaultKeys.length)];
      const choices = funnyStrings[chosenDefaultKey];
      if (choices && choices.length > 0) {
        newClues[chosenDefaultKey] = choices[Math.floor(Math.random() * choices.length)];
      }
    }

    setClueDistribution(newClues);
  };

  // Typewriter effect for dialog boxes
  const textTimer = useRef<any>(null);
  useEffect(() => {
    if (dialogActive && dialogFullText.length > 0) {
      setDialogDisplayText("");
      let index = 0;
      if (textTimer.current) clearInterval(textTimer.current);

      textTimer.current = setInterval(() => {
        index++;
        setDialogDisplayText(dialogFullText.substring(0, index));
        if (index % 2 === 0) playSound("text");
        
        if (index >= dialogFullText.length) {
          clearInterval(textTimer.current);
        }
      }, 20);
    } else {
      setDialogDisplayText("");
      if (textTimer.current) clearInterval(textTimer.current);
    }
    return () => {
      if (textTimer.current) clearInterval(textTimer.current);
    };
  }, [dialogActive, dialogFullText]);

  // Dynamic state calculations
  const activeQuestion = questionQueue[currentQuestionIndex];

  // Shove player back when wrong
  const triggerShoveBack = () => {
    playerRef.current.shoved = true;
    const shoveDist = 55;
    
    // Push away from teacher's desk (which is around x=215, y=110)
    // Moving them directly downwards toward bottom of the map is safest
    const targetY = Math.min(320, playerRef.current.y + shoveDist);
    
    let currentShove = 0;
    const interval = setInterval(() => {
      if (playerRef.current.y < targetY) {
        playerRef.current.y += 4;
        currentShove += 4;
      } else {
        clearInterval(interval);
        playerRef.current.shoved = false;
      }
    }, 16);
  };

  // Check the answer submitted
  const handleAnswerSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeQuestion) return;

    setStats(prev => ({ ...prev, attempts: prev.attempts + 1 }));
    setShowAnswerInput(false);
    
    const preparedAnswer = enteredAnswer.toLowerCase().trim();
    const correctAnswers = activeQuestion.acceptedAnswers.map((a: string) => a.toLowerCase().trim());
    
    // Check match
    const isCorrect = correctAnswers.some((ans: string) => preparedAnswer.includes(ans) || ans.includes(preparedAnswer) && preparedAnswer.length > 2);

    if (isCorrect) {
      playSound("correct");
      setFeedbackFlash("correct");
      setTimeout(() => setFeedbackFlash(null), 900);

      const nextIndex = currentQuestionIndex + 1;
      
      if (nextIndex >= questionQueue.length) {
        // WIN - Unleash exit
        playSound("door");
        exitDoor.current.locked = false;
        
        // Move the grumpy teacher to the side (col 4, row 2 / x=150) so exit door is completely unblocked!
        teacherNPC.current.x = 120;
        teacherNPC.current.y = 80;

        setDialogTitle("Grumpy Teacher");
        setDialogFullText("WHAT?! You actually answered all my questions correctly? Unbelievable... Fine! The Exit Door is unlocked. Go on, graduate! Get out of my face!");
        setDialogMode("completed");
        setDialogActive(true);
        setHasGraduated(true);
      } else {
        setCurrentQuestionIndex(nextIndex);
        configureActiveClues(questionQueue, nextIndex);
        
        setDialogTitle("Grumpy Teacher");
        setDialogFullText("Hmph, you got it right. Lucky guess! But don't think you're smart yet. Go find clues for my NEXT question!");
        setDialogMode("teacher_correct");
        setDialogActive(true);
      }
    } else {
      playSound("wrong");
      setFeedbackFlash("incorrect");
      setStats(prev => ({ ...prev, failures: prev.failures + 1 }));
      setTimeout(() => setFeedbackFlash(null), 600);

      setDialogTitle("Grumpy Teacher");
      setDialogFullText("WRONG! Absurd! Just as I suspected! Keep searching, you slacker!");
      setDialogMode("teacher_shove");
      setDialogActive(true);
      
      triggerShoveBack();
    }
    setEnteredAnswer("");
  };

  // Initialize game on mount
  useEffect(() => {
    initGame();
  }, []);

  // Use refs to store latest keyboard handlers to avoid stale closures and infinite loop re-bindings
  const handleKeyDownRef = useRef<((e: KeyboardEvent) => void) | null>(null);
  const handleKeyUpRef = useRef<((e: KeyboardEvent) => void) | null>(null);

  // Keep the handlers fresh with the latest state updates
  useEffect(() => {
    handleKeyDownRef.current = (e: KeyboardEvent) => {
      const isInputFocused = document.activeElement?.tagName === "INPUT";
      // Prevent scrolling defaults for arrows & space & enter
      if (!isInputFocused && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "KeyW", "KeyS", "KeyA", "KeyD", "Enter"].includes(e.code)) {
        e.preventDefault();
      }

      keysPressed.current[e.code] = true;

      // Handle Dialog Interactivity via Space/Enter/A button
      if (!isInputFocused && (e.code === "Space" || e.code === "Enter")) {
        handleActionPress();
      }

      // Handle Reset Confirmation inputs
      if (showResetConfirm) {
        if (e.key === "1") {
          playSound("select");
          setResetChoiceIndex(0); // Choose NO, KEEP PLAYING
        } else if (e.key === "2") {
          playSound("select");
          setResetChoiceIndex(1); // Choose YES, RESTART
        } else if (["ArrowUp", "KeyW"].includes(e.code)) {
          playSound("select");
          setResetChoiceIndex(0);
        } else if (["ArrowDown", "KeyS"].includes(e.code)) {
          playSound("select");
          setResetChoiceIndex(1);
        }
        return;
      }

      // Quick numbers choice trigger or arrow selection if teacher is asking questions
      if (dialogActive && dialogMode === "teacher_question" && !showAnswerInput) {
        if (e.key === "1") {
          playSound("select");
          setTeacherChoiceIndex(0);
          setShowAnswerInput(true);
        } else if (e.key === "2") {
          playSound("select");
          setTeacherChoiceIndex(1);
          setDialogFullText("Just as I expected! Don't just stand around, the answers are somewhere in the school. Go find them!");
          setDialogMode("inspect");
        } else if (["ArrowUp", "KeyW"].includes(e.code)) {
          playSound("select");
          setTeacherChoiceIndex(0);
        } else if (["ArrowDown", "KeyS"].includes(e.code)) {
          playSound("select");
          setTeacherChoiceIndex(1);
        }
      }
    };

    handleKeyUpRef.current = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };
  });

  // Global listener setup - registered only once on mount
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (handleKeyDownRef.current) {
        handleKeyDownRef.current(e);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (handleKeyUpRef.current) {
        handleKeyUpRef.current(e);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      stopAmbientMusic();
    };
  }, []);

  // GameBoy on-screen action clicker
  const handleActionPress = () => {
    // If reset confirmation is active
    if (showResetConfirmRef.current) {
      playSound("select");
      if (resetChoiceIndexRef.current === 1) {
        initGame();
      }
      setShowResetConfirm(false);
      return;
    }

    // If dialogue is active
    if (dialogActive) {
      if (dialogDisplayText.length < dialogFullText.length) {
        // Complete reading instantly
        setDialogDisplayText(dialogFullText);
        return;
      }

      playSound("select");

      if (dialogMode === "inspect" || dialogMode === "teacher_shove" || dialogMode === "teacher_correct" || dialogMode === "completed") {
        // Just close the box
        setDialogActive(false);
      } else if (dialogMode === "teacher_question") {
        if (teacherChoiceIndex === 0) {
          // Open text overlay input
          setShowAnswerInput(true);
        } else {
          // Reject option selected
          setDialogFullText("Just as I expected! Don't just stand around, the answers are somewhere in the school. Go find them!");
          setDialogMode("inspect");
        }
      }
      return;
    }

    // Otherwise look for interactions
    const activeRange = activeObjectRangeRef.current;
    if (activeRange) {
      playSound("select");
      if (activeRange === "teacher") {
        setDialogTitle("Grumpy Teacher");
        setTeacherChoiceIndex(0);
        
        if (hasGraduated) {
          setDialogFullText("You already passed! The door is wide open, escape while you still can!");
          setDialogMode("completed");
        } else if (activeQuestion) {
          setDialogFullText(`Oh, you want to graduate, huh? Why don't you tell me:\n\n"${activeQuestion.question}"`);
          setDialogMode("teacher_question");
        }
        setDialogActive(true);
      } else {
        // Read assigned clue modifier!
        const clueText = clueDistribution[activeRange] || baselineDescriptions[activeRange];
        setDialogTitle(objectLabels[activeRange] || "School Object");
        setDialogFullText(clueText);
        setDialogMode("inspect");
        setDialogActive(true);
      }
    }
  };

  // Touch triggers that simulate actual key states for smooth holding down
  const touchDirectionStart = (key: string) => {
    keysPressed.current[key] = true;

    if (dialogActive && dialogMode === "teacher_question" && !showAnswerInput) {
      if (key === "ArrowUp" || key === "KeyW") {
        playSound("select");
        setTeacherChoiceIndex(0);
      } else if (key === "ArrowDown" || key === "KeyS") {
        playSound("select");
        setTeacherChoiceIndex(1);
      }
    }
  };

  const touchDirectionEnd = (key: string) => {
    keysPressed.current[key] = false;
  };

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frameCount = 0;

    const gameLoop = () => {
      frameCount++;
      ctx.clearRect(0, 0, 400, 400);

      // --- MOVEMENT ENGINE (ONLY IN ABSENCE OF DIALOGS) ---
      const player = playerRef.current;
      const keys = keysPressed.current;
      player.isMoving = false;

      if (!dialogActiveRef.current && !showAnswerInputRef.current && !showGraduationSplashRef.current && !player.shoved && !showResetConfirmRef.current) {
        let dx = 0;
        let dy = 0;

        if (keys.ArrowUp || keys.KeyW) {
          dy = -player.speed;
          player.facing = "up";
          player.isMoving = true;
        } else if (keys.ArrowDown || keys.KeyS) {
          dy = player.speed;
          player.facing = "down";
          player.isMoving = true;
        }

        if (keys.ArrowLeft || keys.KeyA) {
          dx = -player.speed;
          player.facing = "left";
          player.isMoving = true;
        } else if (keys.ArrowRight || keys.KeyD) {
          dx = player.speed;
          player.facing = "right";
          player.isMoving = true;
        }

        // Apply movement with collision detection
        const nextX = player.x + dx;
        const nextY = player.y + dy;

        // Bounding check (Keep in classroom floor walls)
        // Walls thickness around: Left=40, Right=360, Top=40, Bottom=360
        let colX = false;
        let colY = false;

        // Player bounding box (slighly inset to feel smooth)
        const getPlayerRect = (px: number, py: number) => ({
          x: px + 3,
          y: py + 8,
          w: player.w - 6,
          h: player.h - 8
        });

        // Function checking rect overlap
        const rectsOverlap = (r1: any, r2: any) => {
          return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
        };

        const testPlayerRectX = getPlayerRect(nextX, player.y);
        const testPlayerRectY = getPlayerRect(player.x, nextY);

        // Check boundaries
        if (testPlayerRectX.x < 35 || testPlayerRectX.x + testPlayerRectX.w > 365) colX = true;
        if (testPlayerRectY.y < 35 || testPlayerRectY.y + testPlayerRectY.h > 365) {
          // If door is unlocked, let them walk through exit coordinate (x: 315-360, y: 0-40)
          const onDoorWay = testPlayerRectY.x >= 310 && testPlayerRectY.x + testPlayerRectY.w <= 360;
          if (onDoorWay && !exitDoor.current.locked) {
            // Let them exit upward
            if (testPlayerRectY.y < 5 && !showGraduationSplashRef.current) {
              setStats(prev => ({ ...prev, endTime: Date.now() }));
              setShowGraduationSplash(true);
            }
          } else {
            colY = true;
          }
        }

        // Check objects collision
        obstacles.current.forEach(obs => {
          if (rectsOverlap(testPlayerRectX, obs)) colX = true;
          if (rectsOverlap(testPlayerRectY, obs)) colY = true;
        });

        // Check teacher collision
        const teacherRect = {
          x: teacherNPC.current.x,
          y: teacherNPC.current.y,
          w: teacherNPC.current.w,
          h: teacherNPC.current.h
        };
        if (rectsOverlap(testPlayerRectX, teacherRect)) colX = true;
        if (rectsOverlap(testPlayerRectY, teacherRect)) colY = true;

        if (!colX) player.x = nextX;
        if (!colY) player.y = nextY;
      }

      // --- INSPECT PROXIMITY DETECTION ---
      let closeObject: string | null = null;
      const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      };

      // Check objects adjacency
      obstacles.current.forEach(obs => {
        const obsCenterX = obs.x + obs.w / 2;
        const obsCenterY = obs.y + obs.h / 2;
        const playerCenterX = player.x + player.w / 2;
        const playerCenterY = player.y + player.h / 2;
        const dist = getDistance(playerCenterX, playerCenterY, obsCenterX, obsCenterY);
        
        // Threshold for interactive bubble
        if (dist < 42) {
          closeObject = obs.id;
        }
      });

      // Check teacher adjacency
      const teacherCenterX = teacherNPC.current.x + teacherNPC.current.w / 2;
      const teacherCenterY = teacherNPC.current.y + teacherNPC.current.h / 2;
      const tDist = getDistance(player.x + player.w/2, player.y + player.h/2, teacherCenterX, teacherCenterY);
      if (tDist < 42) {
        closeObject = "teacher";
      }

      activeObjectRangeRef.current = closeObject;


      // --- CANVAS RENDERING (CLASSROOM) ---

      // 1. Draw floor tiles
      const tileSize = 40;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          ctx.fillStyle = (i + j) % 2 === 0 ? "#e5dbc9" : "#decfa8";
          ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
          
          // Draw faint tile outline
          ctx.strokeStyle = "rgba(0,0,0,0.03)";
          ctx.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }

      // 2. Draw classroom wall panel at the top (row 0)
      ctx.fillStyle = "#4a5568"; // slate-600 top wall
      ctx.fillRect(0, 0, 400, 40);
      
      // Wooden molding
      ctx.fillStyle = "#854d0e"; // yellow-800 wood
      ctx.fillRect(0, 35, 400, 6);

      // Side wall borders
      ctx.fillStyle = "#334155";
      ctx.fillRect(0, 0, 15, 400); // left wall border
      ctx.fillRect(385, 0, 15, 400); // right wall border
      ctx.fillRect(0, 385, 400, 15); // bottom border

      // 3. Draw Sunlight Effect streaming from the window
      ctx.fillStyle = "rgba(253, 224, 71, 0.12)"; // Yellow sunlight
      ctx.beginPath();
      ctx.moveTo(85, 20); // Window top-left
      ctx.lineTo(135, 20); // Window top-right
      ctx.lineTo(240, 400); // Cast to floor
      ctx.lineTo(140, 400); // Cast to floor
      ctx.closePath();
      ctx.fill();

      // 4. Draw Exit Door
      const door = exitDoor.current;
      ctx.fillStyle = door.locked ? "#5c2e0b" : "#166534"; // red/brown locked, green unlocked
      ctx.fillRect(door.x, door.y, door.w, door.h);
      ctx.strokeStyle = "#27272a";
      ctx.lineWidth = 3;
      ctx.strokeRect(door.x, door.y, door.w, door.h);

      // Door window panel
      ctx.fillStyle = door.locked ? "rgba(239, 68, 68, 0.4)" : "rgba(34, 197, 94, 0.6)";
      ctx.fillRect(door.x + 12, door.y + 4, 21, 10);
      ctx.strokeRect(door.x + 12, door.y + 4, 21, 10);

      // Gold doorknob
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(door.x + 8, door.y + 18, 3, 0, Math.PI * 2);
      ctx.fill();

      // EXIT text indicator above door
      ctx.fillStyle = door.locked ? "#ef4444" : "#22c55e";
      ctx.font = "bold 8px system-ui";
      ctx.fillText(door.locked ? "LOCKED" : "OPEN!", door.x + 6, door.y - 3);

      // 5. Draw static classroom objects
      obstacles.current.forEach(obs => {
        ctx.save();
        
        // Shadows underneath objects
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(obs.x + 3, obs.y + obs.h - 5, obs.w, 8);

        if (obs.id === "window") {
          // Draw dual frame glass windows
          ctx.fillStyle = "#0284c7"; // deep sky blue
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          // Diagonal reflection
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + 10);
          ctx.lineTo(obs.x + 20, obs.y);
          ctx.lineTo(obs.x + 28, obs.y);
          ctx.lineTo(obs.x, obs.y + 14);
          ctx.fill();

          ctx.strokeStyle = "#e4e4e7"; // white window framing
          ctx.lineWidth = 2;
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
          // Center pane divider
          ctx.beginPath();
          ctx.moveTo(obs.x + obs.w / 2, obs.y);
          ctx.lineTo(obs.x + obs.w / 2, obs.y + obs.h);
          ctx.stroke();

        } else if (obs.id === "blackboard") {
          // Green blackboard
          ctx.fillStyle = "#1e3f20"; // Chalkboard green
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          
          // Chalk scribbles (letters & math)
          ctx.strokeStyle = "rgba(255,255,255,0.7)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          // Draw "IELTS" style squiggles
          ctx.moveTo(obs.x + 10, obs.y + 10);
          ctx.lineTo(obs.x + 12, obs.y + 15);
          ctx.lineTo(obs.x + 15, obs.y + 10);
          // Drawing a tiny square
          ctx.strokeRect(obs.x + 25, obs.y + 8, 8, 8);
          // Arrow pointing
          ctx.moveTo(obs.x + 45, obs.y + 12);
          ctx.lineTo(obs.x + 65, obs.y + 12);
          ctx.lineTo(obs.x + 60, obs.y + 9);
          ctx.stroke();

          // Wooden board outline
          ctx.strokeStyle = "#a16207"; // gold-700 wooden frame
          ctx.lineWidth = 3;
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

        } else if (obs.id === "lockers") {
          // Steel school lockers
          ctx.fillStyle = "#3b82f6"; // locker blue
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.fillStyle = "#1d4ed8"; // darker locker section
          ctx.fillRect(obs.x + 2, obs.y + 2, obs.w - 4, obs.h - 4);
          
          // Locker dividers & vents
          ctx.strokeStyle = "#1e3a8a";
          ctx.lineWidth = 1.5;
          for (let ly = obs.y + 15; ly < obs.y + obs.h; ly += 25) {
            ctx.strokeRect(obs.x + 4, ly, obs.w - 8, 1);
            // tiny silver lock handles
            ctx.fillStyle = "#cbd5e1";
            ctx.fillRect(obs.x + obs.w - 8, ly + 8, 3, 5);
          }

        } else if (obs.id === "bookshelf") {
          // Wooden bookshelf with stacked colorful books
          ctx.fillStyle = "#b45309"; // shelf brown
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          
          // Shelves lines
          ctx.fillStyle = "#78350f";
          ctx.fillRect(obs.x + 2, obs.y + 5, obs.w - 4, 3);
          ctx.fillRect(obs.x + 2, obs.y + 30, obs.w - 4, 3);
          ctx.fillRect(obs.x + 2, obs.y + 55, obs.w - 4, 3);
          ctx.fillRect(obs.x + 2, obs.y + 80, obs.w - 4, 3);

          // Books - Using integer index sequences for 100% deterministic, flash-free book rendering
          const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
          const shelves = [obs.y + 8, obs.y + 33, obs.y + 58];
          for (let sIdx = 0; sIdx < shelves.length; sIdx++) {
            const shelfY = shelves[sIdx];
            let currentX = obs.x + 4;
            let bIdx = 0;
            while (currentX < obs.x + obs.w - 8) {
              const seed = (sIdx + 1) * 37 + bIdx * 19;
              const randVal1 = Math.abs(Math.sin(seed)) * 1000 % 1;
              const randVal2 = Math.abs(Math.cos(seed)) * 1000 % 1;
              const randVal3 = Math.abs(Math.sin(seed * 2)) * 1000 % 1;

              const bWidth = 3 + Math.floor(randVal1 * 3); // 3 to 5
              const bHeight = 12 + Math.floor(randVal2 * 5); // 12 to 16
              ctx.fillStyle = colors[Math.floor(randVal3 * colors.length)];
              ctx.fillRect(currentX, shelfY + (18 - bHeight), bWidth, bHeight);
              currentX += bWidth + 1;
              bIdx++;
            }
          }

        } else if (obs.id === "trashcan") {
          // Elegant dark tapered mesh wastebasket (never looks like a shower)
          ctx.fillStyle = "#374151"; // Charcoal mesh body
          ctx.beginPath();
          ctx.moveTo(obs.x + 2, obs.y + 6); // Top-left rim point
          ctx.lineTo(obs.x + obs.w - 2, obs.y + 6); // Top-right rim point
          ctx.lineTo(obs.x + obs.w - 5, obs.y + obs.h - 1); // Bottom-right base point
          ctx.lineTo(obs.x + 5, obs.y + obs.h - 1); // Bottom-left base point
          ctx.closePath();
          ctx.fill();

          // Clip grid wire mesh overlay details strictly to the basket body
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(obs.x + 2, obs.y + 6);
          ctx.lineTo(obs.x + obs.w - 2, obs.y + 6);
          ctx.lineTo(obs.x + obs.w - 5, obs.y + obs.h - 1);
          ctx.lineTo(obs.x + 5, obs.y + obs.h - 1);
          ctx.closePath();
          ctx.clip();

          ctx.strokeStyle = "#111827";
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let offset = -obs.h; offset < obs.w + obs.h; offset += 5) {
            ctx.moveTo(obs.x + offset, obs.y + 6);
            ctx.lineTo(obs.x + offset + obs.h, obs.y + obs.h);
            
            ctx.moveTo(obs.x + offset + obs.h, obs.y + 6);
            ctx.lineTo(obs.x + offset, obs.y + obs.h);
          }
          ctx.stroke();
          ctx.restore(); // Restore context to draw the rim and overflowing paper outside the clipped region

          // Reinforced top steel rim
          ctx.strokeStyle = "#9ca3af";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + 6);
          ctx.lineTo(obs.x + obs.w, obs.y + 6);
          ctx.stroke();

          // Visible crumpled white and pale yellow paper balls overflowing on top
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#9ca3af";

          // Left paper ball
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(obs.x + 7, obs.y + 2, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Right paper ball
          ctx.fillStyle = "#fef08a"; // pale yellow crumpled note
          ctx.beginPath();
          ctx.arc(obs.x + 18, obs.y + 3, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Centered overflowing ball
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(obs.x + 12, obs.y - 1, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

        } else if (obs.id === "computer") {
          // Retro computer and desk
          ctx.fillStyle = "#854d0e"; // desk wood
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.fillStyle = "#a16207"; // leg highlights
          ctx.fillRect(obs.x, obs.y + obs.h - 5, 4, 5);
          ctx.fillRect(obs.x + obs.w - 4, obs.y + obs.h - 5, 4, 5);

          // Beige computer body
          ctx.fillStyle = "#e4e4e7";
          ctx.fillRect(obs.x + 10, obs.y + 5, obs.w - 20, 15);
          // CRT bezel curve
          ctx.fillStyle = "#71717a";
          ctx.fillRect(obs.x + 13, obs.y + 7, obs.w - 26, 11);
          // Screen phosphor glow
          ctx.fillStyle = "#22c55e"; // bright green terminal!
          ctx.fillRect(obs.x + 15, obs.y + 9, obs.w - 30, 7);
          
          // Little cursor dot on screen
          if (frameCount % 40 < 20) {
            ctx.fillStyle = "#86efac";
            ctx.fillRect(obs.x + 17, obs.y + 11, 2, 2);
          }

          // Keyboard at the bottom
          ctx.fillStyle = "#d4d4d8";
          ctx.fillRect(obs.x + 12, obs.y + 23, obs.w - 24, 4);

        } else if (obs.id === "desk") {
          // Student desk
          ctx.fillStyle = "#b45309"; // rich wood amber
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          
          // Notebook sitting on desk
          ctx.fillStyle = "#fafafa";
          ctx.fillRect(obs.x + 10, obs.y + 6, 12, 10);
          ctx.fillStyle = "#ec4899"; // cute pink spine binder
          ctx.fillRect(obs.x + 10, obs.y + 6, 2, 10);

          // Pencil lines
          ctx.strokeStyle = "rgba(0,0,0,0.3)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(obs.x + 15, obs.y + 9);
          ctx.lineTo(obs.x + 20, obs.y + 9);
          ctx.moveTo(obs.x + 15, obs.y + 12);
          ctx.lineTo(obs.x + 19, obs.y + 12);
          ctx.stroke();

        } else if (obs.id === "backpack") {
          // Canvas backpack
          ctx.fillStyle = "#ea580c"; // bright orange
          ctx.beginPath();
          ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 4);
          ctx.fill();

          // Pocket pouch
          ctx.fillStyle = "#c2410c";
          ctx.beginPath();
          ctx.roundRect(obs.x + 3, obs.y + 10, obs.w - 6, obs.h - 12, 2);
          ctx.fill();

          // Silver zippers
          ctx.fillStyle = "#cbd5e1";
          ctx.fillRect(obs.x + obs.w/2 - 2, obs.y + 8, 4, 2);
        }

        ctx.restore();
      });

      // 6. Draw Grumpy Teacher NPC (behind large desk)
      const tNPC = teacherNPC.current;
      // Draw massive desk
      ctx.fillStyle = "#451a03"; // dark mahogany
      ctx.fillRect(tNPC.x - 20, tNPC.y + 15, 70, 20);
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(tNPC.x - 20, tNPC.y + 35, 70, 4); // shadow under desk

      // Red apple and coffee cup on teacher's desk
      ctx.fillStyle = "#ef4444"; // red apple
      ctx.beginPath();
      ctx.arc(tNPC.x - 10, tNPC.y + 20, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#22c55e"; // leaf stem
      ctx.fillRect(tNPC.x - 10, tNPC.y + 16, 1, 2);

      ctx.fillStyle = "#f4f4f5"; // coffee mug
      ctx.fillRect(tNPC.x + 38, tNPC.y + 18, 5, 5);

      // Teacher Sprite Body
      ctx.fillStyle = "#991b1b"; // tweed jacket red
      ctx.beginPath();
      ctx.roundRect(tNPC.x, tNPC.y, tNPC.w, tNPC.h, 4);
      ctx.fill();

      // Teacher collar/tie
      ctx.fillStyle = "#ffffff"; // shirt collar
      ctx.fillRect(tNPC.x + tNPC.w/2 - 4, tNPC.y + 1, 8, 4);
      ctx.fillStyle = "#1e293b"; // black necktie
      ctx.fillRect(tNPC.x + tNPC.w/2 - 1.5, tNPC.y + 3, 3, 7);

      // Head
      ctx.fillStyle = "#fed7aa"; // peach face
      ctx.beginPath();
      ctx.arc(tNPC.x + tNPC.w / 2, tNPC.y - 4, 8, 0, Math.PI * 2);
      ctx.fill();

      // Hair (balding grey sides)
      ctx.fillStyle = "#94a3b8"; // grey hair
      ctx.beginPath();
      ctx.arc(tNPC.x + tNPC.w / 2 - 7, tNPC.y - 6, 3, 0, Math.PI * 2);
      ctx.arc(tNPC.x + tNPC.w / 2 + 7, tNPC.y - 6, 3, 0, Math.PI * 2);
      ctx.fill();

      // Spectacles
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1;
      ctx.strokeRect(tNPC.x + tNPC.w/2 - 6, tNPC.y - 7, 4, 3);
      ctx.strokeRect(tNPC.x + tNPC.w/2 + 2, tNPC.y - 7, 4, 3);
      
      // Angry mouth line
      ctx.beginPath();
      ctx.moveTo(tNPC.x + tNPC.w/2 - 3, tNPC.y - 2);
      ctx.lineTo(tNPC.x + tNPC.w/2 + 3, tNPC.y - 2);
      ctx.stroke();


      // 7. Draw Player Sprite with dynamic direction & walking bob
      let bob = 0;
      if (player.isMoving) {
        bob = Math.sin(frameCount * 0.25) * 2.5;
      }

      ctx.save();
      // Player shadow
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.beginPath();
      ctx.ellipse(player.x + player.w/2, player.y + player.h - 1, player.w/2 + 2, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Torso/Shirt
      ctx.fillStyle = "#2563eb"; // blue school uniform
      ctx.beginPath();
      ctx.roundRect(player.x, player.y + 8 + bob, player.w, player.h - 9, 3);
      ctx.fill();

      // Yellow Backpack on player's back
      if (player.facing === "up" || player.facing === "left") {
        ctx.fillStyle = "#eab308";
        ctx.fillRect(player.x - 3, player.y + 11 + bob, 5, 8);
      } else if (player.facing === "right") {
        ctx.fillStyle = "#eab308";
        ctx.fillRect(player.x + player.w - 2, player.y + 11 + bob, 5, 8);
      }

      // Head
      ctx.fillStyle = "#ffedd5"; // skin tone
      ctx.beginPath();
      ctx.arc(player.x + player.w/2, player.y + 2 + bob, 7, 0, Math.PI * 2);
      ctx.fill();

      // Hair (dark brown locks)
      ctx.fillStyle = "#451a03";
      ctx.beginPath();
      ctx.arc(player.x + player.w/2, player.y - 2 + bob, 8, Math.PI, 0); // top half hair dome
      ctx.fill();
      // hair side burns
      ctx.fillRect(player.x + player.w/2 - 8, player.y - 2 + bob, 3, 5);
      ctx.fillRect(player.x + player.w/2 + 5, player.y - 2 + bob, 3, 5);

      // Facing facial features
      ctx.fillStyle = "#000000";
      if (player.facing === "down") {
        // Eyes
        ctx.fillRect(player.x + player.w/2 - 4, player.y + 1 + bob, 1.5, 1.5);
        ctx.fillRect(player.x + player.w/2 + 2, player.y + 1 + bob, 1.5, 1.5);
        // smile/mouth
        ctx.fillStyle = "#b91c1c";
        ctx.fillRect(player.x + player.w/2 - 1, player.y + 4 + bob, 2, 1);
      } else if (player.facing === "left") {
        ctx.fillRect(player.x + player.w/2 - 5, player.y + 1 + bob, 1.5, 1.5);
      } else if (player.facing === "right") {
        ctx.fillRect(player.x + player.w/2 + 3, player.y + 1 + bob, 1.5, 1.5);
      }

      // Moving feet alternating
      ctx.fillStyle = "#1e293b"; // dark boots
      if (player.isMoving) {
        const leftLegOffset = Math.sin(frameCount * 0.3) * 3;
        ctx.fillRect(player.x + 2, player.y + player.h - 1 + bob, 5, 2 + leftLegOffset);
        ctx.fillRect(player.x + player.w - 7, player.y + player.h - 1 + bob, 5, 2 - leftLegOffset);
      } else {
        ctx.fillRect(player.x + 2, player.y + player.h - 1, 5, 2);
        ctx.fillRect(player.x + player.w - 7, player.y + player.h - 1, 5, 2);
      }

      ctx.restore();

      // 8. Draw Action Dialog Indicators when close to objects
      if (closeObject && !dialogActiveRef.current && !showAnswerInputRef.current) {
        const bubbleX = closeObject === "teacher" ? tNPC.x + tNPC.w/2 : obstacles.current.find(o => o.id === closeObject)!.x + obstacles.current.find(o => o.id === closeObject)!.w / 2;
        const bubbleY = closeObject === "teacher" ? tNPC.y - 20 : obstacles.current.find(o => o.id === closeObject)!.y - 12;

        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 4;
        
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 2;
        
        // draw bubble rounded rect
        const bW = 60;
        const bH = 15;
        ctx.beginPath();
        ctx.roundRect(bubbleX - bW / 2, bubbleY - bH / 2, bW, bH, 3);
        ctx.fill();
        ctx.stroke();

        // draw tiny tail
        ctx.beginPath();
        ctx.moveTo(bubbleX - 3, bubbleY + bH / 2);
        ctx.lineTo(bubbleX, bubbleY + bH / 2 + 3);
        ctx.lineTo(bubbleX + 3, bubbleY + bH / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // text inside
        ctx.fillStyle = "#18181b";
        ctx.font = "bold 7px system-ui";
        ctx.textAlign = "center";
        ctx.fillText("PRESS [A]", bubbleX, bubbleY + 3.5);
        ctx.restore();
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 p-2 select-none overflow-y-auto">
      
      {/* Dynamic Header with game state & assistance controls */}
      <div className="w-full max-w-md flex items-center justify-between px-3 py-2 mb-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
          <span className="text-xs font-mono tracking-wider uppercase text-zinc-400">Classroom Escape</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { playSound("select"); setShowHelp(prev => !prev); }}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 transition-colors"
            title="How to play"
            id="help-btn"
          >
            <HelpCircle size={15} />
          </button>
          
          <button 
            onClick={() => setSoundEnabled(prev => !prev)}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 transition-colors"
            title={soundEnabled ? "Mute sound effects" : "Enable sound effects"}
            id="audio-toggle-btn"
          >
            {soundEnabled ? <Volume2 size={15} className="text-green-400" /> : <VolumeX size={15} />}
          </button>

          <button 
            onClick={() => {
              playSound("select");
              if (musicEnabled) {
                stopAmbientMusic();
                setMusicEnabled(false);
              } else {
                setMusicEnabled(true);
                setTimeout(() => {
                  startAmbientMusic();
                }, 50);
              }
            }}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 transition-colors"
            title={musicEnabled ? "Mute ambient music" : "Enable ambient music"}
            id="music-toggle-btn"
          >
            <Music size={15} className={musicEnabled ? "text-amber-400 animate-pulse" : "text-zinc-400"} />
          </button>

          <button 
            onClick={() => handleResetRequest("select")}
            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 transition-colors"
            title="Reset session"
            id="restart-btn"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Main Handheld Layout Wrapper representing a vertical retro console */}
      <div 
        id="gameboy-handheld" 
        className="relative flex flex-col bg-zinc-300 border-t-4 border-l-4 border-b-8 border-r-8 border-zinc-400 rounded-3xl p-4 w-[430px] max-w-full shadow-2xl shrink-0"
        style={{ boxShadow: "inset 4px 4px 0px rgba(255,255,255,0.4), 8px 12px 24px rgba(0,0,0,0.6)" }}
      >
        {/* Subtle physical texture details */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-4 w-4/5 justify-between">
          <div className="h-1 w-20 bg-zinc-400 rounded-full" />
          <div className="h-1 w-20 bg-zinc-400 rounded-full" />
        </div>

        {/* 1. UPPER SECTION: Screen & Bezel */}
        <div className="relative bg-zinc-700 rounded-xl p-3 border-2 border-zinc-500 flex flex-col mb-4 select-none shadow-inner">
          
          {/* Bezel Title & Accent Lines */}
          <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-zinc-400 mb-1.5 px-1 uppercase">
            <span className="text-blue-400 font-bold">Dot Matrix</span>
            <div className="flex-grow mx-2 h-[2px] bg-red-500 opacity-80" />
            <span className="text-red-500 font-bold">Stereo Sound</span>
          </div>

          {/* Core Screen Area hosting Canvas & absolute Overlay components */}
          <div className="relative border-4 border-zinc-800 bg-[#9ca3af] rounded-lg overflow-hidden flex items-center justify-center">
            
            {/* Ambient greenish light of old LCD screens and CRT scanlines overlay */}
            <div className="crt-overlay relative w-full h-full flex items-center justify-center bg-[#a6bca2]">
              
              {/* Responsive feedback screen flashes (correct/incorrect states) */}
              <div className={`absolute inset-0 z-10 pointer-events-none transition-all duration-150 ${feedbackFlash === "correct" ? "correct-flash" : ""} ${feedbackFlash === "incorrect" ? "incorrect-flash" : ""}`} />

              {/* The HTML5 Canvas Rendering Classroom */}
              <canvas 
                ref={canvasRef} 
                width={400} 
                height={400} 
                className="w-full aspect-square block cursor-pointer select-none"
              />

              {/* Stat bar displaying current question number / total */}
              <div className="absolute top-2 right-2 bg-emerald-950/80 text-emerald-300 font-pixel text-[8px] px-1.5 py-1 rounded border border-emerald-800 flex items-center gap-1.5 z-20 shadow-sm">
                <span>IELTS:</span>
                <span className="text-white text-xs">{currentQuestionIndex + 1}/{questionQueue.length}</span>
              </div>

              {/* DIALOG RETRO PANEL (TYPOGRAPHY TYPEWRITER OVERLAY) */}
              {dialogActive && (
                <div className="absolute bottom-2 left-2 right-2 bg-emerald-950/95 border-2 border-emerald-700 text-white p-2.5 rounded-lg font-pixel text-[9px] leading-relaxed flex flex-col z-30 shadow-lg min-h-[110px] select-none">
                  <div className="flex justify-between border-b border-emerald-800 pb-1 mb-1 text-emerald-400 font-bold tracking-wide uppercase">
                    <span>{dialogTitle}</span>
                    {dialogDisplayText.length >= dialogFullText.length && (
                      <span className="animate-pulse">▶</span>
                    )}
                  </div>
                  
                  <div className="flex-grow whitespace-pre-wrap leading-relaxed py-1 text-emerald-100 font-medium">
                    {dialogDisplayText}
                  </div>

                  {/* Multiple dialogue choices for answers */}
                  {dialogMode === "teacher_question" && dialogDisplayText.length >= dialogFullText.length && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-800 flex flex-col gap-1.5">
                      <button
                        onClick={() => { playSound("select"); setTeacherChoiceIndex(0); setShowAnswerInput(true); }}
                        className={`w-full text-left py-1 px-2 rounded flex items-center justify-between text-xs transition-colors ${teacherChoiceIndex === 0 ? "bg-emerald-800 text-white border border-emerald-500 font-bold" : "bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/60"}`}
                      >
                        <span>&gt; [1] ANSWER NOW</span>
                        <ArrowRight size={10} className={teacherChoiceIndex === 0 ? "text-white" : "text-emerald-500"} />
                      </button>
                      
                      <button
                        onClick={() => {
                          playSound("select");
                          setTeacherChoiceIndex(1);
                          setDialogFullText("Just as I expected! Don't just stand around, the answers are somewhere in the school. Go find them!");
                          setDialogMode("inspect");
                        }}
                        className={`w-full text-left py-1 px-2 rounded flex items-center justify-between text-xs transition-colors ${teacherChoiceIndex === 1 ? "bg-emerald-800 text-white border border-emerald-500 font-bold" : "bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/60"}`}
                      >
                        <span>&gt; [2] I DON'T KNOW</span>
                        <X size={10} className="text-zinc-400" />
                      </button>
                    </div>
                  )}

                  <div className="text-[7px] text-right text-emerald-400/80 mt-1 uppercase tracking-widest">
                    Press [A] to continue
                  </div>
                </div>
              )}

              {/* CUSTOM RETRO RESET CONFIRMATION DIALOG */}
              {showResetConfirm && (
                <div className="absolute inset-x-2 bottom-2 bg-emerald-950 border-2 border-amber-600 text-white p-2.5 rounded-lg font-pixel text-[9px] leading-relaxed flex flex-col z-45 shadow-lg min-h-[110px] select-none animate-fade-in">
                  <div className="flex justify-between border-b border-amber-800 pb-1 mb-1 text-amber-500 font-bold tracking-wide uppercase">
                    <span>⚠️ RESTART WARNING</span>
                    <span className="animate-pulse">⚠</span>
                  </div>
                  
                  <div className="flex-grow py-1 text-amber-100 font-medium leading-normal">
                    All currently solved IELTS question progress will be lost. Are you absolutely sure you want to restart the exam?
                  </div>

                  <div className="mt-2 pt-1 border-t border-amber-900 flex flex-col gap-1.5">
                    <button
                      onClick={() => {
                        playSound("select");
                        setResetChoiceIndex(0);
                        setShowResetConfirm(false);
                      }}
                      className={`w-full text-left py-1 px-2 rounded flex items-center justify-between text-xs transition-colors ${resetChoiceIndex === 0 ? "bg-emerald-800 text-white border border-emerald-500 font-bold" : "bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/60"}`}
                    >
                      <span>&gt; [1] NO, KEEP PLAYING</span>
                      <ArrowRight size={10} className={resetChoiceIndex === 0 ? "text-white" : "text-emerald-500"} />
                    </button>
                    
                    <button
                      onClick={() => {
                        playSound("select");
                        setResetChoiceIndex(1);
                        setShowResetConfirm(false);
                        initGame();
                      }}
                      className={`w-full text-left py-1 px-2 rounded flex items-center justify-between text-xs transition-colors ${resetChoiceIndex === 1 ? "bg-red-950 text-red-200 border border-red-500 font-bold" : "bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/60"}`}
                    >
                      <span>&gt; [2] YES, RESTART ALL</span>
                      <X size={10} className="text-zinc-400" />
                    </button>
                  </div>

                  <div className="text-[7px] text-right text-amber-400/80 mt-1 uppercase tracking-widest">
                    Press [A] or select to choose
                  </div>
                </div>
              )}

              {/* ABSOLUTE DICTIONARY SUBMISSION DIALOG (POPUP INPUT OVERLAY) */}
              {showAnswerInput && activeQuestion && (
                <div className="absolute inset-x-2 top-2 bottom-2 bg-slate-900 border-2 border-slate-700 text-slate-100 p-3 rounded-xl flex flex-col justify-between z-40 shadow-2xl font-mono select-none">
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5 mb-2">
                      <span className="text-xs font-bold text-amber-400 tracking-wider flex items-center gap-1">
                        <Info size={12} /> TEACHER DESK CHALLENGE
                      </span>
                      <button 
                        onClick={() => { playSound("select"); setShowAnswerInput(false); }}
                        className="text-slate-400 hover:text-slate-100 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs mb-3 text-slate-300 font-pixel text-[8px] leading-relaxed">
                      <p className="text-slate-400 mb-1 font-sans uppercase font-bold tracking-wider">Question {currentQuestionIndex + 1}:</p>
                      {activeQuestion.question}
                    </div>

                    <form onSubmit={handleAnswerSubmit} className="flex flex-col gap-2">
                      <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Your Entry Answer:</label>
                      <input 
                        type="text"
                        autoFocus
                        value={enteredAnswer}
                        onChange={(e) => setEnteredAnswer(e.target.value)}
                        placeholder="Search clues if stuck..."
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </form>
                  </div>

                  {/* Submission and hints button drawer */}
                  <div className="flex gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => { playSound("select"); setShowAnswerInput(false); }}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-1.5 rounded text-xs tracking-wider transition-all"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={() => handleAnswerSubmit()}
                      className="flex-1 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-zinc-950 font-bold py-1.5 rounded text-xs tracking-wider transition-all shadow-[0_2px_4px_rgba(217,119,6,0.3)]"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              )}

              {/* IMMERSIVE GRADUATION WIN STATE (OLD-SCHOOL FLASHING SPLASH SCREEN) */}
              {showGraduationSplash && (
                <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-between p-4 z-50 overflow-y-auto select-none font-mono text-center">
                  <div className="w-full flex justify-center py-2">
                    <div className="animate-bounce bg-amber-500/20 text-amber-400 p-3 rounded-full border border-amber-500/40">
                      <Award size={40} className="stroke-[1.5]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-amber-400 text-lg font-bold tracking-widest uppercase font-pixel animate-pulse">
                      CONGRATULATIONS!
                    </h2>
                    <h3 className="text-white text-xs font-bold tracking-widest font-pixel">
                      YOU GRADUATED!
                    </h3>
                    <p className="text-slate-400 text-[10px] leading-relaxed max-w-[280px] mx-auto font-sans">
                      You escaped the Grumpy Teacher's classroom by mastering all {questionQueue.length} IELTS facts. You are fully prepared for academic relocation!
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl w-full max-w-[280px] text-left space-y-1.5 py-2.5 my-2">
                    <div className="flex justify-between text-[10px] border-b border-slate-800 pb-1">
                      <span className="text-slate-500 uppercase tracking-wider font-bold">Relocation Status</span>
                      <span className="text-green-400 font-bold uppercase font-pixel text-[8px]">APPROVED</span>
                    </div>
                    <div className="flex justify-between text-xs py-0.5">
                      <span className="text-slate-400 font-medium">Questions Cleared:</span>
                      <span className="text-white font-bold font-mono">{questionQueue.length}</span>
                    </div>
                    <div className="flex justify-between text-xs py-0.5">
                      <span className="text-slate-400 font-medium">Total Attempts:</span>
                      <span className="text-white font-bold font-mono">{stats.attempts}</span>
                    </div>
                    <div className="flex justify-between text-xs py-0.5">
                      <span className="text-slate-400 font-medium">Incorrect Guesses:</span>
                      <span className="text-red-400 font-bold font-mono">{stats.failures}</span>
                    </div>
                    <div className="flex justify-between text-xs py-0.5">
                      <span className="text-slate-400 font-medium">Test Time:</span>
                      <span className="text-white font-bold font-mono">
                        {Math.floor((stats.endTime - stats.startTime) / 1000)} seconds
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleResetRequest("door")}
                    className="w-full max-w-[280px] bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 text-xs font-bold font-pixel py-3 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={14} className="animate-spin-slow" /> PLAY AGAIN
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Console Name Plate Labeling */}
        <div className="flex items-center justify-between px-2 mb-6 select-none">
          <span className="font-pixel text-[13px] tracking-wider text-slate-800 font-bold italic scale-y-95">
            IELTS <span className="text-slate-600 font-medium">BOY</span>
          </span>
          <div className="flex gap-1">
            <div className="h-2 w-10 bg-slate-400 rounded-full" />
            <div className="h-2 w-2 bg-slate-400 rounded-full" />
          </div>
        </div>

        {/* 2. LOWER SECTION: Touch Boundaries GamePad controls */}
        <div className="grid grid-cols-2 gap-4 pt-2 pb-4 select-none">
          
          {/* LEFT COLUMN: The Physical D-Pad Cross */}
          <div className="flex items-center justify-center">
            <div className="relative w-36 h-36 bg-zinc-200 rounded-full border border-zinc-400 flex items-center justify-center shadow-inner">
              
              {/* Vertical bar */}
              <div className="absolute w-10 h-28 bg-zinc-800 rounded-lg shadow-md" />
              {/* Horizontal bar */}
              <div className="absolute h-10 w-28 bg-zinc-800 rounded-lg shadow-md" />
              
              {/* Inner physical circular slot */}
              <div className="absolute w-9 h-9 bg-zinc-900 rounded-full z-10 border border-zinc-700" />

              {/* Tactile Touch Interactivity Areas */}
              {/* UP BUTTON */}
              <button 
                onMouseDown={() => touchDirectionStart("ArrowUp")}
                onMouseUp={() => touchDirectionEnd("ArrowUp")}
                onMouseLeave={() => touchDirectionEnd("ArrowUp")}
                onTouchStart={(e) => { e.preventDefault(); touchDirectionStart("ArrowUp"); }}
                onTouchEnd={(e) => { e.preventDefault(); touchDirectionEnd("ArrowUp"); }}
                className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-10 hover:bg-zinc-700 active:bg-zinc-600 rounded-t-md z-20 transition-all flex flex-col items-center justify-start pt-1"
                aria-label="D-Pad Up"
              >
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-zinc-400" />
              </button>

              {/* DOWN BUTTON */}
              <button 
                onMouseDown={() => touchDirectionStart("ArrowDown")}
                onMouseUp={() => touchDirectionEnd("ArrowDown")}
                onMouseLeave={() => touchDirectionEnd("ArrowDown")}
                onTouchStart={(e) => { e.preventDefault(); touchDirectionStart("ArrowDown"); }}
                onTouchEnd={(e) => { e.preventDefault(); touchDirectionEnd("ArrowDown"); }}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-10 hover:bg-zinc-700 active:bg-zinc-600 rounded-b-md z-20 transition-all flex flex-col items-center justify-end pb-1"
                aria-label="D-Pad Down"
              >
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-zinc-400" />
              </button>

              {/* LEFT BUTTON */}
              <button 
                onMouseDown={() => touchDirectionStart("ArrowLeft")}
                onMouseUp={() => touchDirectionEnd("ArrowLeft")}
                onMouseLeave={() => touchDirectionEnd("ArrowLeft")}
                onTouchStart={(e) => { e.preventDefault(); touchDirectionStart("ArrowLeft"); }}
                onTouchEnd={(e) => { e.preventDefault(); touchDirectionEnd("ArrowLeft"); }}
                className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 hover:bg-zinc-700 active:bg-zinc-600 rounded-l-md z-20 transition-all flex items-center justify-start pl-1"
                aria-label="D-Pad Left"
              >
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-zinc-400" />
              </button>

              {/* RIGHT BUTTON */}
              <button 
                onMouseDown={() => touchDirectionStart("ArrowRight")}
                onMouseUp={() => touchDirectionEnd("ArrowRight")}
                onMouseLeave={() => touchDirectionEnd("ArrowRight")}
                onTouchStart={(e) => { e.preventDefault(); touchDirectionStart("ArrowRight"); }}
                onTouchEnd={(e) => { e.preventDefault(); touchDirectionEnd("ArrowRight"); }}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 hover:bg-zinc-700 active:bg-zinc-600 rounded-r-md z-20 transition-all flex items-center justify-end pr-1"
                aria-label="D-Pad Right"
              >
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-zinc-400" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Red physical A & B action circles */}
          <div className="flex items-center justify-center">
            <div 
              className="relative bg-zinc-200 border border-zinc-400 rounded-2xl w-36 h-20 p-2 transform rotate-[-12deg] flex items-center justify-around shadow-inner"
              style={{ boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.15)" }}
            >
              
              {/* BUTTON B */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onMouseDown={() => {
                    // Simulates close/back
                    playSound("select");
                    if (dialogActive) setDialogActive(false);
                    if (showAnswerInput) setShowAnswerInput(false);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    playSound("select");
                    if (dialogActive) setDialogActive(false);
                    if (showAnswerInput) setShowAnswerInput(false);
                  }}
                  className="w-11 h-11 bg-red-800 hover:bg-red-700 active:bg-red-900 border-2 border-red-950 rounded-full flex items-center justify-center text-red-100 font-bold text-lg shadow-md active:translate-y-[2px]"
                  style={{ boxShadow: "2px 4px 0px rgba(0,0,0,0.3)" }}
                  id="action-b-btn"
                >
                  B
                </button>
                <span className="text-[8px] font-mono font-bold tracking-wider text-slate-600 uppercase">Back/Clear</span>
              </div>

              {/* BUTTON A */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onMouseDown={() => handleActionPress()}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleActionPress();
                  }}
                  className="w-11 h-11 bg-red-800 hover:bg-red-700 active:bg-red-900 border-2 border-red-950 rounded-full flex items-center justify-center text-red-100 font-bold text-lg shadow-md active:translate-y-[2px]"
                  style={{ boxShadow: "2px 4px 0px rgba(0,0,0,0.3)" }}
                  id="action-a-btn"
                >
                  A
                </button>
                <span className="text-[8px] font-mono font-bold tracking-wider text-slate-600 uppercase">Inspect/Ok</span>
              </div>

            </div>
          </div>

        </div>

        {/* SELECT / START diagonal pill keys */}
        <div className="flex justify-center gap-8 pt-2 select-none">
          {/* SELECT button */}
          <div className="flex flex-col items-center gap-1.5">
            <button 
              onClick={() => { playSound("select"); setShowHelp(true); }}
              className="w-14 h-3 bg-slate-500 hover:bg-slate-400 active:bg-slate-600 rounded-full transform -rotate-12 shadow-sm"
              id="select-btn"
            />
            <span className="text-[8px] font-mono text-slate-700 font-bold tracking-widest uppercase">SELECT</span>
          </div>

          {/* START button */}
          <div className="flex flex-col items-center gap-1.5">
            <button 
              onClick={() => handleResetRequest("door")}
              className="w-14 h-3 bg-slate-500 hover:bg-slate-400 active:bg-slate-600 rounded-full transform -rotate-12 shadow-sm"
              id="start-btn"
            />
            <span className="text-[8px] font-mono text-slate-700 font-bold tracking-widest uppercase">START</span>
          </div>
        </div>

        {/* Decorative corner speaker slots */}
        <div className="absolute bottom-4 right-6 flex gap-1.5 rotate-[-28deg]">
          <div className="w-1.5 h-7 bg-zinc-400 rounded-full shadow-inner" />
          <div className="w-1.5 h-7 bg-zinc-400 rounded-full shadow-inner" />
          <div className="w-1.5 h-7 bg-zinc-400 rounded-full shadow-inner" />
          <div className="w-1.5 h-7 bg-zinc-400 rounded-full shadow-inner" />
          <div className="w-1.5 h-7 bg-zinc-400 rounded-full shadow-inner" />
        </div>

      </div>

      {/* Auxiliary Instructions Drawer Pop-up (Keyboard controls reference) */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl max-w-sm w-full font-mono text-xs shadow-2xl relative">
            <button 
              onClick={() => { playSound("select"); setShowHelp(false); }}
              className="absolute top-3 right-3 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            
            <h3 className="text-sm font-pixel text-amber-400 mb-4 tracking-wider uppercase flex items-center gap-2">
              <Info size={16} /> IELTS ADV-GAME INSTRUCTIONS
            </h3>
            
            <div className="space-y-3.5 text-zinc-300">
              <p className="leading-relaxed">
                Welcome, Student! To escape the classroom, you must graduate by answering the Grumpy Teacher's IELTS queries correctly.
              </p>
              
              <div className="space-y-1 bg-zinc-950 p-2 rounded border border-zinc-800">
                <p className="text-zinc-500 uppercase tracking-widest font-bold text-[9px] mb-1">D-PAD (Keyboard Controls):</p>
                <div className="flex justify-between">
                  <span>Move Player:</span>
                  <span className="text-amber-300">Arrow Keys / WASD</span>
                </div>
                <div className="flex justify-between">
                  <span>Action A (Interact):</span>
                  <span className="text-amber-300">Spacebar / Enter</span>
                </div>
                <div className="flex justify-between">
                  <span>Action B (Close):</span>
                  <span className="text-amber-300">Esc / Backspace</span>
                </div>
                <div className="flex justify-between">
                  <span>Choose Answers:</span>
                  <span className="text-amber-300">Keys [1] and [2]</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-zinc-400 font-bold uppercase tracking-wider">How to Win:</p>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-zinc-400">
                  <li>Find clues inside exactly 8 items (Bookshelf, Lockers, Blackboard, Computer, Trashcan, Desk, Window, Backpack).</li>
                  <li>One container holds the active correct answer. Three containers are tricky <strong>Red Herrings</strong>.</li>
                  <li>Walk to the Grumpy Teacher desk at the top, press <strong className="text-zinc-100">[A]</strong>, select <strong>[1] Answer</strong>, and type correct answer.</li>
                  <li>Correct answers unlock the next question. Unlock all questions to escape!</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => { playSound("select"); setShowHelp(false); }}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 rounded-xl mt-4 transition-all text-center"
            >
              GOT IT, PLAY!
            </button>
          </div>
        </div>
      )}

      {/* Clean footer info lines avoiding engineering noise */}
      <div className="text-center mt-3 text-[10px] text-zinc-600 font-mono flex items-center justify-center gap-2">
        <span>© 1989 IELTS BOY Color Inc.</span>
        <span>•</span>
        <span>Search classroom for clues</span>
      </div>

    </div>
  );
}
