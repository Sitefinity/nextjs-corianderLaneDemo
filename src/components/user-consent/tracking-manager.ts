declare global {
    interface Window {
        TrackingConsentManager: TrackingConsentManager;
    }
}

let trackingManger: TrackingConsentManager | null;

export const getTrackingConsentManager = (): TrackingConsentManager | null => {
    if (trackingManger) {
        return trackingManger;
    }

    if (window.TrackingConsentManager) {
        trackingManger = window.TrackingConsentManager;
    }

    return trackingManger;
};

interface TrackingConsentManager {
    updateUserConsent: (consent: boolean) => void;
    askForUserConsent: () => void;
    addEventListener: (eventName: string, eventHandler: Function) => void;
    removeEventListener: (eventName: string, eventHandler: Function) => void;
}
