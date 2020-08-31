import React from 'react';
import { Bar } from "react-chartjs-2";
import Utils from '../Utils';
import { observer, inject } from 'mobx-react';
import { AppStore } from '../stores/AppStore';
import { Typeahead } from 'react-bootstrap-typeahead';
import ResultPair5Algorithms from '../components/ResultPair5Algorithms';
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
export default class ChartsPair5Algorithms extends React.Component<Props, State> {
    state = {
        barData: {}, image1: [], image2: [],
    }


    async componentDidMount() {

        const { labels, corrects } = Utils.calculateDataToCharts(true);

        const backgroundColors = Utils.generateArrayRandomColor(5);

        this.setState({
            barData: {
                labels,
                datasets: [{
                    label: "Porównanie procentowej poprawności 5 najlepszych algorytmów",
                    data: corrects,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: backgroundColors.map(color => color + "99"),
                }]
            },
        });
    }

    render() {
        return (
            <React.Fragment>
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
                        {!!this.state.image1.length && !!this.state.image2.length && <ResultPair5Algorithms image1={this.state.image1} image2={this.state.image2} />}
                    </ChartContainer>
                </Container>
            </React.Fragment>
        )
    }
}


