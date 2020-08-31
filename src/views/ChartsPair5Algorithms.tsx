import React from 'react';
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Utils from '../Utils';
import { observer, inject } from 'mobx-react';
import { AppStore } from '../stores/AppStore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


interface Props {
    appStore: AppStore
}

interface State {
    barData: any
    images: any[]
    images1: any[]
    images2: any[]
    image1: string
    image2: string
}

@observer
@inject("appStore")
export default class ChartsPair5Algorithms extends React.Component<Props, State> {
    state = {
        barData: {}, images: [], images1: [], images2: [], image1: "", image2: "",
    }


    async componentDidMount() {
        const compares: any[] = this.props.appStore.compares;
        const algorithms: any[] = this.props.appStore.algorithms;

        const { labels, corrects } = Utils.calculateDataToCharts(algorithms, compares, true)

        const backgroundColors = Utils.generateArrayRandomColor(5);

        this.setState({
            barData: {
                labels,
                datasets: [{
                    label: "Poprównanie procentowej 5 najlepszych algorymów",
                    data: corrects,
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: backgroundColors.map(color => color + "99"),
                }]
            },
        });
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <div style={{ display: "flex", width: "100%", height: 550 }}>
                    <Bar data={this.state.barData} options={{ maintainAspectRatio: false, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }} width={1000} height={300} />
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", padding: 10, justifyContent: "space-evenly" }}>
                    <span>Wybierz zdjęcia aby podać statystki dla tych dwóch zdjęcia</span>
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.props.appStore.images}
                        getOptionLabel={(option: any) => option.filename}
                        style={{ width: 300 }}
                        value={this.state.image1}
                        onSelect={(e: any) => { this.setState({ image1: e.target.value }); }}
                        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                    />

                    <span>{this.state.image1}</span>

                </div>


            </div>
        )
    }
}


