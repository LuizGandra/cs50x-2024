import styled from 'styled-components';

const StyledHeader = styled.header`
    margin-bottom: 8rem;
    padding: 3.2rem 6.4rem;
    
    display: flex;
    justify-content: end;
    align-items: center;

    position: relative;

    .header-description {
        margin: 0;

        text-transform: uppercase;
        font-weight: bold;
        color: #efefff;

        display: flex;
        align-items: center;
        gap: 0.4rem;

        position: absolute;
        left: 50%;

        transform: translateX(-50%);

        span, a:link, a:visited {
            color: #ebba49;
        }

        a:link, a:visited {
            text-decoration: none;

            transition: ease all 0.3s;
        }

        a:hover, a:active {
            font-size: 1.8rem;
            color: #f7d086;
            text-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            
            display: block;

            transform: translateY(-0.5px);
        }
    }

    .options {
        font-size: 2rem;
        color: #fff;

        .options-list {
            margin-bottom: 4px;

            list-style: none;

            display: flex;
            gap: 2.4rem;

            .icon {
                width: 3.6rem;
                height: 3.6rem;
                background-color: #2a2a33;
                border-radius: 6px;
                box-shadow: 0 5px 0 rgba(30, 32, 36, 1);

                display: flex;
                justify-content: center;
                align-items: center;

                transition: ease all 0.3s;
                cursor: pointer;

                &:hover {
                    background-color: #414354;
                }

                &:active {
                    transform: translateY(5%);

                    box-shadow: 0 2px 0 rgba(30, 32, 36, 1);
                }
            }
        }
    }
`;

const StyledMain = styled.main`
    max-width: 96rem;
    margin: 0 auto 9.6rem;

    text-align: center;

    position: relative;

    .logo {
        font-size: 3.2rem;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: #fff;

        position: absolute;
        top: -86px;
        left: 50%;

        transform: translateX(-50%) rotate(1deg);

        z-index: 2;
    }

    .logo .title-span {
        width: 48rem;
        margin-top: 0.8rem;
        padding: 1.2rem 0;
        background-color: #2a2a33;
        border-radius: 5px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);

        font-size: 4.8rem;
        letter-spacing: 1.6px;
        color: #ebba49;

        position: relative;

        display: block;

        transform: rotate(1deg);
    }

    .title-span::after {
        content: '?';

        text-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        
        font-size: 12.4rem;
        color: #fff;

        position: absolute;
        top: -72px;
        right: 48px;

        transform: rotate(8deg);
    }

    .ad {
        max-width: 96rem;
        height: 12rem;
        margin: 0 auto 8rem;
        background-color: #000;

        font-size: 1.6rem;
        font-weight: bold;
        color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const StyledSection = styled.section`
    max-width: 64rem;
    max-height: 62rem;
    margin: 0 auto;
    padding: 8.2rem 2.4rem 8.2rem;
    background-color: #fffff5;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

    position: relative;

    .text-container {
			max-height: 50rem;
			padding: 0 4rem 6.4rem;

			.primary-title {
					margin-bottom: 2.4rem;

					font-size: 2.4rem;
					line-height: 1.4;
			}

        .primary-title, div p {
            text-align: left;
        }

        div p {
            margin-bottom: 2.4rem;

            font-size: 1.8rem;
            line-height: 1.2;
        }

        div p:last-child {
            margin-bottom: 0;
        }

        .error-warning {
            margin-bottom: 0;
            text-align: center;
        }

        .error-warning.primary-title {
            margin-bottom: 0.6rem;
            
            text-transform: uppercase;
            color: #818181;
        }

        /* scrollbar */
        overflow-y: auto;

        /* Firefox */
        scrollbar-width: auto;
        scrollbar-color: #bababa #fff;

        /* Chrome, Edge, and Safari */
        &::-webkit-scrollbar {
            width: 8px;

            display: block;
        }

        &::-webkit-scrollbar-track {
            border-radius: 50px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #bababa;
            border-radius: 50px;
            border: 0;
        }

        &::-webkit-scrollbar-track-piece:end {
            margin-bottom: 60px;
        }
    }
`;

const StyledController = styled.div`
    width: 96rem;
    margin: -2.4rem auto 4.8rem;
    padding: 4.8rem 2.4rem;
    background-color: #2a2a33;
    border-radius: 15px;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);

    display: flex;
    justify-content: center;
    gap: 9.6rem;

    position: relative;

    /* &::before {
        content: '';
        width: 64rem;
        height: 72px;
        background: linear-gradient(to top, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0.1));

        position: absolute;
        top: -72px;
    } */

    .strip-container {
        position: absolute;
        top: -46px;
        
        z-index: 1;
    }

    .strip {
        width: 32rem;
        padding: 1.6rem 3.2rem;
        background-color: #ebba49;
        border-radius: 3px;
    }

    .strip-container::before,
    .strip-container::after {
        content: '';
        border-style: solid;
        border-width: 26px;
        position: absolute;
        top: 20px;
        line-height: 0;
        z-index: -2;
    }

    .strip-container::before {
        border-color: #a87938 #a87938 #a87938 transparent;
        left: -40px;
    }

    .strip-container::after {
        border-color: #a87938 transparent #a87938 #a87938;
        right: -40px;
    }

    .strip .secondary-title {
        font-size: 2.4em;
        line-height: 1;
        color: #fff;
    }

    .strip::before,
    .strip::after {
        content: '';
        height: 0;
        border-width: 6px;
        border-style: solid;
        line-height: 1px;
        position: absolute;
        
        z-index: -1;
    }

    .strip::before {
        border-color: #7a542b #7a542b transparent transparent;
        bottom: -10px;
        left: 0;
    }

    .strip::after {
        border-color: #7a542b transparent transparent #7a542b;
        bottom: -10px;
        right: 0;
    }
`;

const StyledFooter = styled.footer`
    width: 100%;
    background-color: #25272b;
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.1);

    color: #fff;

    .footer-content {
        max-width: 96rem;
        margin: 0 auto;
        padding: 3.2rem 0;

        display: flex;
        gap: 9.6rem;

        .footer-label {
            margin-bottom: 1.6rem;
            
            font-size: 1.6rem;
            font-weight: bold;
            text-transform: uppercase;
            color: #949ea8;
        }

        .footer-list {
            padding: 0;
            
            list-style: none;
        }

        .footer-list--pages {
            a:link,
            a:visited {
                font-weight: bold;
                color: #efefff;
            }

            a:hover,
            a:active {
                text-decoration: underline;
            }
        }

        .footer-list--medias {
            display: flex;
            align-items: center;
            gap: 1.8rem;

            a:link,
            a:visited {
                margin-bottom: 0;
            }

            a:link.icon,
            a:visited.icon {
                font-size: 3.2rem;
            }

            a:hover.icon,
            a:active.icon {
                opacity: 0.6;
            }
        }

        a:link,
        a:visited {
            height: 48px;
            margin-bottom: 0.6rem;

            font-size: 1.4rem;
            text-decoration: none;
            color: inherit;

            display: block;

            transition: ease all 0.2s;
        }
    }

    .creator-info {
        padding: 1.2rem 0;
        border-top: solid 2px #3c3c46;

        font-size: 1.2rem;
        text-align: center;
    }
`

export {
    StyledHeader,
    StyledMain,
    StyledSection,
    StyledController,
    StyledFooter
};