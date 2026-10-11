import type { Party, PartyId, Statement, Topic, TopicId } from "@/types/parliament";

export type { Party, PartyId, Statement, Topic, TopicId };
export { PLACEHOLDER_BANNER } from "@/data/copy";

export const topics: Topic[] = [
  {
    id: "energy",
    label: "Ενέργεια",
    description: "Κόστος ρεύματος, ΑΠΕ και ενεργειακή ασφάλεια",
  },
  {
    id: "health",
    label: "Υγεία",
    description: "ΕΣΥ, προσωπικός γιατρός και φάρμακα",
  },
  {
    id: "education",
    label: "Παιδεία",
    description: "Δημόσιο σχολείο, ΑΕΙ και ιδιωτικά πανεπιστήμια",
  },
  {
    id: "economy",
    label: "Οικονομία",
    description: "Φορολογία, μισθοί και κόστος ζωής",
  },
  {
    id: "migration",
    label: "Μετανάστευση",
    description: "Σύνορα, άσυλο και ένταξη",
  },
];

export const parties: Party[] = [
  {
    id: "nd",
    shortName: "ΝΔ",
    fullName: "Νέα Δημοκρατία",
    accent: "#1d4ed8",
  },
  {
    id: "pasok",
    shortName: "ΠΑΣΟΚ",
    fullName: "ΠΑΣΟΚ – Κίνημα Αλλαγής",
    accent: "#15803d",
  },
  {
    id: "syriza",
    shortName: "ΣΥΡΙΖΑ",
    fullName: "ΣΥΡΙΖΑ – Π.Σ.",
    accent: "#dc2626",
  },
  {
    id: "kke",
    shortName: "ΚΚΕ",
    fullName: "Κομμουνιστικό Κόμμα Ελλάδας",
    accent: "#991b1b",
  },
  {
    id: "el",
    shortName: "Ελ. Λύση",
    fullName: "Ελληνική Λύση",
    accent: "#0369a1",
  },
  {
    id: "na",
    shortName: "Ν. Αριστερά",
    fullName: "Νέα Αριστερά",
    accent: "#be123c",
  },
  {
    id: "pe",
    shortName: "Πλεύση",
    fullName: "Πλεύση Ελευθερίας",
    accent: "#6d28d9",
  },
];

export const statements: Statement[] = [
  {
    id: "energy-nd",
    topicId: "energy",
    partyId: "nd",
    speaker: "Μαρία Παπαδοπούλου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-12",
    summary:
      "Υποστηρίζει επιτάχυνση ΑΠΕ, διασυνδέσεις νησιών και στοχευμένες επιδοτήσεις στους λογαριασμούς.",
    quote:
      "Η ενεργειακή ασφάλεια περνά από επενδύσεις στο δίκτυο και σταθερό πλαίσιο για ΑΠΕ, με προστασία των ευάλωτων νοικοκυριών.",
    sourceUrl: "https://example.com/placeholder/nd-energia",
    placeholder: true,
  },
  {
    id: "energy-pasok",
    topicId: "energy",
    partyId: "pasok",
    speaker: "Νίκος Γεωργίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-28",
    summary:
      "Ζητά δημόσιο έλεγχο στα δίκτυα, πλαφόν στα υπερκέρδη και κοινωνικό τιμολόγιο.",
    quote:
      "Το ρεύμα είναι κοινωνικό αγαθό. Χρειάζεται διαφάνεια στη χονδρεμπορική και προστασία από τα υπερκέρδη.",
    sourceUrl: "https://example.com/placeholder/pasok-energia",
    placeholder: true,
  },
  {
    id: "energy-syriza",
    topicId: "energy",
    partyId: "syriza",
    speaker: "Ελένη Καραγιάννη",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-02",
    summary:
      "Προτείνει επαναφορά ισχυρού ρόλου της ΔΕΗ και κατάργηση μηχανισμών που ανεβάζουν τη λιανική τιμή.",
    quote:
      "Δεν μπορεί η αγορά ενέργειας να λειτουργεί εις βάρος των νοικοκυριών. Χρειάζεται δημόσιος πυλώνας με κοινωνικό τιμολόγιο.",
    sourceUrl: "https://example.com/placeholder/syriza-energia",
    placeholder: true,
  },
  {
    id: "energy-kke",
    topicId: "energy",
    partyId: "kke",
    speaker: "Δημήτρης Αντωνίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-01-19",
    summary:
      "Απορρίπτει την απελευθέρωση της αγοράς και ζητά αποκλειστικά δημόσια ενέργεια.",
    quote:
      "Η ενέργεια δεν μπορεί να είναι εμπόρευμα. Μόνο ενιαίος δημόσιος φορέας καλύπτει τις λαϊκές ανάγκες.",
    sourceUrl: "https://example.com/placeholder/kke-energia",
    placeholder: true,
  },
  {
    id: "energy-el",
    topicId: "energy",
    partyId: "el",
    speaker: "Χρήστος Βλάχος",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-05",
    summary:
      "Δίνει έμφαση στην εγχώρια παραγωγή, λιγνίτη ως μεταβατικό καύσιμο και εθνικό έλεγχο των υποδομών.",
    quote:
      "Δεν απεμπολούμε εγχώριους πόρους. Η ενεργειακή αυτάρκεια είναι ζήτημα εθνικής ασφάλειας.",
    sourceUrl: "https://example.com/placeholder/el-energia",
    placeholder: true,
  },
  {
    id: "energy-na",
    topicId: "energy",
    partyId: "na",
    speaker: "Άννα Σταυρίδου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-11",
    summary:
      "Συνδέει την πράσινη μετάβαση με δίκαιη κατανομή κόστους και ενεργειακές κοινότητες.",
    quote:
      "Η κλιματική πολιτική αποτυγχάνει αν μετακυλίει το κόστος στους πολλούς και αφήνει τα κέρδη στους λίγους.",
    sourceUrl: "https://example.com/placeholder/na-energia",
    placeholder: true,
  },
  {
    id: "energy-pe",
    topicId: "energy",
    partyId: "pe",
    speaker: "Σοφία Λάμπρου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-18",
    summary:
      "Ζητά διαφάνεια στις συμβάσεις, έλεγχο καρτέλ και προστασία καταναλωτή από καταχρηστικές ρήτρες.",
    quote:
      "Χωρίς διαφάνεια στις συμβάσεις ενέργειας, ο πολίτης πληρώνει τυφλά. Οι ρήτρες πρέπει να ελέγχονται αυστηρά.",
    sourceUrl: "https://example.com/placeholder/pe-energia",
    placeholder: true,
  },
  {
    id: "health-nd",
    topicId: "health",
    partyId: "nd",
    speaker: "Γιώργος Μακρής",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-22",
    summary:
      "Προβάλλει προσλήψεις στο ΕΣΥ, απογευματινά χειρουργεία και ψηφιακό φάκελο υγείας.",
    quote:
      "Το ΕΣΥ ενισχύεται με προσλήψεις και σύμπραξη δημόσιου-ιδιωτικού όπου μειώνει τις λίστες αναμονής.",
    sourceUrl: "https://example.com/placeholder/nd-ygeia",
    placeholder: true,
  },
  {
    id: "health-pasok",
    topicId: "health",
    partyId: "pasok",
    speaker: "Κατερίνα Δημητρίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-07",
    summary:
      "Ζητά μόνιμες προσλήψεις, ενίσχυση πρωτοβάθμιας και κατάργηση πληρωμών για βασικές εξετάσεις.",
    quote:
      "Η υγεία δεν είναι πεδίο αγοράς. Πρωτοβάθμια φροντίδα και μόνιμο προσωπικό είναι η βάση του ΕΣΥ.",
    sourceUrl: "https://example.com/placeholder/pasok-ygeia",
    placeholder: true,
  },
  {
    id: "health-syriza",
    topicId: "health",
    partyId: "syriza",
    speaker: "Παναγιώτης Ρούσσος",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-01-30",
    summary:
      "Αντιτίθεται στην ιδιωτικοποίηση υπηρεσιών και ζητά αύξηση δαπανών υγείας ως ποσοστό του ΑΕΠ.",
    quote:
      "Οι λίστες αναμονής δεν λύνονται με ιδιωτικά απογευματινά. Λύνονται με δημόσιες κλίνες και προσωπικό.",
    sourceUrl: "https://example.com/placeholder/syriza-ygeia",
    placeholder: true,
  },
  {
    id: "health-kke",
    topicId: "health",
    partyId: "kke",
    speaker: "Όλγα Χατζή",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-01",
    summary:
      "Ζητά αποκλειστικά δημόσιο και δωρεάν σύστημα υγείας, χωρίς ΣΔΙΤ και ιδιωτικές κλινικές στο ΕΣΥ.",
    quote:
      "Καμία επιχειρηματική δραστηριότητα στην υγεία. Πλήρως δημόσιο, δωρεάν σύστημα για όλους.",
    sourceUrl: "https://example.com/placeholder/kke-ygeia",
    placeholder: true,
  },
  {
    id: "education-nd",
    topicId: "education",
    partyId: "nd",
    speaker: "Αλέξανδρος Νικολάου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-09",
    summary:
      "Υπερασπίζεται μη κρατικά πανεπιστήμια, αξιολόγηση σχολείων και σύνδεση ΑΕΙ με την αγορά εργασίας.",
    quote:
      "Η Ελλάδα δεν μπορεί να εξάγει φοιτητές. Χρειάζεται αξιολόγηση και σύγχρονα μη κρατικά ΑΕΙ με εγγυήσεις ποιότητας.",
    sourceUrl: "https://example.com/placeholder/nd-paideia",
    placeholder: true,
  },
  {
    id: "education-pasok",
    topicId: "education",
    partyId: "pasok",
    speaker: "Ιωάννα Πετρίδου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-16",
    summary:
      "Δίνει προτεραιότητα στο δημόσιο σχολείο, ολόημερο και στήριξη εκπαιδευτικών, με αυστηρό πλαίσιο για μη κρατικά ΑΕΙ.",
    quote:
      "Πρώτα το δημόσιο σχολείο. Οποιαδήποτε μη κρατική τριτοβάθμια εκπαίδευση οφείλει να μην υπονομεύει το δημόσιο πανεπιστήμιο.",
    sourceUrl: "https://example.com/placeholder/pasok-paideia",
    placeholder: true,
  },
  {
    id: "education-syriza",
    topicId: "education",
    partyId: "syriza",
    speaker: "Μιχάλης Κωνσταντίνου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-21",
    summary:
      "Απορρίπτει ιδιωτικά πανεπιστήμια και ζητά αύξηση δημόσιας δαπάνης για παιδεία.",
    quote:
      "Το άρθρο 16 δεν είναι εμπόδιο. Είναι εγγύηση ότι η γνώση δεν γίνεται εμπόρευμα.",
    sourceUrl: "https://example.com/placeholder/syriza-paideia",
    placeholder: true,
  },
  {
    id: "education-kke",
    topicId: "education",
    partyId: "kke",
    speaker: "Βασιλική Μάνου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-01-14",
    summary:
      "Ζητά αποκλειστικά δημόσια και δωρεάν παιδεία σε όλες τις βαθμίδες, με κατάργηση εξεταστικών φραγμών ταξικού χαρακτήρα.",
    quote:
      "Η μόρφωση είναι δικαίωμα, όχι προνόμιο όσων πληρώνουν. Ένα ενιαίο δημόσιο σύστημα για όλα τα παιδιά.",
    sourceUrl: "https://example.com/placeholder/kke-paideia",
    placeholder: true,
  },
  {
    id: "economy-nd",
    topicId: "economy",
    partyId: "nd",
    speaker: "Θανάσης Οικονόμου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-04",
    summary:
      "Προβάλλει μείωση ασφαλιστικών εισφορών, επενδύσεις και αύξηση κατώτατου μισθού με βάση την ανάπτυξη.",
    quote:
      "Σταθερότητα, επενδύσεις και στοχευμένες μειώσεις φόρων φέρνουν πραγματικές αυξήσεις στους μισθούς.",
    sourceUrl: "https://example.com/placeholder/nd-oikonomia",
    placeholder: true,
  },
  {
    id: "economy-pasok",
    topicId: "economy",
    partyId: "pasok",
    speaker: "Λίνα Βασιλείου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-08",
    summary:
      "Ζητά προοδευτική φορολόγηση, στήριξη μεσαίας τάξης και έλεγχο της ακρίβειας στα βασικά αγαθά.",
    quote:
      "Η ανάπτυξη χωρίς δίκαιη κατανομή είναι στατιστική. Χρειάζεται προοδευτική φορολογία και έλεγχος της ακρίβειας.",
    sourceUrl: "https://example.com/placeholder/pasok-oikonomia",
    placeholder: true,
  },
  {
    id: "economy-syriza",
    topicId: "economy",
    partyId: "syriza",
    speaker: "Αντώνης Σακελλαρίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-16",
    summary:
      "Προτείνει φορολόγηση υπερκερδών, αυξήσεις μισθών και ρύθμιση στεγαστικής κρίσης.",
    quote:
      "Τα υπερκέρδη λίγων κλάδων και τα ενοίκια που εκτοξεύονται δεν είναι φυσικό φαινόμενο. Είναι πολιτική επιλογή.",
    sourceUrl: "https://example.com/placeholder/syriza-oikonomia",
    placeholder: true,
  },
  {
    id: "economy-el",
    topicId: "economy",
    partyId: "el",
    speaker: "Πέτρος Δαμιανού",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-27",
    summary:
      "Δίνει έμφαση σε εθνική παραγωγή, μείωση ΦΠΑ σε βασικά αγαθά και στήριξη αγροτών.",
    quote:
      "Χωρίς πρωτογενή παραγωγή και φθηνά βασικά αγαθά, η ανάπτυξη μένει στα χαρτιά.",
    sourceUrl: "https://example.com/placeholder/el-oikonomia",
    placeholder: true,
  },
  {
    id: "migration-nd",
    topicId: "migration",
    partyId: "nd",
    speaker: "Στέλιος Χαραλάμπους",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-11",
    summary:
      "Υποστηρίζει φύλαξη συνόρων, ταχείες επιστροφές και νόμιμες ροές με βάση τις ανάγκες της αγοράς εργασίας.",
    quote:
      "Σύνορα που φυλάσσονται, διαδικασίες ασύλου που ολοκληρώνονται γρήγορα και νόμιμη εργασία όπου υπάρχει ανάγκη.",
    sourceUrl: "https://example.com/placeholder/nd-metanasteusi",
    placeholder: true,
  },
  {
    id: "migration-pasok",
    topicId: "migration",
    partyId: "pasok",
    speaker: "Ράνια Αλεξίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-25",
    summary:
      "Ζητά ευρωπαϊκή κατανομή ευθυνών, ανθρώπινες δομές και νόμιμες διαδρομές ένταξης.",
    quote:
      "Η Ελλάδα δεν μπορεί να σηκώνει μόνη το βάρος. Χρειάζεται ευρωπαϊκή αλληλεγγύη και σοβαρή ένταξη.",
    sourceUrl: "https://example.com/placeholder/pasok-metanasteusi",
    placeholder: true,
  },
  {
    id: "migration-syriza",
    topicId: "migration",
    partyId: "syriza",
    speaker: "Ηλίας Παππάς",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-01-27",
    summary:
      "Επικεντρώνεται σε δικαιώματα αιτούντων άσυλο, διάσωση στη θάλασσα και ένταξη στα νησιά και την ενδοχώρα.",
    quote:
      "Η φύλαξη συνόρων δεν αναιρεί την υποχρέωση διάσωσης και δίκαιης εξέτασης αιτημάτων ασύλου.",
    sourceUrl: "https://example.com/placeholder/syriza-metanasteusi",
    placeholder: true,
  },
  {
    id: "migration-el",
    topicId: "migration",
    partyId: "el",
    speaker: "Κώστας Λυμπερόπουλος",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-19",
    summary:
      "Ζητά αυστηρότερους ελέγχους, κλειστές δομές και άμεσες απελάσεις όσων δεν δικαιούνται άσυλο.",
    quote:
      "Πρώτα η ασφάλεια της χώρας. Όποιος δεν δικαιούται άσυλο επιστρέφει χωρίς καθυστέρηση.",
    sourceUrl: "https://example.com/placeholder/el-metanasteusi",
    placeholder: true,
  },
  {
    id: "migration-pe",
    topicId: "migration",
    partyId: "pe",
    speaker: "Δανάη Φωτίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-06",
    summary:
      "Δίνει έμφαση στη διαφάνεια επιχειρήσεων στο Αιγαίο, λογοδοσία και προστασία ανθρωπίνων δικαιωμάτων.",
    quote:
      "Καμία επιχείρηση στα σύνορα χωρίς λογοδοσία. Τα δικαιώματα και η διαφάνεια δεν είναι πολυτέλεια.",
    sourceUrl: "https://example.com/placeholder/pe-metanasteusi",
    placeholder: true,
  },
];

export function getParty(id: PartyId): Party {
  const party = parties.find((item) => item.id === id);
  if (!party) {
    throw new Error(`Unknown party: ${id}`);
  }
  return party;
}

export function getTopic(id: TopicId): Topic {
  const topic = topics.find((item) => item.id === id);
  if (!topic) {
    throw new Error(`Unknown topic: ${id}`);
  }
  return topic;
}
