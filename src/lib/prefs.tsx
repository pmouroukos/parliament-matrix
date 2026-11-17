"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "el" | "en";
export type Theme = "dark" | "light";

const STRINGS = {
  el: {
    placeholderBanner: "Δεδομένα υπόδειγμα: τα κόμματα και οι δηλώσεις είναι επινοημένα για το demo, δεν προέρχονται από τα πρακτικά της Βουλής.",
    liveBanner: "Οι καταχωρίσεις προέρχονται από τη βάση δεδομένων. Ελέγξτε τις πρωτογενείς πηγές πριν τις θεωρήσετε επαληθευμένες.",
    loading: "Φόρτωση πολιτικών θέσεων...",
    loadError: "Σφάλμα σύνδεσης:",
    loadErrorFallback: "Σφάλμα φόρτωσης δεδομένων.",
    empty: "Δεν υπάρχουν διαθέσιμες πολιτικές θέσεις στη βάση.",
    pickTopic: "Επιλογή θέματος",
    topicsNav: "Θέματα συζήτησης",
    partyFilters: "Φίλτρα κομμάτων",
    allParties: "Όλα",
    search: "Αναζήτηση δηλώσεων",
    searchPlaceholder: "Αναζήτηση…",
    from: "Από ημερομηνία",
    to: "Έως ημερομηνία",
    sort: "Ταξινόμηση",
    sortOriginal: "Αρχική σειρά",
    sortNewest: "Νεότερες πρώτα",
    sortOldest: "Παλαιότερες πρώτα",
    subcategory: "Υποκατηγορία",
    allSubcategories: "Όλες οι υποκατηγορίες",
    badRange: "Η ημερομηνία έναρξης πρέπει να είναι πριν ή ίδια με την ημερομηνία λήξης.",
    resetFilters: "Καθαρισμός φίλτρων",
    noResults: "Δεν βρέθηκαν δηλώσεις με αυτά τα κριτήρια.",
    showing: (n: number, total: number) => `Εμφανίζονται ${n} από ${total} δηλώσεις`,
    source: "Πηγή",
    noDate: "Δεν αναφέρεται",
    language: "Γλώσσα",
    toLight: "Φωτεινό θέμα",
    toDark: "Σκοτεινό θέμα",
  },
  en: {
    placeholderBanner: "Sample data: the parties and statements are invented for the demo, not taken from the minutes of Parliament.",
    liveBanner: "These entries come from the database. Check the primary sources before treating them as verified.",
    loading: "Loading positions...",
    loadError: "Connection error:",
    loadErrorFallback: "Could not load the data.",
    empty: "There are no positions in the database yet.",
    pickTopic: "Choose a topic",
    topicsNav: "Topics",
    partyFilters: "Party filters",
    allParties: "All",
    search: "Search statements",
    searchPlaceholder: "Search…",
    from: "From date",
    to: "To date",
    sort: "Sort",
    sortOriginal: "Original order",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    subcategory: "Subcategory",
    allSubcategories: "All subcategories",
    badRange: "The start date must be on or before the end date.",
    resetFilters: "Clear filters",
    noResults: "No statements match these filters.",
    showing: (n: number, total: number) => `Showing ${n} of ${total} statements`,
    source: "Source",
    noDate: "Not given",
    language: "Language",
    toLight: "Light theme",
    toDark: "Dark theme",
  },
};

export type Strings = (typeof STRINGS)["el"];

type Prefs = { lang: Lang; theme: Theme; t: Strings; setLang: (l: Lang) => void; toggleTheme: () => void };

const PrefsContext = createContext<Prefs | null>(null);

/* Runs in <head> before the page paints, so a reload never flashes the wrong theme. */
export const PREFS_BOOT = `try{var d=document.documentElement,t=localStorage.getItem('pm-theme'),l=localStorage.getItem('pm-lang');d.dataset.theme=t==='light'||t==='dark'?t:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');if(l==='en'||l==='el')d.lang=l;}catch(e){document.documentElement.dataset.theme='dark'}`;

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("el");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const d = document.documentElement;
    /* eslint-disable react-hooks/set-state-in-effect -- read back what the boot script chose */
    setTheme(d.dataset.theme === "light" ? "light" : "dark");
    setLangState(d.lang === "en" ? "en" : "el");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try { localStorage.setItem("pm-lang", l); } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((cur) => {
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("pm-theme", next); } catch {}
      return next;
    });
  }, []);

  return (
    <PrefsContext.Provider value={{ lang, theme, t: STRINGS[lang], setLang, toggleTheme }}>
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs(): Prefs {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside PrefsProvider");
  return ctx;
}
