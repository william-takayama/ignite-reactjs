import styled from "styled-components";

interface ContainerProps {
  isLoading: boolean;
  size: number;
}

export const Container = styled.div<ContainerProps>`
  background: var(--blue-light);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: opacity 0.8s;

  opacity: ${({ isLoading }) => (isLoading ? 0.9 : 0)};
  z-index: ${({ isLoading }) => (isLoading ? 1 : -1)};

  div {
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    border-radius: 50%;
    box-shadow: inset 0 0 0 4px var(--text-title);
    position: relative;

    &:after {
      content: "";
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      width: calc(${({ size }) => `${size}px`} - calc(4px * 2));
      height: calc(${({ size }) => `${size}px`} - calc(4px * 2));
      border: 4px solid transparent;
      border-top-color: var(--shape);
      transform: translate(-50%, -50%) rotateZ(0);
      will-change: transform;
      animation-name: loader;
      animation-duration: 0.8s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
    }

    @keyframes loader {
      0% {
        transform: translate(-50%, -50%) rotate(0);
      }

      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  }
`;
