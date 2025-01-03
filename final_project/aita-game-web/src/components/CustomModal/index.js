import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import i18n from './../../i18n';
import { Modal } from 'react-bootstrap';
import Button from '../Button/index'
import { useTranslation } from 'react-i18next';
import LanguageSelect from './../../store/languages';
import './styles.css';
import { StyledHelp, StyledSettings } from './styles.js';

function CustomModal(props) {
    const { t } = useTranslation();

    const [language, setLanguage] = useState(localStorage.getItem('Language') || i18n.fallbackLng);

    const handleSettings = () => {
        const language = document.querySelector('#languages').value;
        localStorage.setItem('Language', language);

        setLanguage(language);
        props.setStoryLanguage(language);
        props.handleShow();
    }

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    return (
        <Modal show={props.show} onHide={props.handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            {props.type === 'help' ?
                (
                    <StyledHelp>
                        <div className="features-grid">
                            <div className="numbers">1</div>
                            <div className="numbers">2</div>
                            <div className="numbers">3</div>
                            <div className="features-card">
                                <p className="feature-title">{t('helpLabelOne')}</p>
                                <p className="feature-text">{t('helpTextOne')} <strong>{t('helpTextOneStrong')}</strong>.</p>
                            </div>
                            <div className="features-card">
                                <p className="feature-title">{t('helpLabelTwo')}</p>
                                <p className="feature-text">{t('helpTextTwo')} <strong>{t('helpTextTwoStrong')}</strong>!</p>
                            </div>
                            <div className="features-card">
                                <p className="feature-title">{t('helpLabelThree')}</p>
                                <p className="feature-text">{t('helpTextThree')} <strong>{t('helpTextThreeStrong')}</strong>!</p>
                            </div>
                        </div>
                    </StyledHelp>
                )
                : props.type === 'settings' ?
                    (
                        <StyledSettings>
                            <div className="settings">
                                <LanguageSelect setLanguage={setLanguage} />
                            </div>
                        </StyledSettings>
                    )
                    : (
                        <Modal.Body>
                            ERROR
                        </Modal.Body>
                    )
            }
            <Modal.Footer>
                {
                    props.type === 'help' ?
                        (<Button text={props.buttonText} onClick={props.handleShow} />)
                        : props.type === 'settings' ?
                            (<Button text={props.buttonText} onClick={handleSettings} />)
                            : ''
                }
            </Modal.Footer>
        </Modal >
    );
}

CustomModal.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    handleShow: PropTypes.func.isRequired,
    setStoryLanguage: PropTypes.func
}

export default CustomModal;