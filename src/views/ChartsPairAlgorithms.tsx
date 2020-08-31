import React from 'react';
import { Bar } from "react-chartjs-2";
import Utils from '../Utils';
import { AppStore } from '../stores/AppStore';
import { observer, inject } from 'mobx-react';
import { Typeahead } from 'react-bootstrap-typeahead';
import ResultPairAlgorithms from '../components/ResultPairAlgorithms';
import { ChartContainer, Container, InputContainer } from '../components/StyledComponents';

interface Props {
    appStore: AppStore
}

interface State {
    barData: any
    image1: any[]
    image2: any[]
}
@observer
@inject("appStore")
export default class ChartsPairAlgorithms extends React.Component<Props, State> {
    state = {
        barData: {}, image1: [], image2: []
    }


    async componentDidMount() {

        const { labels, corrects } = Utils.calculateDataToCharts();

        const backgroundColors = Utils.generateArrayRandomColor(45);

        this.setState({
            barData: {
                labels,
                datasets: [{
                    label: "Porównanie procentowej poprawności wszystkich algorytmów",
                    data: corrects,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: backgroundColors.map(color => color + "99")
                }]
            }
        });
    }

    render() {
        return (
            <Container>
                <ChartContainer>
                    <Bar data={this.state.barData} options={{ maintainAspectRatio: false, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }} width={1000} height={300} />
                </ChartContainer>
                <InputContainer>
                    <span>Wybierz zdjęcia aby podać statystki dla tych dwóch zdjęcia</span>
                    <Typeahead<any>
                        id="image1"
                        labelKey="filename"
                        onChange={(value: any) => { this.setState({ image1: value }) }}
                        options={Utils.getImages(this.state?.image2)}
                        placeholder="Choose a image..."
                    />

                    <Typeahead<any>
                        id="image2"
                        labelKey="filename"
                        onChange={(value: any) => { this.setState({ image2: value }) }}
                        options={Utils.getImages(this.state?.image1)}
                        placeholder="Choose a image..."
                    />
                </InputContainer>
                <ChartContainer>
                    {!!this.state.image1.length && !!this.state.image2.length && <ResultPairAlgorithms image1={this.state.image1} image2={this.state.image2} />}
                </ChartContainer>
            </Container>
        )
    }
}


