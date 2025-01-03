import React from 'react';
import { StyledSpinnerOverlay, StyledSpinner } from './styles.js';

function Spinner() {
    return (
        <StyledSpinnerOverlay className="spinner loading">
            <StyledSpinner />
        </StyledSpinnerOverlay>
    );
}

export default Spinner;