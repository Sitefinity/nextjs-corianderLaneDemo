import React from 'react';

export const CarouselIndicator = ({
    index,
    target,
    ariaLabel,
}: {
    index: number;
    target: string;
    ariaLabel: string;
}) => (
    <button
        data-bs-target={`#${target}`}
        data-bs-slide-to={index}
        {...(index === 0 ? { className: 'active' } : {})}
        aria-label={ariaLabel}
    />
);

export const CarouselNavigation = ({
    target,
    prevLabel,
    nextLabel,
}: {
    target: string;
    prevLabel: string;
    nextLabel: string;
}) => (
    <>
        <button className='carousel-control-prev' data-bs-target={`#${target}`} role='button' data-bs-slide='prev'>
            <span className='carousel-control-prev-icon' aria-hidden='true'></span>
            <span className='sr-only'>{prevLabel}</span>
        </button>
        <button className='carousel-control-next' data-bs-target={`#${target}`} role='button' data-bs-slide='next'>
            <span className='carousel-control-next-icon' aria-hidden='true'></span>
            <span className='sr-only'>{nextLabel}</span>
        </button>
    </>
);
