import React from 'react';
import { Pie } from "react-chartjs-2";
import { observer, inject, } from 'mobx-react';
import { AppStore } from '../stores/AppStore';
import Utils from '../Utils';

@observer
@inject("appStore")
export default class WykresyPoprawnosci extends React.Component<{ appStore: AppStore }, { pieData: any[] }> {
    state = {
        pieData: []
    }


    async componentDidMount() {
        console.log(this.props.appStore);
        const compares: any[] = this.props.appStore.compares;
        const algorithms: any[] = this.props.appStore.algorithms;

        var pieData: any[] = [];

        const algorithmsCompares = Utils.calculateAlgorithmsCorrects(algorithms, compares);

        pieData = algorithmsCompares.map((algorithm: any) => {
            const { correct, incorrect, name } = algorithm;

            const data = {
                labels: [
                    `Poprawne ${((correct / (correct + incorrect) * 100).toFixed(2))}%`,
                    `Niepoprawne ${((incorrect / (correct + incorrect) * 100).toFixed(2))}%`,
                ],
                datasets: [{
                    data: [correct, incorrect],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',

                    ],
                    hoverBackgroundColor: [
                        '#FF638499',
                        '#36A2EB99',
                    ],
                }]
            };

            const options = { title: { text: name, display: true, position: "top", fontSize: 20 } }
            return { data, options };
        })



        this.setState({ pieData });

    }
    render() {
        return (<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            {this.state.pieData.map((props, index) => {
                return (<div key={index.toString()} style={{ width: 200, height: 200, padding: 20 }}>
                    <Pie key={index.toString()} {...props} width={200} height={200} />
                </div>)
            })}
        </div>)
    }
}


