import React, { Fragment, useState, useEffect } from 'react';
import i18n from './i18n';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { StyledHeader, StyledMain, StyledController, StyledSection, StyledFooter } from './styles.js';
import CustomModal from './components/CustomModal/index'
import ResultsModal from './components/ResultsModal/index'
import Button from './components/Button/index';
import Spinner from './components/Spinner/index';
import { GET_STORY_BY_DAY, GET_CURRENT_DAY } from './store/api-urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const loadTranslations = async () => {
    await i18n.init({
        lng: localStorage.getItem('Language'),
        resources: {
            en: {
                translation: await import('./store/locales/en.json')
            },
            ptbr: {
                translation: await import('./store/locales/pt-br.json')
            }
        }
    });
}

function App() {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);

    const [showHelp, setShowHelp] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const [day, setDay] = useState(0);
    const [story, setStory] = useState({});
    const [storyTitle, setStoryTitle] = useState('');
    const [storyText, setStoryText] = useState('');

    const [language, setLanguage] = useState(localStorage.getItem('Language') || i18n.language);

    const [isVoted, setIsVoted] = useState(localStorage.getItem('Vote') ? true : false);

    const [vote, setVote] = useState(localStorage.getItem('Vote') || '');

    useEffect(() => {
        const loadStory = async () => {
            try {
                const responseDay = await axios.get(GET_CURRENT_DAY);
                const currentDay = Number(responseDay.data.day);
								
								setDay(currentDay);

								const storagedDay = Number(localStorage.getItem('CurrentDay'));

								if (storagedDay && (currentDay !== storagedDay)) {
									localStorage.setItem('Vote', '');
									setVote('');
									setIsVoted(false);
								}

								localStorage.setItem('CurrentDay', currentDay);

                const responseStory = await axios.get(GET_STORY_BY_DAY);
                const story = responseStory.data;

                setStory(story);

                switch (language) {
                    case 'en':
                        setStoryTitle(story.titleEn);
                        setStoryText(DOMPurify.sanitize(story.textEn));
                        break;
                    case 'ptbr':
                        setStoryTitle(story.titlePtbr);
                        setStoryText(DOMPurify.sanitize(story.textPtbr));
												break;
										default:
											break;
                }

                setLoading(false);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }

        loadStory();
        loadTranslations();
    }, [language]);

    useEffect(() => {
        if (loading) {
            document.body.classList.add('no-scroll');
            document.querySelector('.spinner').classList.add('loading');
        } else {
            document.body.classList.remove('no-scroll');
            document.querySelector('.spinner').classList.remove('loading');
        }
    })

    const handleIsVoted = () => {
        setIsVoted(true);
    }

    const handleShowHelp = () => {
        setShowHelp(!showHelp);
    }

    const handleShowSettings = () => {
        setShowSettings(!showSettings);
    }

    const handleShowResults = (show, vote) => {
        if (!isVoted) if (vote) setVote(vote);
        setShowResults(show);
    }

    return (
        <Fragment>
            <Spinner />
            <StyledHeader className="header">
                <p className="header-description">{t('descriptionPartOne')} <span>{t('descriptionPartTwo')}</span> {t('descriptionPartThree')} <a href="https://www.reddit.com/r/AmItheAsshole/" target="_blank" rel="noreferrer" >{t('descriptionPartFour')}</a></p>
                <div className="options">
                    <ul className="options-list">
                        <li className="icon" onClick={handleShowHelp}>
                            <FontAwesomeIcon icon={faCircleQuestion} />
                        </li>
                        <li className="icon" onClick={handleShowSettings}>
                            <FontAwesomeIcon icon={faGear} />
                        </li>
                    </ul>
                </div>
            </StyledHeader>
            <CustomModal title={t('helpModalTitle')} type="help" buttonText={t('helpButtonText')} show={showHelp} handleShow={handleShowHelp} />
            <CustomModal title={t('settingsModalTitle')} type="settings" buttonText={t('settingsButtonText')} show={showSettings} handleShow={handleShowSettings} setStoryLanguage={setLanguage} />
            <StyledMain className="main">
                <h2 className="secundary-title logo">{t('title')} <span className="title-span">{t('titleSpan')}</span></h2>
                <StyledSection className="story-container">
                    <div className="text-container">
                        <h1 className="primary-title">
                            {
                                storyTitle ? storyTitle :
                                    <div>
                                        <h1 className="primary-title error-warning">{t('errorWarningTitle')}</h1>
                                        <p className="error-warning">{t('errorWarningText')}</p>
                                    </div>
                            }
                        </h1>
                        <div dangerouslySetInnerHTML={{ __html: storyText }} />
                    </div>
                </StyledSection>
                <StyledController className="controller">
                    <div className="strip-container">
                        <div className="strip">
                            <h2 className="secondary-title secondary-title--controller">{!isVoted ? t('secondaryTitle') : t('secondaryTitleVoted')}</h2>
                        </div>
                    </div>
                    <Button text={t('yesVoteText')} className={isVoted ? vote === 'Yes' ? 'btn--yes' : 'btn--yes vote-disabled' : 'btn--yes'} onClick={() => handleShowResults(true, 'Yes')} />
                    <Button text={t('missingInformationVoteText')} className={isVoted ? vote === 'Missing Information' ? 'btn--missing' : 'btn--missing vote-disabled' : 'btn--missing'} onClick={() => handleShowResults(true, 'Missing Information')} />
                    <Button text={t('noVoteText')} className={isVoted ? vote === 'No' ? 'btn--no' : 'btn--no vote-disabled' : 'btn--no'} onClick={() => handleShowResults(true, 'No')} />
                </StyledController>
            </StyledMain>
            <ResultsModal show={showResults} handleShow={handleShowResults} handleIsVoted={handleIsVoted} vote={vote} isVoted={isVoted} day={day} story={story} />
            <StyledFooter className="footer">
                <div className="footer-content">
                    <div className="pages">
                        <p className="footer-label">{t('footerPagesLabel')}</p>
                        <ul className="footer-list footer-list--pages">
                            <li>
                                <a href="https://www.reddit.com/r/AmItheAsshole/" target="_blank" rel="noreferrer">{t('footerPagesSubreddit')}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="social-medias">
                        <p className="footer-label">{t('footerMediasLabel')}</p>
                        <ul className="footer-list footer-list--medias">
                            <li>
                                <a href="https://github.com/LuizGandra" target="_blank" className="icon" rel="noreferrer">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </li>
                            <li>
                                <a href="https://medium.com/@luiz.gandra" target="_blank" className="icon" rel="noreferrer">
                                    <FontAwesomeIcon icon={faMedium} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="creator-info">
                    {t('creatorInfo')}
                </div>
            </StyledFooter>
        </Fragment >
    );
}

export default App;