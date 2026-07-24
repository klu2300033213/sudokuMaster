import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameSettings } from '../types';
import { soundManager } from '../utils/audio';

interface SettingsState extends GameSettings {
  toggleDarkMode: () => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  setSoundVolume: (vol: number) => void;
  toggleAnimations: () => void;
  toggleNotifications: () => void;
  toggleAutoPencilNotes: () => void;
  toggleShowPencilNotes: () => void;
  toggleHighlightSameNumbers: () => void;
  toggleHighlightPeers: () => void;
  toggleWarnOnMistakes: () => void;
  setMaxMistakesLimit: (limit: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      darkMode: true,
      soundEnabled: true,
      musicEnabled: false,
      soundVolume: 0.8,
      animationsEnabled: true,
      notificationsEnabled: true,
      autoPencilNotes: true,
      showPencilNotes: true,
      highlightSameNumbers: true,
      highlightPeers: true,
      warnOnMistakes: true,
      maxMistakesLimit: 3,

      toggleDarkMode: () => {
        const next = !get().darkMode;
        set({ darkMode: next });
        if (next) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
      },

      toggleSound: () => {
        const next = !get().soundEnabled;
        set({ soundEnabled: next });
        soundManager.setMuted(!next);
      },

      toggleMusic: () => set((s) => ({ musicEnabled: !s.musicEnabled })),
      setSoundVolume: (soundVolume) => set({ soundVolume }),
      toggleAnimations: () => set((s) => ({ animationsEnabled: !s.animationsEnabled })),
      toggleNotifications: () => set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
      toggleAutoPencilNotes: () => set((s) => ({ autoPencilNotes: !s.autoPencilNotes })),
      toggleShowPencilNotes: () => set((s) => ({ showPencilNotes: !s.showPencilNotes })),
      toggleHighlightSameNumbers: () => set((s) => ({ highlightSameNumbers: !s.highlightSameNumbers })),
      toggleHighlightPeers: () => set((s) => ({ highlightPeers: !s.highlightPeers })),
      toggleWarnOnMistakes: () => set((s) => ({ warnOnMistakes: !s.warnOnMistakes })),
      setMaxMistakesLimit: (maxMistakesLimit) => set({ maxMistakesLimit }),
    }),
    {
      name: 'sudoku-settings-storage',
    }
  )
);
