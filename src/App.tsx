import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Header, Title, Container } from "./components/StyledComponents";
import { ButtonLink } from './components/ButtonLink';
import ChartsCorrectness from './views/ChartsCorrectness';
import PairPhotosAlgorithms from './views/PairPhotosAlgorithms';
import ChartPair5Algorithms from './views/ChartsPair5Algorithms';
import ChartsPairAlgorithms from './views/ChartsPairAlgorithms';

export default function App() {
  return (
    <Router>
      <Container>
        <Header>
          <Title>Wykresy Sławomir Frydrych</Title>
        </Header>
        <ButtonLink to="/wykresy-poprawnosci" >Wykresy poprawności</ButtonLink>
        <ButtonLink to="/wykresy-podobienstwa-par-zdjec-algorytmow">Procentowe podobieństwo dla wybranej pary obrazów wg algorytmy 45</ButtonLink>
        <ButtonLink to="/wykresy-podobienstwa-par-zdjec-5-najlepszych-algorytmow">Procentowe podobieństwo dla wybranej pary obrazów wg 5 najlepszych</ButtonLink>
        <ButtonLink to="/pary-zdjec-algorytmow">Wyświetlenie par zdjęć dla danych algorytmów</ButtonLink>
        <Switch>
          <Route path="/wykresy-poprawnosci" component={ChartsCorrectness} />
          <Route path="/pary-zdjec-algorytmow" component={PairPhotosAlgorithms} />
          <Route path="/wykresy-podobienstwa-par-zdjec-5-najlepszych-algorytmow" component={ChartPair5Algorithms} />
          <Route path="/wykresy-podobienstwa-par-zdjec-algorytmow" component={ChartsPairAlgorithms} />
        </Switch>
      </Container>
    </Router>
  );
}
