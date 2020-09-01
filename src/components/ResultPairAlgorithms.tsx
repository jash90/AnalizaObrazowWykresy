import React from 'react';
import { Bar } from "react-chartjs-2";
import Utils from '../Utils';
import { observer } from 'mobx-react';
import Image from '../models/Image';
interface Props {
    image1: Image[]
    image2: Image[]
}

interface State {
    barData: any
}

@observer
export default class ResultPairAlgorithms extends React.Component<Props, State> {
    state = {
        barData: {},
    }


    render() {

        const { image1, image2 } = this.props;

        const backgroundColors: string[] = Utils.generateArrayRandomColor(45);

        const { labels, similarities } = Utils.calculateChartsPairAlgorithms(image1, image2);


        const barData = {
            labels,
            datasets: [{
                label: `Porównanie podobieństwa dwóch obrazów ${image1[0].filename} i ${image2[0].filename} wg wszystkich algorytmów`,
                data: similarities,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: backgroundColors.map(color => color + "99")
            }]
        };

        return (
            <Bar data={barData} options={{ maintainAspectRatio: false, scales: { yAxes: [{ ticks: { beginAtZero: true, suggestedMax: 100 } }] } }} width={1000} height={300} />
        )
    }
}


