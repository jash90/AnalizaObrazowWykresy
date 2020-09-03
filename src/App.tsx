import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Header, Title, Navigation } from "./components/StyledComponents";
import { ButtonLink } from './components/ButtonLink';
import ChartsCorrectness from './views/ChartsCorrectness';
import PairPhotosAlgorithms from './views/PairPhotosAlgorithms';
import ChartPairBestAlgorithms from './views/ChartsPairBestAlgorithms';
import ChartsPairAlgorithms from './views/ChartsPairAlgorithms';
import { Provider } from "mobx-react";
import appStore from "./stores/AppStore"
import { Axios } from "./Axios";

export default class App extends React.Component {
  async componentDidMount() {
    try {
      const response1 = await Axios.get("compares");
      appStore.setCompares(response1.data);

      const response2 = await Axios.get("algorithms");
      appStore.setAlgorithms(response2.data);

      const response3 = await Axios.get("images");
      appStore.setImages(response3.data);

      const response4 = await Axios.get("similarities");
      appStore.setSimilarities(response4.data);
    } catch (error) {
      console.log(error);
    }

  }
  render() {
    return (
      <Router>
        <Provider {...{ appStore }}>
          <>
            <Header>
              <Title>Wykresy Sławomir Frydrych</Title>
            </Header>
            <Navigation>
              <ButtonLink to="/wykresy-poprawnosci" >Wykresy poprawności</ButtonLink>
              <ButtonLink to="/wykresy-podobienstwa-par-zdjec-algorytmow">Porównanie procentowej poprawności wszystkich algorytmów</ButtonLink>
              <ButtonLink to="/wykresy-podobienstwa-par-zdjec-najlepszych-algorytmow">Porównanie procentowej poprawności dla najlepszych algorytmów</ButtonLink>
              <ButtonLink to="/pary-zdjec-algorytmow">Wyświetlenie par zdjęć dla danych algorytmów</ButtonLink>
            </Navigation>
            <Switch>
              <Route path="/wykresy-poprawnosci" component={ChartsCorrectness} />
              <Route path="/pary-zdjec-algorytmow" component={PairPhotosAlgorithms} />
              <Route path="/wykresy-podobienstwa-par-zdjec-najlepszych-algorytmow" component={ChartPairBestAlgorithms} />
              <Route path="/wykresy-podobienstwa-par-zdjec-algorytmow" component={ChartsPairAlgorithms} />
            </Switch>
          </>
        </Provider>
      </Router>
    );
  }
}
