import React, { useState, useEffect, Fragment } from 'react';
import i18n from './../../i18n';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import './styles.css';
import { StyledResults, StyledConfirmation, StyledChartLegend, StyledCopyWarning } from './styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/index'
import { UPDATE_STORY_VOTES, GET_CURRENT_VOTE_COUNT } from './../../store/api-urls';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function ResultsModal(props) {
    const { t } = useTranslation();

    const [showResultsBeforeConfirmation, setShowResultsBeforeConfirmation] = useState(false);

    const [voteCount, setVoteCount] = useState([0, 0, 0]);
    const [refreshVoteCount, setRefreshVoteCount] = useState(false);

    const [showCopyWarning, setShowCopyWarning] = useState(false);

    const handleShowResults = () => {
        if (!props.isVoted) {
            setShowResultsBeforeConfirmation(true);
            props.handleIsVoted();

            countVote();

            localStorage.setItem('Vote', props.vote);
        } else {
            setRefreshVoteCount(true);
            props.handleShow(!props.show);
        }
    }

    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(ChartDataLabels);

    useEffect(() => {
        try {
            const getVoteCount = async () => {
                const response = await axios.get(GET_CURRENT_VOTE_COUNT);

                const voteYes = Number(response.data['vote-yes']);
                const voteMi = Number(response.data['vote-mi']);
                const voteNo = Number(response.data['vote-no']);

                const countArray = [voteYes, voteMi, voteNo];

                setVoteCount(countArray);
                setRefreshVoteCount(true);
            }

            if (!refreshVoteCount) {
                getVoteCount();
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }, [refreshVoteCount]);

    const getVoteClass = () => {
        switch (props.vote) {
            case 'Yes':
                return 'yes-vote';
            case 'Missing Information':
                return 'mi-vote';
            case 'No':
                return 'no-vote';
						default:
								break;
        }
    }

    const getVote = () => {
        const language = localStorage.getItem('Language') || i18n.language;

        if (language === 'en') {
            switch (props.vote) {
                case 'Yes':
                    return 'Yes!';
                case 'Missing Information':
                    return 'Missing Information';
                case 'No':
                    return 'No!';
								default:
									break;
            }
        } else if (language === 'ptbr') {
            switch (props.vote) {
                case 'Yes':
                    return 'Sim!';
                case 'Missing Information':
                    return 'Falta Informação';
                case 'No':
                    return 'Não!';
								default:
										break;
            }
        }
    }

    const countVote = async () => {
        try {
            switch (props.vote) {
                case 'Yes':
                    voteCount[0]++;
                    break;
                case 'Missing Information':
                    voteCount[1]++;
                    break;
                case 'No':
                    voteCount[2]++;
                    break;
								default:
										break;
            }

            await axios.put(UPDATE_STORY_VOTES, { vote: props.vote });
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    const getShareText = async () => {
        let text = t('shareText');
        // I played \"Am I The Asshole?\" (day PLACEHOLDER) and voted \"PLACEHOLDER\" for the story \"PLACEHOLDER\"

        const language = localStorage.getItem('Language') || i18n.language;
        let storyTitle = '';
        let vote = '';
        let count = 0;

        if (language === 'en') {
            storyTitle = props.story.titleEn;

            switch (props.vote) {
                case 'Yes':
                    vote = 'Yes!';
                    break;
                case 'Missing Information':
                    vote = 'Missing Information';
                    break;
                case 'No':
                    vote = 'No!';
										break;
								default:
										vote = '';
            }
        } else if (language === 'ptbr') {
            storyTitle = props.story.titlePtbr;

            switch (props.vote) {
                case 'Yes':
                    vote = 'Sim!';
                    break;
                case 'Missing Information':
                    vote = 'Falta Informação';
                    break;
                case 'No':
                    vote = 'Não!';
										break;
								default:
										vote = '';
            }
        }

        text = text.replace(/PLACEHOLDER/g, function () {
            if (count === 0) {
                count++;
                return props.day;
            } else if (count === 1) {
                count++;
                return vote;
            } else {
                return storyTitle;
            }
        });

        await navigator.clipboard.writeText(text);

        handleShowCopyWarning();
    }

    const handleShowCopyWarning = () => {
        setShowCopyWarning(true);

        setTimeout(() => {
            setShowCopyWarning(false);
        }, 2000);
    }

    const chartData = {
        labels: [],
        datasets: [
            {
                label: "Results",
                data: voteCount,
                backgroundColor: ["#51c257", "#ebba49", "#f23a4d"],
                borderColor: ["#2a2a33", "#2a2a33", "#2a2a33"],
                hoverBackgroundColor: ["#63d66e", "#f0c865", "#fa5266"],
                borderWidth: 4,
            },
        ]
    }

    const options = {
        aspectRatio: 1.1,
        layout: {
            padding: {
                top: 40,
                bottom: 40,
            },
        },
        plugins: {
            datalabels: {
                anchor: "end",
                align: "end",
                offset: 10,
                padding: 5,
                color: "#fff",
                font: {
                    size: 14,
                    weight: "bold"
                },
                formatter: (value, context) => {
                    const dataValue = chartData.datasets[0].data[context.dataIndex];

										if (dataValue === 0) {
											return '';
									}

                    const percentage = ((dataValue / chartData.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);

                    return `${percentage}%`;
                },
            }
        }
    };

    const loadChart = () => {
        if (voteCount[0] === 0 && voteCount[1] === 0 && voteCount[2] === 0) {
            return (
                <div>
                    <p className="secundary-title error-warning">{t('errorWarningTitle')}</p>
                    <p className="error-warning">{t('errorWarningText')}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <p className="results">{t('resultsLabel')}</p>
                    <StyledChartLegend>
                        <div className="legend">
                            <div className="legend-box legend--yes"></div>
                            <div className="legend-label">{t('yesVoteText')}</div>
                        </div>
                        <div className="legend">
                            <div className="legend-box legend--mi"></div>
                            <div className="legend-label">{t('missingInformationVoteText')}</div>
                        </div>
                        <div className="legend">
                            <div className="legend-box legend--no"></div>
                            <div className="legend-label">{t('noVoteText')}</div>
                        </div>
                    </StyledChartLegend>
                    <Pie data={chartData} className="chart" options={options} />
                </div>
            );
        }
    }

    return (
        <Fragment>
            <StyledCopyWarning className={showCopyWarning ? 'copy-warning visible' : 'copy-warning'}>
                <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                <p className="warning-text">{t('copyWarning')}</p>
            </StyledCopyWarning>
            <Modal show={!props.isVoted ? props.show : false} onHide={() => props.handleShow(false)} className="confirmation-modal">
                <StyledConfirmation>
                    <p className="confirmation">{t('confirmationText')} <span>{t('confirmationTextSpan')}</span>.</p>
                    <Button text={t('cancelBtn')} className="cancel-btn" onClick={() => props.handleShow(false)} />
                    <Button text={t('confirmBtn')} onClick={handleShowResults} />
                </StyledConfirmation>
            </Modal>
            <Modal show={!props.isVoted ? showResultsBeforeConfirmation : props.show} onHide={handleShowResults} className="results-modal">
                <StyledResults>
                    <p className="day">{t('dayLabel')} <span>{props.day}</span></p>
                    {loadChart()}
                    <div className="footer">
                        <p className="vote-label">{t('voteLabel')} "<span className={getVoteClass()}>{getVote()}</span>"</p>
                        <button type="text" onClick={getShareText} className="btn-share">
                            <FontAwesomeIcon icon={faShareNodes} />
                            <span>{t('shareTextButton')}</span>
                        </button>
                    </div>
                </StyledResults>
            </Modal>
        </Fragment>
    );
}

ResultsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleShow: PropTypes.func.isRequired,
    handleIsVoted: PropTypes.func.isRequired,
    vote: PropTypes.string,
    isVoted: PropTypes.bool.isRequired,
    day: PropTypes.number.isRequired,
    story: PropTypes.object.isRequired
}

export default ResultsModal;