import styled from 'styled-components';

const StyledSpinnerOverlay = styled('div')`
    width: 100%;
    height: 100%;
    background: linear-gradient(to top right, #292b34, #343443);

    display: none;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 1000;

    &.loading {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const StyledSpinner = styled('div')`
    width: 40px;
    height: 40px;
    border: 4px solid #2a2a33;
    border-top: 4px solid #ebba49;

    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export {
    StyledSpinnerOverlay,
    StyledSpinner
}