import React from 'react';
import { observer, inject } from 'mobx-react';
import { AppStore } from '../stores/AppStore';
import { Container, ContainerColumn } from '../components/StyledComponents';
import Utils from '../Utils';
import styled from 'styled-components';

const Title = styled.span<{ similarity: number }>`
    color: ${props => props.similarity >= 50 ? "#1B5E20" : "black"};
    font-weight: ${props => props.similarity >= 50 ? "bold" : "normal"};
    padding: 10px;
    width: 250px;
`;

const Img = styled.img<{ image: any }>`
   width:${props =>props.image.width}px; 
   height:${props =>props.image.height}px; 
   padding: 10px;
`;

@observer
@inject("appStore")
export default class PairPhotosAlgorithms extends React.Component<{ appStore: AppStore }, { similarities: any[] }> {
    state = {
        similarities: []
    }


    async componentDidMount() {
        this.setState({ similarities: Utils.getSimilaritiesResult() });
    }
    render() {
        return (<ContainerColumn>
            {this.state.similarities.map((similarity: any, index: number) => {
                const { image, secondImage } = similarity;
                const img1 = require(`../${image.path}`);
                const img2 = require(`../${secondImage.path}`);
                return (
                    <ContainerColumn>
                        <Container>
                            <Img key={"a" + index} src={img1} image={image} alt={image.filename} />
                            <Img key={"b" + index} src={img2} image={secondImage} alt={secondImage.filename} />
                        </Container>

                        <Container>
                            {similarity.compares.map((compare: any, index: number) => {
                                return (
                                    <Title similarity={compare.similarity}>
                                        {`${compare.algorithm.name} ${compare.similarity}%`}
                                    </Title>
                                )
                            })}
                        </Container>
                    </ContainerColumn>
                )
            })}
        </ContainerColumn>)
    }
}


