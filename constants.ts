export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

/**
 * Curated list of common 5-letter words for the daily target.
 */
export const TARGET_WORDS = [
  "react", "logic", "clock", "speed", "timer", "power", "smart", "brain", "score", "world",
  "earth", "light", "space", "point", "sound", "voice", "clear", "fresh", "great", "magic",
  "night", "party", "radio", "stone", "table", "water", "young", "zebra", "apple", "beach",
  "cloud", "dance", "eagle", "fruit", "glass", "heart", "index", "juice", "knife", "lemon",
  "music", "novel", "ocean", "piano", "queen", "river", "sugar", "tiger", "union", "video",
  "whale", "xenon", "yield", "bread", "chair", "dream", "entry", "field", "green", "hotel",
  "image", "joint", "kings", "layer", "match", "north", "order", "phase", "quiet", "route",
  "shelf", "train", "under", "visit", "white", "years", "zones", "about", "above", "actor",
  "acute", "admit", "adopt", "adult", "after", "again", "agent", "agree", "ahead", "alarm",
  "album", "alert", "alike", "alive", "allow", "alone", "along", "alter", "among", "anger",
  "angle", "angry", "apart", "apple", "apply", "arena", "argue", "arise", "array", "aside",
  "asset", "audio", "audit", "avoid", "award", "aware", "awful", "basic", "basis", "begin",
  "below", "bench", "birth", "black", "blade", "block", "blood", "board", "boost", "booth",
  "bound", "brain", "brand", "break", "brief", "bring", "broad", "brown", "build", "built",
  "buyer", "cable", "calm", "canal", "carry", "catch", "cause", "chain", "chair", "chart",
  "check", "chest", "chief", "child", "china", "chose", "civil", "claim", "class", "clean",
  "clear", "click", "clock", "close", "coach", "coast", "count", "court", "cover", "craft",
  "crash", "cream", "crime", "cross", "crowd", "crown", "curve", "cycle", "daily", "dance",
  "dated", "death", "debug", "delay", "delta", "depth", "diary", "digit", "dirty", "draft",
  "drama", "dream", "dress", "drink", "drive", "drove", "dying", "eager", "early", "earth",
  "eight", "elite", "empty", "enemy", "enjoy", "enter", "entry", "equal", "error", "event",
  "every", "exact", "exist", "extra", "faith", "false", "fault", "fiber", "field", "fifth",
  "fifty", "fight", "final", "first", "fixed", "flash", "fleet", "floor", "fluid", "focus",
  "force", "forth", "forty", "forum", "found", "frame", "frank", "fraud", "fresh", "front",
  "fruit", "fully", "funny", "giant", "given", "glass", "globe", "going", "grace", "grade",
  "grand", "grant", "graph", "grass", "great", "green", "gross", "group", "grown", "guard",
  "guess", "guest", "guide", "habit", "happy", "heart", "heavy", "hence", "honor", "horse",
  "hotel", "house", "human", "ideal", "image", "index", "inner", "input", "issue", "joint",
  "judge", "juice", "known", "label", "large", "laser", "later", "laugh", "layer", "learn",
  "lease", "least", "leave", "legal", "level", "light", "limit", "links", "lives", "local",
  "logic", "loose", "lower", "lucky", "lunch", "magic", "major", "maker", "march", "match",
  "maybe", "mayor", "meant", "media", "metal", "might", "minor", "minus", "mixed", "model",
  "money", "month", "moral", "motor", "mount", "mouse", "mouth", "movie", "music", "needs",
  "never", "newly", "night", "noise", "north", "noted", "novel", "nurse", "occur", "ocean",
  "offer", "often", "order", "other", "ought", "outer", "owner", "panel", "paper", "party",
  "peace", "peter", "phase", "phone", "photo", "piece", "pilot", "pitch", "place", "plain",
  "plane", "plant", "plate", "point", "pound", "power", "press", "price", "pride", "prime",
  "print", "prior", "prize", "proof", "proud", "prove", "queen", "quick", "quiet", "quite",
  "radio", "raise", "range", "rapid", "ratio", "reach", "ready", "refer", "right", "rival",
  "river", "robin", "rough", "round", "route", "royal", "rural", "scale", "scene", "scope",
  "score", "sense", "serve", "seven", "shade", "shaft", "shake", "share", "sharp", "sheet",
  "shelf", "shell", "shift", "shirt", "shock", "shoot", "short", "shown", "sight", "since",
  "sixth", "sixty", "sized", "skill", "sleep", "slide", "small", "smart", "smile", "smith",
  "smoke", "solid", "solve", "sorry", "sound", "south", "space", "spare", "speak", "speed",
  "spend", "spent", "split", "spoke", "sport", "staff", "stage", "stake", "stand", "start",
  "state", "steam", "steel", "stick", "still", "stock", "stone", "stood", "store", "storm",
  "story", "strip", "stuck", "study", "stuff", "style", "sugar", "suite", "super", "sweet",
  "table", "taken", "taste", "taxes", "teach", "teeth", "terry", "texas", "thank", "theft",
  "their", "theme", "there", "these", "thick", "thing", "think", "third", "those", "three",
  "threw", "throw", "tight", "times", "tired", "title", "today", "topic", "total", "touch",
  "tough", "tower", "track", "trade", "train", "treat", "trend", "trial", "tried", "tries",
  "truck", "truly", "trust", "truth", "twice", "under", "undue", "union", "unity", "until",
  "upper", "upset", "urban", "usage", "usual", "valid", "value"
];

// Define the keyboard layout for the game UI
export const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
];

// External sources for the word dictionary
export const DICTIONARY_SOURCES = [
  'https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt'
];
