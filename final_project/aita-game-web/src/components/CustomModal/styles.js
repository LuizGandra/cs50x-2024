import styled from 'styled-components';

/* MODAL BODY - HELP */
const StyledHelp = styled('div').attrs({ className: 'modal-body' })`
    .features-grid {
        text-align: center;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        gap: 1.6rem 2.4rem;
    }

    .numbers {
        width: 3.2rem;
        height: 3.2rem;
        background-color: #ebba49;
        border-radius: 50%;

        font-size: 1.8rem;
        font-weight: bold;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .features-card {
        width: 24rem;
        padding: 1.2rem 2.4rem;
        background-color: #414354;
        border-radius: 9px;
    }

    .feature-title {
        font-weight: bold;
    }

    .features-card strong {
        color: #ebba49;
    }
`;

/* MODAL BODY - SETTINGS */
const StyledSettings = styled('div').attrs({ className: 'modal-body' })`
    .setting-label {
        margin-bottom: 1rem;

        font-weight: bold;
        color: #efefff;

        display: block;
    }

    .languages-select {
        width: 48rem;
        background-color: #414354;
        padding: 0.8rem 1.6rem;
        border: none;
        border-right: 1.6rem solid transparent;
        border-radius: 5px;

        color: #fff;
    }
`;

/* MODAL BODY - RESULTS */
const StyledResults = styled('div').attrs({ className: 'modal-body' })`
    .setting-label {
        margin-bottom: 1rem;

        font-weight: bold;
        color: #efefff;

        display: block;
    }

    .languages-select {
        width: 48rem;
        background-color: #414354;
        padding: 0.8rem 1.6rem;
        border: none;
        border-right: 1.6rem solid transparent;
        border-radius: 5px;

        color: #fff;
    }
`;

export {
    StyledHelp,
    StyledSettings,
    StyledResults
}