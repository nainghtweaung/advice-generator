import React from 'react';
import useSwr from 'swr';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import dice from '../assets/images/icon-dice.svg';
import patternDesktop from '../assets/images/pattern-divider-desktop.svg';
import patternMobile from '../assets/images/pattern-divider-mobile.svg';

async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();

  return data;
}

function AdviceWindow() {
  const [id, setId] = React.useState(() => randomNumber());
  const { data, error, isLoading } = useSwr(
    `https://api.adviceslip.com/advice/${id}`,
    fetcher
  );
  const isMobile = useMediaQuery({
    query: '(max-width: 375px)',
  });

  function handleClick() {
    setId(() => randomNumber());
  }

  function randomNumber() {
    const num = 220;
    return Math.floor(Math.random() * num);
  }

  console.log(isMobile);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <Wrapper>
      <Heading>ADVICE #{data.slip.id}</Heading>
      <Advice>{data.slip.advice}</Advice>
      <PatternWrapper>
        <img
          src={isMobile ? patternMobile : patternDesktop}
          alt="divider after text"
        />
      </PatternWrapper>
      <RandomAdviceButton onClick={handleClick}>
        <img src={dice} alt="dice" />
      </RandomAdviceButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  max-width: 470px;
  min-height: 250px;
  padding: 36px 24px;
  background-color: var(--color-neutral-dark-grayish-blue);

  @media (max-width: 375px) {
    padding: 36px 12px;
    font-size: 1.5rem;
    padding: 12px 24px;
    margin-top: 80px;
    height: 250px;
  }
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  border: 12px solid rgba(0, 0, 0, 0.2);
  border-left: 12px solid white;
  border-radius: 50%;
  animation: load8 1.1s infinite linear;
  transition: opacity 0.3s;

  @keyframes load8 {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const Heading = styled.h3`
  color: var(--color-primary-neon-green);
  font-size: calc(12rem / 16);
  font-weight: 600;
  letter-spacing: 0.2rem;
  margin-bottom: 16px;
`;

const RandomAdviceButton = styled.button`
  --size: 50px;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  width: var(--size);
  height: var(--size);
  background-color: var(--color-primary-neon-green);
  border-radius: 50%;
  padding: 0;
  display: grid;
  place-content: center;
`;

const Advice = styled.p`
  color: var(--color-primary-light-cyan);
  margin-bottom: auto;

  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }

  @media (max-width: 375px) {
    margin-bottom: 24px;
  }
`;

const PatternWrapper = styled.div`
  margin-bottom: 24px;
  margin-top: 24px;
`;

export default AdviceWindow;
