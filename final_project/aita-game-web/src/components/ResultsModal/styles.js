import styled from 'styled-components';

const StyledCopyWarning = styled('div')`
    width: fit-content;
    padding: 0.8rem 3.2rem;
    background-color: #2a2a33;
    border-radius: 5px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);

    display: flex;
    align-items: center;
    gap: 1.2rem;

    position: fixed;
    top: 2.4rem;
    left: 50%;
    transform: translateX(-50%);

    visibility: hidden;
    opacity: 0;

    transition: ease all 0.6s;

    z-index: 10000;

    .warning-text {
        margin: 0;

        font-size: 1.4rem;
        font-weight: bold;
        color: #fff;
    }

    .icon {
        font-size: 2.4rem;
        color: #51c257;
    }

    &.visible {
        visibility: visible;
        opacity: 1;
    }
`;

/* MODAL BODY - CONFIRMATION */
const StyledConfirmation = styled('div').attrs({ className: 'modal-body' })`
    .confirmation {
        margin-bottom: 1.6rem;

        font-size: 1.6rem;
        font-weight: bold;
    }

    .confirmation span {
        color: #ebba49;
    }

    .cancel-btn {
        margin-right: 2.4rem;
        background-color: #707070;
    }

    .cancel-btn:hover {
        background-color: #8a8a8a;
    }
`;

/* MODAL BODY - RESULTS */
const StyledResults = styled('div').attrs({ className: 'modal-body' })`
    .day {
        margin-bottom: 3.2rem;

        font-size: 3.6rem;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1.4px;
        color: #efefff;
    }

    .day span {
        color: #ebba49;
    }

    .results {
        margin-bottom: 2.4rem;
        
        font-size: 2.4rem;
        font-weight: bold;
        text-align: center;
        color: #fff;
    }

    .chart {
        width: 36rem;
        margin: 0 auto 4.8rem;

        font-size: 16px;
    }

    .error-warning {
        margin-bottom: 4.8rem;
        text-align: center;
    }

    .error-warning.secundary-title {
        margin-bottom: 0.6rem;
        
        font-size: 2.4rem;
        font-weight: bold;
        text-transform: uppercase;
        color: #efefff;
    }

    .footer {
        padding: 1.2rem 2.4rem;
        background-color: #343443;
        border-radius: 9px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .vote-label {
        margin: 0;

        font-size: 2rem;
        font-weight: bold;
        color: #efefff;
    }

    .vote-label .yes-vote {
        color: #51c257;
    }

    .vote-label .mi-vote {
        color: #ebba49;
    }

    .vote-label .no-vote {
        color: #f23a4d;
    }

    .btn-share {
        min-width: 20rem;
    
        padding: 1.2rem 4.8rem;
        background-color: #ebba49;
        border: 0;
        border-radius: 50px;

        font-size: 1.6rem;
        font-weight: bold;
        line-height: 1.4;
        letter-spacing: 0.4px;
        color: #fff;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.2rem;
    }

    .btn-share svg {
        font-size: 2rem;
    }
`;

const StyledChartLegend = styled('div')`
    width: fit-content;
    margin: 0 auto 0.8rem;
    display: flex;
    align-items: center;
    gap: 2.4rem;

    .legend {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }

    .legend-box {
        width: 3.6rem;
        height: 1.6rem;
        background-color: #ebba49;
        border: solid 2px #25252b;
    }

    .legend-label {
        font-size: 1.4rem;
        line-height: 1;
        color: #efefff;
    }

    .legend--yes {
        background-color: #51c257;
    }

    .legend--mi {
        background-color: #ebba49;
    }

    .legend--no {
        background-color: #f23a4d;
    }
`

export {
    StyledCopyWarning,
    StyledConfirmation,
    StyledResults,
    StyledChartLegend
}