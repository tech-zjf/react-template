import { create } from 'zustand';

export interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export interface GlobalState {
    deferredPrompt: BeforeInstallPromptEvent | null;
    setDeferredPrompt: (event: BeforeInstallPromptEvent | null) => void;
}

const useGlobalStore = create<GlobalState>(set => ({
    deferredPrompt: null,

    setDeferredPrompt: event => set({ deferredPrompt: event }),
}));

export default useGlobalStore;
