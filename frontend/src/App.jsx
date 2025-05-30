import React from 'react';
import styled from 'styled-components';
import { useTheme } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Container from './styles/components/Container';


function App() {
  const { theme } = useTheme();

  return (
    <Container>
      <h1>Olá, bem-vindo ao Process Scheduling Simulator.</h1>
      <ThemeToggle />
      <h3>Algorithm</h3>
      <h3>Mode</h3>
      <h2>Processes</h2>
    </Container>
  );
}

export default App;
