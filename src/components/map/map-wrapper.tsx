'use client';

import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { MapProps } from '@interfaces';

export const MapWrapper = (props: MapProps) => {
    const Map = useMemo(
        () =>
            dynamic(() => import('./map'), {
                loading: () => <div style={{ height: props.mapHeight }}></div>,
                ssr: false,
            }),
        [],
    );

    return <Map {...props} />;
};
