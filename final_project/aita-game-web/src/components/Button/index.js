import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

function Button(props) {
    return (
        <StyledButton className={props.className ? props.className : ''} onClick={props.onClick}>
            {(props.className && props.className.includes('vote-disabled')) ? <FontAwesomeIcon icon={faLock} className="icon" /> : ''}
            {props.text}
        </StyledButton>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default Button;