import React, { useState, useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelect() {
    const { t } = useTranslation();

    const [languageKey, setLanguageKey] = useState('en');
    const [optionsList, setOptionsList] = useState([]);

    const languagesList = {
        en: 'English',
        ptbr: 'Português (PTBR)'
    }

    const handleLanguageKey = (event) => {
        setLanguageKey(event.target.value);
    }

    useEffect(() => {
        const getLocalStorageLanguage = () => {
            const localStorageLanguage = localStorage.getItem('Language') || 'en';

            setLanguageKey(localStorageLanguage);
        }

        const orderLanguagesList = () => {
            const langsArray = Array.from(Object.entries(languagesList));

            langsArray.sort((a, b) => a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0);

            const sortedLanguagesMap = new Map(langsArray);

            const optList = [];

            sortedLanguagesMap.forEach((value, key) => optList.push(<option value={key} key={key}>{value}</option>));

            setOptionsList(optList);
        }

        getLocalStorageLanguage();
        orderLanguagesList();
    }, []);

    return (
        <Fragment>
            <label htmlFor="languages" className="setting-label">{t('settingsLanguagesLabel')}</label>
            <select name="languages" id="languages" className="languages-select" value={languageKey} onChange={handleLanguageKey}>
                {optionsList}
            </select>
        </Fragment>
    );
}

export default LanguageSelect;