export type TestType = "Academic" | "General Training";
export type Length = "short" | "long";

export type MCQItem = {
  id: string;
  skill: "Listening" | "Reading";
  weight: number; // difficulty weighting, 1 (easier) - 4 (harder)
  prompt: string;
  passage?: string; // shown for Reading; spoken aloud (hidden) for Listening
  options: string[];
  correctIndex: number;
};

export type WritingPrompt = {
  id: string;
  prompt: string;
  minWords: number;
};

export type SpeakingPrompt = {
  id: string;
  prompt: string;
  minSeconds: number;
};

// Listening is identical for Academic and General Training in the real exam,
// so this bank is shared regardless of test type selected. Ordered easy -> hard.
export const LISTENING_ITEMS: MCQItem[] = [
  {
    id: "l1",
    skill: "Listening",
    weight: 1,
    passage: "The library will be closing early today at four o'clock instead of six for staff training.",
    prompt: "What time will the library close today?",
    options: ["Four o'clock", "Five o'clock", "Six o'clock", "It's staying open later"],
    correctIndex: 0,
  },
  {
    id: "l2",
    skill: "Listening",
    weight: 1,
    passage: "Please submit the form to room two hundred and twelve, not the main office as previously stated.",
    prompt: "Where should the form be submitted?",
    options: ["The main office", "Room 212", "Room 200", "By post"],
    correctIndex: 1,
  },
  {
    id: "l3",
    skill: "Listening",
    weight: 2,
    passage: "Although the flight was originally scheduled for nine, it's now delayed until half past eleven due to weather.",
    prompt: "What time is the flight now scheduled to depart?",
    options: ["Nine o'clock", "Half past nine", "Half past eleven", "It has been cancelled"],
    correctIndex: 2,
  },
  {
    id: "l4",
    skill: "Listening",
    weight: 2,
    passage: "The tour includes the museum and the gardens, but the tower is only accessible on weekends.",
    prompt: "Which part of the tour is only available on weekends?",
    options: ["The museum", "The gardens", "The tower", "The whole tour"],
    correctIndex: 2,
  },
  {
    id: "l5",
    skill: "Listening",
    weight: 3,
    passage: "Candidates should arrive thirty minutes before the test, bringing identification and two pencils, not pens.",
    prompt: "What should candidates bring, according to the announcement?",
    options: ["Pens only", "Identification and two pencils", "Only identification", "Nothing is required"],
    correctIndex: 1,
  },
  {
    id: "l6",
    skill: "Listening",
    weight: 3,
    passage: "The original venue was unavailable, so the conference has been moved to the hotel on Baker Street, though the date remains the same.",
    prompt: "What has changed about the conference?",
    options: ["The date", "The venue", "Both the date and venue", "Nothing has changed"],
    correctIndex: 1,
  },
  {
    id: "l7",
    skill: "Listening",
    weight: 4,
    passage: "While most departments will move to the new building in March, the finance team will remain at the current site until renovations are complete, likely by June.",
    prompt: "What can be inferred about the finance team?",
    options: [
      "They will move in March with everyone else",
      "They will stay at the current site longer than other departments",
      "They are being relocated permanently",
      "Renovations will not affect them",
    ],
    correctIndex: 1,
  },
  {
    id: "l8",
    skill: "Listening",
    weight: 4,
    passage: "Registration closes on the fifteenth, but late applications may still be considered if accompanied by a written explanation and submitted no later than the twentieth.",
    prompt: "What is true about late applications?",
    options: [
      "They are never accepted",
      "They may be considered up to the twentieth with a written explanation",
      "They must be submitted by the fifteenth",
      "No explanation is required for late applications",
    ],
    correctIndex: 1,
  },
];

// Speaking is also identical for Academic and General Training.
export const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  { id: "s1", prompt: "Describe your daily routine on a typical weekday.", minSeconds: 20 },
  { id: "s2", prompt: "Talk about a place you would like to visit and explain why.", minSeconds: 20 },
  { id: "s3", prompt: "Describe a skill you would like to learn and how you would go about learning it.", minSeconds: 20 },
  { id: "s4", prompt: "Talk about a book, film, or show that made an impression on you.", minSeconds: 20 },
  { id: "s5", prompt: "Describe a decision you found difficult to make and explain why.", minSeconds: 20 },
];

// Reading differs by test type in the real exam: Academic uses academic-style texts,
// General Training uses everyday/workplace-style texts. Ordered easy -> hard.
export const READING_ITEMS: Record<TestType, MCQItem[]> = {
  Academic: [
    {
      id: "ra1",
      skill: "Reading",
      weight: 1,
      passage: "Urban green spaces have been shown to reduce stress levels among city residents, but access to them remains uneven across income groups.",
      prompt: "According to the passage, what is unevenly distributed?",
      options: ["Stress levels", "City residents", "Access to green spaces", "Income groups"],
      correctIndex: 2,
    },
    {
      id: "ra2",
      skill: "Reading",
      weight: 1,
      passage: "The experiment was repeated three times to confirm the initial results, and each trial produced findings consistent with the original observation.",
      prompt: "Why was the experiment repeated?",
      options: [
        "To find a different result",
        "To confirm the initial results",
        "Because the first attempt failed",
        "To train new researchers",
      ],
      correctIndex: 1,
    },
    {
      id: "ra3",
      skill: "Reading",
      weight: 2,
      passage: "While early studies suggested a direct link between the two variables, more recent research has questioned whether the relationship is causal or merely correlational.",
      prompt: "What does recent research question?",
      options: [
        "Whether the two variables are related at all",
        "Whether the relationship is causal or just correlational",
        "Whether early studies existed",
        "Whether the variables can be measured",
      ],
      correctIndex: 1,
    },
    {
      id: "ra4",
      skill: "Reading",
      weight: 2,
      passage: "Researchers caution that while the sample size was large, participants were drawn exclusively from a single region, limiting how broadly the findings can be applied.",
      prompt: "What limitation do the researchers highlight?",
      options: [
        "The sample size was too small",
        "The study had no participants",
        "Findings may not generalise beyond the region studied",
        "The region was not specified",
      ],
      correctIndex: 2,
    },
    {
      id: "ra5",
      skill: "Reading",
      weight: 3,
      passage: "The theory, though widely taught for decades, has recently come under sustained scrutiny as new data fails to support several of its central predictions.",
      prompt: "What is implied about the theory?",
      options: [
        "It has been fully disproven",
        "It was never taken seriously",
        "It is being questioned due to new evidence",
        "It has no predictions at all",
      ],
      correctIndex: 2,
    },
    {
      id: "ra6",
      skill: "Reading",
      weight: 3,
      passage: "Although funding for the project was approved, disbursement was made contingent on quarterly progress reports, a condition the original proposal had not anticipated.",
      prompt: "What condition was attached to the funding?",
      options: [
        "The project had to be cancelled",
        "Quarterly progress reports were required",
        "The proposal had to be rewritten",
        "No conditions were attached",
      ],
      correctIndex: 1,
    },
    {
      id: "ra7",
      skill: "Reading",
      weight: 4,
      passage: "Critics argue that the model, for all its mathematical elegance, rests on assumptions so simplified that its real-world predictive value is questionable at best.",
      prompt: "What is the main criticism of the model?",
      options: [
        "It is not mathematically elegant",
        "Its assumptions may be too simplified for real-world use",
        "It has no assumptions",
        "It is too complex to understand",
      ],
      correctIndex: 1,
    },
    {
      id: "ra8",
      skill: "Reading",
      weight: 4,
      passage: "Proponents concede that, absent longitudinal data, claims about the intervention's lasting impact remain necessarily speculative rather than firmly established.",
      prompt: "What do proponents concede?",
      options: [
        "The intervention definitely has no lasting impact",
        "Claims about lasting impact are speculative without longitudinal data",
        "Longitudinal data already proves the impact",
        "The intervention has been abandoned",
      ],
      correctIndex: 1,
    },
  ],
  "General Training": [
    {
      id: "rg1",
      skill: "Reading",
      weight: 1,
      passage: "Staff are reminded that the staff room will be closed for cleaning between 12 and 1pm, and lunch should be taken before or after this time.",
      prompt: "What is closed between 12 and 1pm?",
      options: ["The main office", "The staff room", "The building", "The car park"],
      correctIndex: 1,
    },
    {
      id: "rg2",
      skill: "Reading",
      weight: 1,
      passage: "All visitors must sign in at reception and wear a visitor badge at all times while on site.",
      prompt: "What must visitors do while on site?",
      options: ["Wear a visitor badge", "Bring their own badge", "Avoid reception", "Nothing in particular"],
      correctIndex: 0,
    },
    {
      id: "rg3",
      skill: "Reading",
      weight: 2,
      passage: "Tenants wishing to renew their lease must notify the office in writing at least 60 days before the current agreement expires.",
      prompt: "How much notice must tenants give to renew?",
      options: ["30 days", "45 days", "60 days", "90 days"],
      correctIndex: 2,
    },
    {
      id: "rg4",
      skill: "Reading",
      weight: 2,
      passage: "Refunds are only available within 14 days of purchase, and the item must be returned in its original packaging with proof of purchase.",
      prompt: "What is required for a refund?",
      options: [
        "Nothing, refunds are automatic",
        "Original packaging and proof of purchase, within 14 days",
        "Only proof of purchase",
        "Only original packaging",
      ],
      correctIndex: 1,
    },
    {
      id: "rg5",
      skill: "Reading",
      weight: 3,
      passage: "While the warranty covers manufacturing defects, it does not extend to damage caused by misuse, and a receipt is required for any claim.",
      prompt: "What does the warranty NOT cover?",
      options: [
        "Manufacturing defects",
        "Damage caused by misuse",
        "Any damage at all",
        "Claims with a receipt",
      ],
      correctIndex: 1,
    },
    {
      id: "rg6",
      skill: "Reading",
      weight: 3,
      passage: "Applicants are advised that incomplete forms will not be processed, and any missing sections should be completed before submission to avoid delays.",
      prompt: "What happens to incomplete forms?",
      options: [
        "They are processed anyway",
        "They will not be processed",
        "They are automatically completed",
        "They are given priority",
      ],
      correctIndex: 1,
    },
    {
      id: "rg7",
      skill: "Reading",
      weight: 4,
      passage: "Although the policy technically allows for exceptions, in practice these are rarely granted unless supported by extensive documentation submitted well in advance.",
      prompt: "What is suggested about exceptions to the policy?",
      options: [
        "They are common and easy to obtain",
        "They don't exist in the policy",
        "They're rarely granted without strong supporting evidence",
        "They require no documentation",
      ],
      correctIndex: 2,
    },
    {
      id: "rg8",
      skill: "Reading",
      weight: 4,
      passage: "Membership benefits will continue for existing members under current terms, though new sign-ups will be subject to the revised fee structure taking effect next quarter.",
      prompt: "What is true about existing members?",
      options: [
        "They lose their benefits immediately",
        "They keep current terms; new terms apply to new sign-ups",
        "They must re-apply under the new terms",
        "The change affects everyone equally",
      ],
      correctIndex: 1,
    },
  ],
};

// Writing differs by test type: Academic is typically a report/argument on data or an
// abstract issue; General Training is typically a letter or a more everyday argument.
export const WRITING_PROMPTS: Record<TestType, WritingPrompt[]> = {
  Academic: [
    { id: "wa1", prompt: "Summarise the main advantage and disadvantage of remote working, in your own words.", minWords: 40 },
    { id: "wa2", prompt: "Explain one reason why access to education varies between countries.", minWords: 40 },
    { id: "wa3", prompt: "Describe one significant effect that technology has had on how people communicate.", minWords: 40 },
    { id: "wa4", prompt: "Give your opinion: should university education be free for everyone? Explain briefly.", minWords: 40 },
    { id: "wa5", prompt: "Explain one cause and one effect of increasing urbanisation.", minWords: 40 },
  ],
  "General Training": [
    { id: "wg1", prompt: "Write a short paragraph explaining why you'd like to change your appointment time.", minWords: 40 },
    { id: "wg2", prompt: "Describe a problem you had with a recent purchase and what you'd like done about it.", minWords: 40 },
    { id: "wg3", prompt: "Write a short note to a colleague explaining why you'll be late to a meeting.", minWords: 40 },
    { id: "wg4", prompt: "Explain briefly why you're requesting a reference from a previous employer.", minWords: 40 },
    { id: "wg5", prompt: "Describe your reasons for wanting to join a local club or group.", minWords: 40 },
  ],
};

export function getItemCount(length: Length) {
  return length === "short" ? 4 : 8;
}
