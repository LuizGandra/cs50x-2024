import styled from 'styled-components';

const StyledButton = styled.button`
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

    transition: ease all 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #f0c865;
    }

    &.btn--yes {
        background-color: #51c257;
        box-shadow: 0 6px 0 rgb(54, 117, 49);

        transform: rotate(3deg);

        &:hover {
            background-color: #63d66e;
        }

        &:active {
            background-color: #4cb04a;
            box-shadow: 0 3px 0 rgb(54, 117, 49);

            transform: translateY(3%) rotate(-3deg);
        }
    }

    &.btn--missing {
        transform: translateY(30%);
        box-shadow: 0 6px 0 rgb(168, 121, 56);

        &:active {
            background-color: #db9e42;
            box-shadow: 0 3px 0 rgb(168, 121, 56);

            transform: rotate(3deg);
        }
    }

    &.btn--no {
        background-color: #f23a4d;
        box-shadow: 0 6px 0 rgb(140, 52, 43);

        transform: rotate(-3deg);

        &:hover {
            background-color: #fa5266;
        }

        &:active {
            background-color: #db323e;
            box-shadow: 0 3px 0 rgb(140, 52, 43);

            transform: translateY(3%)  rotate(-3deg);
        }
    }

    &.vote-disabled {
        background-color: #343443;
        box-shadow: 0 6px 0 rgb(37, 37, 43);

        &:hover {
            background-color: #404352;
        }

        &:active {
            background-color: #2a2a33;
            box-shadow: 0 3px 0 rgb(37, 37, 43);
        }
    }

    .icon {
        margin-right: 1.2rem;

        opacity: 0.4;
    }
`;

export default StyledButton;