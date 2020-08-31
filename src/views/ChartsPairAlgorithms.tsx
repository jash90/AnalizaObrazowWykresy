import React from 'react';
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Utils from '../Utils';
import { AppStore } from '../stores/AppStore';
import { observer, inject } from 'mobx-react';

@observer
@inject("appStore")
export default class ChartsPairAlgorithms extends React.Component<{ appStore: AppStore }, { barData: {} }> {
    state = {
        barData: {}
    }


    async componentDidMount() {

        const compares: any[] = this.props.appStore.compares;
        const algorithms: any[] = this.props.appStore.algorithms;

        const {labels, corrects} = Utils.calculateDataToCharts(algorithms,compares);

        const backgroundColors = Utils.generateArrayRandomColor(45);

        this.setState({
            barData: {
                labels,
                datasets: [{
                    label: "Poprównanie procentowej wszystkich najlepszych algorymów",
                    data: corrects,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: backgroundColors.map(color => color + "99")
                }]
            }
        });
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Bar data={this.state.barData} options={{ scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }} />
            </div>
        )
    }
}


