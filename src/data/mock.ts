import type { Party, PartyId, Statement, Topic, TopicId } from "@/types/parliament";

export type { Party, PartyId, Statement, Topic, TopicId };
export { PLACEHOLDER_BANNER } from "@/data/copy";

export const topics: Topic[] = [
  {
    id: "energy",
    label: "Ενέργεια",
    description: "Κόστος ρεύματος, ΑΠΕ και ενεργειακή ασφάλεια",
    en: { label: "Energy", description: "Electricity prices, renewables and energy security" },
  },
  {
    id: "health",
    label: "Υγεία",
    description: "ΕΣΥ, προσωπικός γιατρός και φάρμακα",
    en: { label: "Health", description: "Health system, GPs and medicines" },
  },
  {
    id: "education",
    label: "Παιδεία",
    description: "Δημόσιο σχολείο, ΑΕΙ και ιδιωτικά πανεπιστήμια",
    en: { label: "Education", description: "Public schools, universities and private colleges" },
  },
  {
    id: "economy",
    label: "Οικονομία",
    description: "Φορολογία, μισθοί και κόστος ζωής",
    en: { label: "Economy", description: "Taxes, wages and the cost of living" },
  },
  {
    id: "migration",
    label: "Μετανάστευση",
    description: "Σύνορα, άσυλο και ένταξη",
    en: { label: "Migration", description: "Borders, asylum and integration" },
  },
];

/*
 * The parties in the sample data are invented on purpose (Κόμμα Α to Κόμμα Η).
 * The statements below are written for the demo, not taken from the minutes of
 * Parliament. Put under the names of real parties, a screenshot of the demo reads
 * as if those parties said these things, which they did not. Invented parties keep
 * the demo realistic without attributing made-up positions to anyone. Real parties
 * belong in the Supabase data, next to real, sourced statements.
 */
export const parties: Party[] = [
  {
    id: "a",
    shortName: "Κόμμα Α",
    fullName: "Κόμμα Α (υπόδειγμα)",
    en: { shortName: "Party A", fullName: "Party A (sample)" },
    accent: "#3b6ff5",
  },
  {
    id: "b",
    shortName: "Κόμμα Β",
    fullName: "Κόμμα Β (υπόδειγμα)",
    en: { shortName: "Party B", fullName: "Party B (sample)" },
    accent: "#0d9488",
  },
  {
    id: "c",
    shortName: "Κόμμα Γ",
    fullName: "Κόμμα Γ (υπόδειγμα)",
    en: { shortName: "Party C", fullName: "Party C (sample)" },
    accent: "#ea580c",
  },
  {
    id: "d",
    shortName: "Κόμμα Δ",
    fullName: "Κόμμα Δ (υπόδειγμα)",
    en: { shortName: "Party D", fullName: "Party D (sample)" },
    accent: "#9333ea",
  },
  {
    id: "e",
    shortName: "Κόμμα Ε",
    fullName: "Κόμμα Ε (υπόδειγμα)",
    en: { shortName: "Party E", fullName: "Party E (sample)" },
    accent: "#ca8a04",
  },
  {
    id: "f",
    shortName: "Κόμμα Ζ",
    fullName: "Κόμμα Ζ (υπόδειγμα)",
    en: { shortName: "Party F", fullName: "Party F (sample)" },
    accent: "#db2777",
  },
  {
    id: "g",
    shortName: "Κόμμα Η",
    fullName: "Κόμμα Η (υπόδειγμα)",
    en: { shortName: "Party G", fullName: "Party G (sample)" },
    accent: "#64748b",
  },
];

export const statements: Statement[] = [
  {
    id: "energy-a",
    topicId: "energy",
    partyId: "a",
    speaker: "Μαρία Παπαδοπούλου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-12",
    summary:
      "Υποστηρίζει επιτάχυνση ΑΠΕ, διασυνδέσεις νησιών και στοχευμένες επιδοτήσεις στους λογαριασμούς.",
    quote:
      "Η ενεργειακή ασφάλεια περνά από επενδύσεις στο δίκτυο και σταθερό πλαίσιο για ΑΠΕ, με προστασία των ευάλωτων νοικοκυριών.",
    sourceUrl: "https://example.com/placeholder/party-a-energia",
    placeholder: true,
    en: { speaker: "Maria Papadopoulou", role: "MP (sample)", summary: "Backs faster renewables, island grid links and targeted subsidies on household bills.", quote: "Energy security runs through investment in the grid and a stable framework for renewables, with protection for vulnerable households." },
  },
  {
    id: "energy-b",
    topicId: "energy",
    partyId: "b",
    speaker: "Νίκος Γεωργίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-28",
    summary:
      "Ζητά δημόσιο έλεγχο στα δίκτυα, πλαφόν στα υπερκέρδη και κοινωνικό τιμολόγιο.",
    quote:
      "Το ρεύμα είναι κοινωνικό αγαθό. Χρειάζεται διαφάνεια στη χονδρεμπορική και προστασία από τα υπερκέρδη.",
    sourceUrl: "https://example.com/placeholder/party-b-energia",
    placeholder: true,
    en: { speaker: "Nikos Georgiou", role: "MP (sample)", summary: "Calls for public control of the networks, a cap on windfall profits and a social tariff.", quote: "Electricity is a social good. Wholesale prices need transparency and households need protection from windfall profits." },
  },
  {
    id: "energy-c",
    topicId: "energy",
    partyId: "c",
    speaker: "Ελένη Καραγιάννη",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-02",
    summary:
      "Προτείνει επαναφορά ισχυρού ρόλου της ΔΕΗ και κατάργηση μηχανισμών που ανεβάζουν τη λιανική τιμή.",
    quote:
      "Δεν μπορεί η αγορά ενέργειας να λειτουργεί εις βάρος των νοικοκυριών. Χρειάζεται δημόσιος πυλώνας με κοινωνικό τιμολόγιο.",
    sourceUrl: "https://example.com/placeholder/party-c-energia",
    placeholder: true,
    en: { speaker: "Eleni Karagianni", role: "MP (sample)", summary: "Proposes a stronger role for the public power company and scrapping mechanisms that push up retail prices.", quote: "The energy market cannot work against households. We need a public pillar with a social tariff." },
  },
  {
    id: "energy-d",
    topicId: "energy",
    partyId: "d",
    speaker: "Δημήτρης Αντωνίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-01-19",
    summary:
      "Απορρίπτει την απελευθέρωση της αγοράς και ζητά αποκλειστικά δημόσια ενέργεια.",
    quote:
      "Η ενέργεια δεν μπορεί να είναι εμπόρευμα. Μόνο ενιαίος δημόσιος φορέας καλύπτει τις λαϊκές ανάγκες.",
    sourceUrl: "https://example.com/placeholder/party-d-energia",
    placeholder: true,
    en: { speaker: "Dimitris Antoniou", role: "MP (sample)", summary: "Rejects market liberalisation and calls for energy to be entirely public.", quote: "Energy cannot be a commodity. Only a single public body can meet people's needs." },
  },
  {
    id: "energy-e",
    topicId: "energy",
    partyId: "e",
    speaker: "Χρήστος Βλάχος",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-05",
    summary:
      "Δίνει έμφαση στην εγχώρια παραγωγή, λιγνίτη ως μεταβατικό καύσιμο και εθνικό έλεγχο των υποδομών.",
    quote:
      "Δεν απεμπολούμε εγχώριους πόρους. Η ενεργειακή αυτάρκεια είναι ζήτημα εθνικής ασφάλειας.",
    sourceUrl: "https://example.com/placeholder/party-e-energia",
    placeholder: true,
    en: { speaker: "Christos Vlachos", role: "MP (sample)", summary: "Puts domestic production first, with lignite as a transition fuel and national control of infrastructure.", quote: "We will not give up our own resources. Energy self-sufficiency is a matter of national security." },
  },
  {
    id: "energy-f",
    topicId: "energy",
    partyId: "f",
    speaker: "Άννα Σταυρίδου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-11",
    summary:
      "Συνδέει την πράσινη μετάβαση με δίκαιη κατανομή κόστους και ενεργειακές κοινότητες.",
    quote:
      "Η κλιματική πολιτική αποτυγχάνει αν μετακυλίει το κόστος στους πολλούς και αφήνει τα κέρδη στους λίγους.",
    sourceUrl: "https://example.com/placeholder/party-f-energia",
    placeholder: true,
    en: { speaker: "Anna Stavridou", role: "MP (sample)", summary: "Ties the green transition to a fair split of costs and to energy communities.", quote: "Climate policy fails if it passes the cost to the many and leaves the profits with the few." },
  },
  {
    id: "energy-g",
    topicId: "energy",
    partyId: "g",
    speaker: "Σοφία Λάμπρου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-18",
    summary:
      "Ζητά διαφάνεια στις συμβάσεις, έλεγχο καρτέλ και προστασία καταναλωτή από καταχρηστικές ρήτρες.",
    quote:
      "Χωρίς διαφάνεια στις συμβάσεις ενέργειας, ο πολίτης πληρώνει τυφλά. Οι ρήτρες πρέπει να ελέγχονται αυστηρά.",
    sourceUrl: "https://example.com/placeholder/party-g-energia",
    placeholder: true,
    en: { speaker: "Sofia Lamprou", role: "MP (sample)", summary: "Calls for transparent contracts, action against cartels and protection from unfair clauses.", quote: "Without transparent energy contracts, citizens pay blind. The clauses must be checked strictly." },
  },
  {
    id: "health-a",
    topicId: "health",
    partyId: "a",
    speaker: "Γιώργος Μακρής",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-22",
    summary:
      "Προβάλλει προσλήψεις στο ΕΣΥ, απογευματινά χειρουργεία και ψηφιακό φάκελο υγείας.",
    quote:
      "Το ΕΣΥ ενισχύεται με προσλήψεις και σύμπραξη δημόσιου-ιδιωτικού όπου μειώνει τις λίστες αναμονής.",
    sourceUrl: "https://example.com/placeholder/party-a-ygeia",
    placeholder: true,
    en: { speaker: "Giorgos Makris", role: "MP (sample)", summary: "Points to new hires in the national health system, afternoon surgeries and a digital health record.", quote: "The health system is strengthened by new hires and public-private partnership where it cuts waiting lists." },
  },
  {
    id: "health-b",
    topicId: "health",
    partyId: "b",
    speaker: "Κατερίνα Δημητρίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-07",
    summary:
      "Ζητά μόνιμες προσλήψεις, ενίσχυση πρωτοβάθμιας και κατάργηση πληρωμών για βασικές εξετάσεις.",
    quote:
      "Η υγεία δεν είναι πεδίο αγοράς. Πρωτοβάθμια φροντίδα και μόνιμο προσωπικό είναι η βάση του ΕΣΥ.",
    sourceUrl: "https://example.com/placeholder/party-b-ygeia",
    placeholder: true,
    en: { speaker: "Katerina Dimitriou", role: "MP (sample)", summary: "Calls for permanent hires, stronger primary care and free basic tests.", quote: "Health is not a market. Primary care and permanent staff are the backbone of the health system." },
  },
  {
    id: "health-c",
    topicId: "health",
    partyId: "c",
    speaker: "Παναγιώτης Ρούσσος",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-01-30",
    summary:
      "Αντιτίθεται στην ιδιωτικοποίηση υπηρεσιών και ζητά αύξηση δαπανών υγείας ως ποσοστό του ΑΕΠ.",
    quote:
      "Οι λίστες αναμονής δεν λύνονται με ιδιωτικά απογευματινά. Λύνονται με δημόσιες κλίνες και προσωπικό.",
    sourceUrl: "https://example.com/placeholder/party-c-ygeia",
    placeholder: true,
    en: { speaker: "Panagiotis Roussos", role: "MP (sample)", summary: "Opposes privatising services and calls for health spending to rise as a share of GDP.", quote: "Waiting lists are not solved by private afternoon slots. They are solved by public beds and staff." },
  },
  {
    id: "health-d",
    topicId: "health",
    partyId: "d",
    speaker: "Όλγα Χατζή",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-01",
    summary:
      "Ζητά αποκλειστικά δημόσιο και δωρεάν σύστημα υγείας, χωρίς ΣΔΙΤ και ιδιωτικές κλινικές στο ΕΣΥ.",
    quote:
      "Καμία επιχειρηματική δραστηριότητα στην υγεία. Πλήρως δημόσιο, δωρεάν σύστημα για όλους.",
    sourceUrl: "https://example.com/placeholder/party-d-ygeia",
    placeholder: true,
    en: { speaker: "Olga Chatzi", role: "MP (sample)", summary: "Calls for a fully public, free health system, with no private partnerships or private clinics in it.", quote: "No business in health. A fully public, free system for everyone." },
  },
  {
    id: "education-a",
    topicId: "education",
    partyId: "a",
    speaker: "Αλέξανδρος Νικολάου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-09",
    summary:
      "Υπερασπίζεται μη κρατικά πανεπιστήμια, αξιολόγηση σχολείων και σύνδεση ΑΕΙ με την αγορά εργασίας.",
    quote:
      "Η Ελλάδα δεν μπορεί να εξάγει φοιτητές. Χρειάζεται αξιολόγηση και σύγχρονα μη κρατικά ΑΕΙ με εγγυήσεις ποιότητας.",
    sourceUrl: "https://example.com/placeholder/party-a-paideia",
    placeholder: true,
    en: { speaker: "Alexandros Nikolaou", role: "MP (sample)", summary: "Defends non-state universities, school evaluation and closer links between universities and jobs.", quote: "Greece cannot keep exporting its students. We need evaluation and modern non-state universities with quality guarantees." },
  },
  {
    id: "education-b",
    topicId: "education",
    partyId: "b",
    speaker: "Ιωάννα Πετρίδου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-16",
    summary:
      "Δίνει προτεραιότητα στο δημόσιο σχολείο, ολόημερο και στήριξη εκπαιδευτικών, με αυστηρό πλαίσιο για μη κρατικά ΑΕΙ.",
    quote:
      "Πρώτα το δημόσιο σχολείο. Οποιαδήποτε μη κρατική τριτοβάθμια εκπαίδευση οφείλει να μην υπονομεύει το δημόσιο πανεπιστήμιο.",
    sourceUrl: "https://example.com/placeholder/party-b-paideia",
    placeholder: true,
    en: { speaker: "Ioanna Petridou", role: "MP (sample)", summary: "Puts the public school first, with all-day schools and support for teachers, and a strict framework for non-state universities.", quote: "Public schools come first. Any non-state higher education must not undermine the public university." },
  },
  {
    id: "education-c",
    topicId: "education",
    partyId: "c",
    speaker: "Μιχάλης Κωνσταντίνου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-21",
    summary:
      "Απορρίπτει ιδιωτικά πανεπιστήμια και ζητά αύξηση δημόσιας δαπάνης για παιδεία.",
    quote:
      "Το άρθρο 16 δεν είναι εμπόδιο. Είναι εγγύηση ότι η γνώση δεν γίνεται εμπόρευμα.",
    sourceUrl: "https://example.com/placeholder/party-c-paideia",
    placeholder: true,
    en: { speaker: "Michalis Konstantinou", role: "MP (sample)", summary: "Rejects private universities and calls for more public spending on education.", quote: "Article 16 is not an obstacle. It is a guarantee that knowledge does not become a commodity." },
  },
  {
    id: "education-d",
    topicId: "education",
    partyId: "d",
    speaker: "Βασιλική Μάνου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-01-14",
    summary:
      "Ζητά αποκλειστικά δημόσια και δωρεάν παιδεία σε όλες τις βαθμίδες, με κατάργηση εξεταστικών φραγμών ταξικού χαρακτήρα.",
    quote:
      "Η μόρφωση είναι δικαίωμα, όχι προνόμιο όσων πληρώνουν. Ένα ενιαίο δημόσιο σύστημα για όλα τα παιδιά.",
    sourceUrl: "https://example.com/placeholder/party-d-paideia",
    placeholder: true,
    en: { speaker: "Vasiliki Manou", role: "MP (sample)", summary: "Calls for entirely public, free education at every level, without exam barriers that sort children by class.", quote: "Education is a right, not a privilege for those who can pay. One public system for every child." },
  },
  {
    id: "economy-a",
    topicId: "economy",
    partyId: "a",
    speaker: "Θανάσης Οικονόμου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-04",
    summary:
      "Προβάλλει μείωση ασφαλιστικών εισφορών, επενδύσεις και αύξηση κατώτατου μισθού με βάση την ανάπτυξη.",
    quote:
      "Σταθερότητα, επενδύσεις και στοχευμένες μειώσεις φόρων φέρνουν πραγματικές αυξήσεις στους μισθούς.",
    sourceUrl: "https://example.com/placeholder/party-a-oikonomia",
    placeholder: true,
    en: { speaker: "Thanasis Oikonomou", role: "MP (sample)", summary: "Points to lower social security contributions, investment and a minimum wage that rises with growth.", quote: "Stability, investment and targeted tax cuts bring real pay rises." },
  },
  {
    id: "economy-b",
    topicId: "economy",
    partyId: "b",
    speaker: "Λίνα Βασιλείου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-08",
    summary:
      "Ζητά προοδευτική φορολόγηση, στήριξη μεσαίας τάξης και έλεγχο της ακρίβειας στα βασικά αγαθά.",
    quote:
      "Η ανάπτυξη χωρίς δίκαιη κατανομή είναι στατιστική. Χρειάζεται προοδευτική φορολογία και έλεγχος της ακρίβειας.",
    sourceUrl: "https://example.com/placeholder/party-b-oikonomia",
    placeholder: true,
    en: { speaker: "Lina Vasileiou", role: "MP (sample)", summary: "Calls for progressive taxation, support for the middle class and action on the price of basic goods.", quote: "Growth without fair distribution is just a statistic. We need progressive tax and control of rising prices." },
  },
  {
    id: "economy-c",
    topicId: "economy",
    partyId: "c",
    speaker: "Αντώνης Σακελλαρίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-16",
    summary:
      "Προτείνει φορολόγηση υπερκερδών, αυξήσεις μισθών και ρύθμιση στεγαστικής κρίσης.",
    quote:
      "Τα υπερκέρδη λίγων κλάδων και τα ενοίκια που εκτοξεύονται δεν είναι φυσικό φαινόμενο. Είναι πολιτική επιλογή.",
    sourceUrl: "https://example.com/placeholder/party-c-oikonomia",
    placeholder: true,
    en: { speaker: "Antonis Sakellariou", role: "MP (sample)", summary: "Proposes a windfall tax, pay rises and action on the housing crisis.", quote: "The windfall profits of a few sectors and soaring rents are not a natural phenomenon. They are a political choice." },
  },
  {
    id: "economy-e",
    topicId: "economy",
    partyId: "e",
    speaker: "Πέτρος Δαμιανού",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-27",
    summary:
      "Δίνει έμφαση σε εθνική παραγωγή, μείωση ΦΠΑ σε βασικά αγαθά και στήριξη αγροτών.",
    quote:
      "Χωρίς πρωτογενή παραγωγή και φθηνά βασικά αγαθά, η ανάπτυξη μένει στα χαρτιά.",
    sourceUrl: "https://example.com/placeholder/party-e-oikonomia",
    placeholder: true,
    en: { speaker: "Petros Damianou", role: "MP (sample)", summary: "Stresses national production, lower VAT on basic goods and support for farmers.", quote: "Without primary production and cheap basic goods, growth stays on paper." },
  },
  {
    id: "migration-a",
    topicId: "migration",
    partyId: "a",
    speaker: "Στέλιος Χαραλάμπους",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-11",
    summary:
      "Υποστηρίζει φύλαξη συνόρων, ταχείες επιστροφές και νόμιμες ροές με βάση τις ανάγκες της αγοράς εργασίας.",
    quote:
      "Σύνορα που φυλάσσονται, διαδικασίες ασύλου που ολοκληρώνονται γρήγορα και νόμιμη εργασία όπου υπάρχει ανάγκη.",
    sourceUrl: "https://example.com/placeholder/party-a-metanasteusi",
    placeholder: true,
    en: { speaker: "Stelios Charalampous", role: "MP (sample)", summary: "Supports border protection, fast returns and legal routes based on what the job market needs.", quote: "Guarded borders, asylum procedures that finish quickly, and legal work where it is needed." },
  },
  {
    id: "migration-b",
    topicId: "migration",
    partyId: "b",
    speaker: "Ράνια Αλεξίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-02-25",
    summary:
      "Ζητά ευρωπαϊκή κατανομή ευθυνών, ανθρώπινες δομές και νόμιμες διαδρομές ένταξης.",
    quote:
      "Η Ελλάδα δεν μπορεί να σηκώνει μόνη το βάρος. Χρειάζεται ευρωπαϊκή αλληλεγγύη και σοβαρή ένταξη.",
    sourceUrl: "https://example.com/placeholder/party-b-metanasteusi",
    placeholder: true,
    en: { speaker: "Rania Alexiou", role: "MP (sample)", summary: "Calls for EU-wide burden sharing, humane reception centres and legal paths to integration.", quote: "Greece cannot carry the burden alone. We need European solidarity and serious integration." },
  },
  {
    id: "migration-c",
    topicId: "migration",
    partyId: "c",
    speaker: "Ηλίας Παππάς",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-01-27",
    summary:
      "Επικεντρώνεται σε δικαιώματα αιτούντων άσυλο, διάσωση στη θάλασσα και ένταξη στα νησιά και την ενδοχώρα.",
    quote:
      "Η φύλαξη συνόρων δεν αναιρεί την υποχρέωση διάσωσης και δίκαιης εξέτασης αιτημάτων ασύλου.",
    sourceUrl: "https://example.com/placeholder/party-c-metanasteusi",
    placeholder: true,
    en: { speaker: "Ilias Pappas", role: "MP (sample)", summary: "Focuses on the rights of asylum seekers, rescue at sea and integration on the islands and the mainland.", quote: "Guarding the borders does not cancel the duty to rescue people and to judge asylum claims fairly." },
  },
  {
    id: "migration-e",
    topicId: "migration",
    partyId: "e",
    speaker: "Κώστας Λυμπερόπουλος",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-03-19",
    summary:
      "Ζητά αυστηρότερους ελέγχους, κλειστές δομές και άμεσες απελάσεις όσων δεν δικαιούνται άσυλο.",
    quote:
      "Πρώτα η ασφάλεια της χώρας. Όποιος δεν δικαιούται άσυλο επιστρέφει χωρίς καθυστέρηση.",
    sourceUrl: "https://example.com/placeholder/party-e-metanasteusi",
    placeholder: true,
    en: { speaker: "Kostas Lymperopoulos", role: "MP (sample)", summary: "Calls for stricter checks, closed centres and immediate removal of those not entitled to asylum.", quote: "The country's security comes first. Anyone not entitled to asylum goes back without delay." },
  },
  {
    id: "migration-g",
    topicId: "migration",
    partyId: "g",
    speaker: "Δανάη Φωτίου",
    role: "Βουλευτής (υπόδειγμα)",
    date: "2026-04-06",
    summary:
      "Δίνει έμφαση στη διαφάνεια επιχειρήσεων στο Αιγαίο, λογοδοσία και προστασία ανθρωπίνων δικαιωμάτων.",
    quote:
      "Καμία επιχείρηση στα σύνορα χωρίς λογοδοσία. Τα δικαιώματα και η διαφάνεια δεν είναι πολυτέλεια.",
    sourceUrl: "https://example.com/placeholder/party-g-metanasteusi",
    placeholder: true,
    en: { speaker: "Danai Fotiou", role: "MP (sample)", summary: "Stresses transparency over operations in the Aegean, accountability and protection of human rights.", quote: "No border operation without accountability. Rights and transparency are not a luxury." },
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
