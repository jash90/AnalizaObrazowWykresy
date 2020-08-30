import React from 'react';
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Utils from '../Utils';

export default class ChartsPair5Algorithms extends React.Component<{}, { barData: {} }> {
    state = {
        barData: {}
    }


    async componentDidMount() {
        const response = await axios.get("http://localhost:3091/compares");
        const compares: any[] = response.data;

        const response2 = await axios.get("http://localhost:3091/algorithms");
        const algorithms: any[] = response2.data;

        let algorithmsCorrects = [];
        var allCompares = 0;

        for (let i = 0; i < algorithms.length; i++) {
            const algorithm = algorithms[i];
            const algorithmCompares = compares.filter(compare => compare.versionAlgorithmId === algorithm.id);
            const correct = algorithmCompares.filter(compare => compare.correct === true).length;
            const incorrect = algorithmCompares.filter(compare => compare.correct === false).length;

            algorithmsCorrects.push({ name: algorithm.name, correct });
            allCompares = correct + incorrect;
        }

        const filteredAlgorithms = algorithmsCorrects.sort((a, b) => { return b.correct - a.correct }).slice(0, 5);

        const labels = filteredAlgorithms.map(algorithm => algorithm.name + ` ${((algorithm.correct / allCompares) * 100).toFixed(2)}%`);
        const corrects = filteredAlgorithms.map(algorithm => { return ((algorithm.correct / allCompares) * 100).toFixed(2) });

        console.log(labels, corrects);

        const backgroundColors = Utils.generateArrayRandomColor(5);

        this.setState({
            barData: {
                labels,
                datasets: [{
                    label: "Poprównanie procentowej 5 najlepszych algorymów",
                    data: corrects,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: backgroundColors.map(color =>color+"99"),
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

