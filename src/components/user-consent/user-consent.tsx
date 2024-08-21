'use client';

import React, { useEffect, useState } from 'react';
import { getTrackingConsentManager } from './tracking-manager';

export const UserConsent = () => {
    const [shouldAsk, setShouldAsk] = useState(false);

    useEffect(() => {
        configureTrackingConsentManagerBindings();
        setShouldAsk(!hasTrackingCookie());
    }, []);

    const clickHandler = (isAccepted: boolean): void => {
        const trackingManager = getTrackingConsentManager();
        if (!trackingManager) {
            return;
        }

        trackingManager.updateUserConsent(isAccepted);
        setShouldAsk(false);
    };

    return (
        <>
            {/** The tracking manager requires a div with id sf-tracking-consent-manager. And creates a new div with the inner html of that div */}
            <div id='sf-tracking-consent-manager' style={{ display: 'none' }}></div>
            {shouldAsk && (
                <div id='tracking-consent'>
                    <strong>We would like to track you</strong>
                    <p>
                        At Coriander Lane we value your privacy and wanted to let you know that we find it valuable for
                        us and you if we can track your usage, so eyeball some food and let's eat.
                    </p>
                    <button
                        type='button'
                        onClick={() => clickHandler(true)}
                        id='tracking-consent-dialog-accept'
                        className='btn btn-primary me-4'
                    >
                        I Accept
                    </button>
                    <button
                        type='button'
                        onClick={() => clickHandler(false)}
                        id='tracking-consent-dialog-reject'
                        className='btn btn-secondary'
                    >
                        I Refuse
                    </button>
                </div>
            )}
        </>
    );
};

const hasTrackingCookie = (): boolean => document.cookie.includes('sf-tracking-consent');
const onConsentChanged = (consent: boolean) => {
    if (consent) {
        window.location.reload();
    }
};

const onBeforeDialogClosed = () => {
    configureTrackingConsentManagerBindings(false);
};

const configureTrackingConsentManagerBindings = (addBindings: boolean = true) => {
    const trackingManager = getTrackingConsentManager();
    if (!trackingManager) {
        return;
    }

    const action = addBindings ? 'addEventListener' : 'removeEventListener';

    trackingManager[action]('ConsentChanged', onConsentChanged);
    trackingManager[action]('BeforeDialogClosed', onBeforeDialogClosed);
};
