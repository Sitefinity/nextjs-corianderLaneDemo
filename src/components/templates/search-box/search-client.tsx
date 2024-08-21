'use client';

import React from 'react';
import { classNames, getCustomAttributes } from '@progress/sitefinity-nextjs-sdk';
import {
    SearchBoxEntity,
    SearchBoxViewProps,
    getSearchBoxParams,
    getSearchUrl,
} from '@progress/sitefinity-nextjs-sdk/widgets';
import { useRef, useState, FocusEvent, MouseEvent, KeyboardEvent } from 'react';
import { useClickBoundaryDetector } from '@utils';

const dataSfItemAttribute = 'data-sfitem';
const activeAttribute = 'data-sf-active';

export const SearchClient = (props: SearchBoxViewProps<SearchBoxEntity>) => {
    const {
        widgetContext,
        isEdit,
        activeClass,
        attributes,
        visibilityClassHidden,
        suggestionsTriggerCharCount,
        searchButtonLabel,
        searchQuery,
        searchBoxPlaceholder,
    } = props;

    const [searchItems, setSearchItems] = useState<string[]>([]);
    const [dropDownWidth, setDropDownWidth] = useState<number | undefined>(undefined);
    const [dropDownShow, setDropDownShow] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const searchInputWrapperRef = useClickBoundaryDetector<HTMLDivElement>({
        outsideClickHandler: () => setShowSearchInput(false),
    });
    const dropdownRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const searchBoxCustomAttributes = getCustomAttributes(widgetContext.model.Properties.Attributes, 'SearchBox');
    const disabled = isEdit;

    const handleOnSearch = (suggestions: string[]) => {
        const items = Array.isArray(suggestions) ? suggestions : [];

        setSearchItems(items);
    };

    const handleShowDropdown = () => {
        const inputWidth = inputRef.current!.clientWidth;
        setDropDownWidth(inputWidth);
        setDropDownShow(true);
    };

    const handleHideDropdown = (clear: boolean = true) => {
        if (clear) {
            handleOnSearch([]);
        }
        setDropDownWidth(undefined);
        setDropDownShow(false);
    };

    const getSuggestions = (input: HTMLInputElement) => {
        let data = getSearchBoxParams(props);
        let requestUrl =
            data.servicePath +
            '/Default.GetSuggestions()' +
            '?indexName=' +
            data.catalogue +
            '&sf_culture=' +
            data.culture +
            '&siteId=' +
            data.siteId +
            '&scoringInfo=' +
            data.scoringSetting +
            '&suggestionFields=' +
            data.suggestionFields +
            '&searchQuery=' +
            input.value;
        if (data.resultsForAllSites === 1) {
            requestUrl += '&resultsForAllSites=True';
        } else if (data.resultsForAllSites === 2) {
            requestUrl += '&resultsForAllSites=False';
        }

        fetch(requestUrl)
            .then(function (res) {
                res.json().then((suggestions: { value: string[] }) => {
                    handleOnSearch(suggestions.value);
                    setSuggestions(suggestions.value);
                    handleShowDropdown();
                });
            })
            .catch(function () {
                handleHideDropdown();
            });
    };

    const navigateToResults = () => {
        const input = inputRef.current!;
        if ((window as any).DataIntelligenceSubmitScript) {
            (window as any).DataIntelligenceSubmitScript._client.sentenceClient.writeSentence({
                predicate: 'Search for',
                object: input.value.trim(),
                objectMetadata: [
                    {
                        K: 'PageUrl',
                        V: location.href,
                    },
                ],
            });
        }

        const url = getSearchUrl(input.value.trim(), props);
        (window as Window).location = url;
    };

    const inputKeyupHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code !== 'ArrowUp' && e.code !== 'ArrowDown' && e.code !== 'Escape') {
            let searchText = (e.target as HTMLInputElement).value.trim();
            let config = getSearchBoxParams(props);

            if (config.minSuggestionLength && searchText.length >= config.minSuggestionLength) {
                getSuggestions(e.target as HTMLInputElement);
            } else {
                handleHideDropdown();
            }
        }

        if (e.code === 'ArrowDown' && suggestions.length) {
            handleShowDropdown();
            firstItemFocus();
        }

        if (e.code === 'Escape') {
            handleHideDropdown();
        }
    };

    const inputKeydownHandler = (e: KeyboardEvent) => {
        const keyCode = e.keyCode || e.charCode;

        if (keyCode === 13) {
            navigateToResults();
        }
    };

    const handleDropDownClick = (e: MouseEvent<HTMLUListElement>) => {
        let target = e.target as any;
        let content = target.innerText;
        inputRef.current!.value = content;
        navigateToResults();
        handleHideDropdown();
    };

    const handleDropDownBlur = (e: FocusEvent<Element>) => {
        if (dropdownRef.current != null && !dropdownRef.current.contains(e.relatedTarget as Node | null)) {
            handleHideDropdown(false);
        }
    };

    const handleDropDownKeyUp = (e: React.KeyboardEvent) => {
        const dropdown = dropdownRef.current;

        let key = e.keyCode || e.charCode;
        let activeLinkSelector = `[${dataSfItemAttribute}][${activeAttribute}]`;

        let activeLink = dropdown!.querySelector(activeLinkSelector);
        if (!activeLink) {
            return;
        }

        let previousParent = activeLink.parentElement!.previousElementSibling;
        let nextParent = activeLink.parentElement!.nextElementSibling;
        if (key === 38 && previousParent) {
            e.preventDefault();
            focusItem(previousParent);
        } else if (key === 40 && nextParent) {
            e.preventDefault();
            focusItem(nextParent);
        } else if (key === 13) {
            inputRef.current!.value = (activeLink as HTMLElement).innerText;
            navigateToResults();
            handleHideDropdown();
            inputRef.current!.focus();
        } else if (key === 27) {
            resetActiveClass();
            handleHideDropdown(false);
            inputRef.current!.focus();
        }
    };

    const firstItemFocus = () => {
        const dropdown = dropdownRef.current;
        if (dropdown && dropdown.children.length) {
            const item = dropdown!.children[0].querySelector(`[${dataSfItemAttribute}]`);
            focusItem(item?.parentElement);
        }
    };

    const focusItem = (item: any) => {
        resetActiveClass();

        let link = item.querySelector(`[${dataSfItemAttribute}]`);

        if (link && activeClass) {
            link.classList.add(...activeClass);
        }

        //set data attribute, to be used in queries instead of class
        link.setAttribute(activeAttribute, '');

        link.focus();
    };

    const resetActiveClass = () => {
        const dropdown = dropdownRef.current;
        let activeLink = dropdown!.querySelector(`[${activeAttribute}]`);

        if (activeLink && activeClass) {
            activeLink.classList.remove(...activeClass);
            activeLink.removeAttribute(activeAttribute);
        }
    };

    const onToggleSearchInput = () => {
        setShowSearchInput((prev) => !prev);
    };

    return (
        <div {...{ ...attributes, className: '' }}>
            <button
                className='btn btn-link btn-sm -search-icon fs-5 text-decoration-none cl-txt-main-nav-color'
                ref={searchButtonRef}
                onClick={onToggleSearchInput}
                id='headerSearchToggler'
                aria-haspopup='true'
                aria-expanded='false'
                aria-label='Search Button'
            />

            <div
                ref={searchInputWrapperRef}
                className={`cl-header-search dropdown-menu form-inline ${showSearchInput ? 'show' : ''}`}
                aria-labelledby='headerSearchToggler'
                style={{ position: 'absolute', inset: '0px auto auto 0px', marginTop: '35px' }}
            >
                <div className='form-group cl-search-input-wrapper d-flex justify-content-center align-items-center pr-0 position-relative'>
                    <input
                        className='form-control'
                        data-sf-role='search-box'
                        disabled={disabled}
                        placeholder={searchBoxPlaceholder || undefined}
                        defaultValue={searchQuery}
                        onKeyUp={inputKeyupHandler}
                        onKeyDown={inputKeydownHandler}
                        onBlur={handleDropDownBlur}
                        {...searchBoxCustomAttributes}
                        ref={inputRef}
                    />
                    <button
                        data-sf-role='search-button'
                        className='btn btn-secondary ms-2 flex-shrink-0'
                        onClick={navigateToResults}
                    >
                        {searchButtonLabel}
                    </button>
                    {suggestionsTriggerCharCount != null &&
                        suggestionsTriggerCharCount >= 2 &&
                        searchItems.length > 0 && (
                            <ul
                                role='listbox'
                                onClick={handleDropDownClick}
                                onKeyUp={handleDropDownKeyUp}
                                onBlur={handleDropDownBlur}
                                style={{ width: dropDownWidth }}
                                ref={dropdownRef}
                                className={classNames(
                                    'border bg-body list-unstyled position-absolute cl-header-search__autocomplete',
                                    { [visibilityClassHidden]: !dropDownShow },
                                )}
                            >
                                {searchItems.map((item: string, idx: number) => {
                                    return (
                                        item && (
                                            <li key={idx} role={'option'} aria-selected={false}>
                                                <button
                                                    role='presentation'
                                                    className='dropdown-item text-truncate'
                                                    data-sfitem=''
                                                    title={item}
                                                    tabIndex={-1}
                                                >
                                                    {item}
                                                </button>
                                            </li>
                                        )
                                    );
                                })}
                            </ul>
                        )}
                </div>
            </div>
        </div>
    );
};
