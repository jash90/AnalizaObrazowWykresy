import React from 'react';
import { Pie } from "react-chartjs-2";
import { observer, } from 'mobx-react';
import Utils from '../Utils';
import { Container } from '../components/StyledComponents';
import styled from 'styled-components';

const PieContainer = styled.div`
    width: 200px;
    height: 200px; 
    padding: 20px;
`;

interface State {
    pieData: any[]
}
@observer
export default class WykresyPoprawnosci extends React.Component<{}, State> {
    state = {
        pieData: []
    }


    async componentDidMount() {
        var pieData: any[] = [];

        const algorithmsCompares = Utils.calculateAlgorithmsCorrects();

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
        });

        this.setState({ pieData });

    }
    render() {
        return (<Container>
            {this.state.pieData.map((props:any, index:number) => {
                return (<PieContainer key={index.toString()} >
                    <Pie key={index.toString()} {...props} width={200} height={200} />
                </PieContainer>)
            })}
        </Container>)
    }
}


