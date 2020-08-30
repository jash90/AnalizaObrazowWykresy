import React from 'react';
import { Pie } from "react-chartjs-2";
import axios from "axios";

export default class WykresyPoprawnosci extends React.Component<{}, { pieData: any[] }> {
    state = {
        pieData: []
    }


    async componentDidMount() {
        const response = await axios.get("http://localhost:3091/compares");
        const compares: any[] = response.data;

        const response2 = await axios.get("http://localhost:3091/algorithms");
        const algorithms: any[] = response2.data;

        let pieData: any[] = [];

        for (let i = 0; i < algorithms.length; i++) {
            const algorithm = algorithms[i];
            const algorithmCompares = compares.filter(compare => compare.versionAlgorithmId === algorithm.id);
            const correct = algorithmCompares.filter(compare => compare.correct === true).length;
            const incorrect = algorithmCompares.filter(compare => compare.correct === false).length;
            const data = {
                labels: [
                    `Poprawne ${((correct/(correct+ incorrect)*100).toFixed(2))}%`,
                    `Niepoprawne ${((incorrect/(correct+ incorrect)*100).toFixed(2))}%`,
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

            const options = { title: { text: algorithm.name, display: true, position: "top", fontSize: 20 } }

            pieData.push({ data, options });

        }

        this.setState({ pieData });

    }
    render() {
        return (<div style={{display:"flex",flexDirection:"row", flexWrap: "wrap"}}>
            {this.state.pieData.map((props, index) => {
                return (<div key={index.toString()} style={{width:200, height:200, padding:20}}>
                    <Pie key={index.toString()} {...props} width={200} height={200}/>
                </div>)
            })}
        </div>)
    }
}


