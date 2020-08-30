import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Header, Title, Container, Navigation } from "./components/StyledComponents";
import { ButtonLink } from './components/ButtonLink';
import ChartsCorrectness from './views/ChartsCorrectness';
import PairPhotosAlgorithms from './views/PairPhotosAlgorithms';
import ChartPair5Algorithms from './views/ChartsPair5Algorithms';
import ChartsPairAlgorithms from './views/ChartsPairAlgorithms';
import { Provider } from "mobx-react";
import appStore from "./stores/AppStore"
import axios from "axios";

export default class App extends React.Component {
  async componentDidMount() {
    const response1 = await axios.get("http://localhost:3091/compares");
    appStore.setCompares(response1.data);

    const response2 = await axios.get("http://localhost:3091/algorithms");
    appStore.setAlgorithms(response2.data);
  }
  render() {
    return (
      <Router>
        <Provider {...{ appStore }}>
          <Container>
            <Header>
              <Title>Wykresy Sławomir Frydrych</Title>
            </Header>
            <Navigation>
              <ButtonLink to="/wykresy-poprawnosci" >Wykresy poprawności</ButtonLink>
              <ButtonLink to="/wykresy-podobienstwa-par-zdjec-algorytmow">Procentowe podobieństwo dla wybranej pary obrazów wg algorytmy 45</ButtonLink>
              <ButtonLink to="/wykresy-podobienstwa-par-zdjec-5-najlepszych-algorytmow">Procentowe podobieństwo dla wybranej pary obrazów wg 5 najlepszych</ButtonLink>
              <ButtonLink to="/pary-zdjec-algorytmow">Wyświetlenie par zdjęć dla danych algorytmów</ButtonLink>
            </Navigation>
            <Switch>
              <Route path="/wykresy-poprawnosci" component={ChartsCorrectness} />
              <Route path="/pary-zdjec-algorytmow" component={PairPhotosAlgorithms} />
              <Route path="/wykresy-podobienstwa-par-zdjec-5-najlepszych-algorytmow" component={ChartPair5Algorithms} />
              <Route path="/wykresy-podobienstwa-par-zdjec-algorytmow" component={ChartsPairAlgorithms} />
            </Switch>
          </Container>
        </Provider>
      </Router>
    );
  }
}
