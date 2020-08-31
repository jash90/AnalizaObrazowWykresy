import React from 'react';
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { observer, inject } from 'mobx-react';
import { AppStore } from '../stores/AppStore';

@observer
@inject("appStore")
export default class PairPhotosAlgorithms extends React.Component<{ appStore: AppStore }, { similarities: any[] }> {
    state = {
        similarities: []
    }


    async componentDidMount() {
        const images: any[] = this.props.appStore.images;
        const algorithms: any[] = this.props.appStore.algorithms;
        var compares: any[] = this.props.appStore.compares;
        var similarities: any[] = this.props.appStore.similarities;

        similarities = similarities.map(similarity => {
            const image = images.find(image => image.id === similarity.imageId);
            const secondImage = images.find(image => image.id === similarity.secondImageId);
            compares = compares.filter((compare: any) => {
                return (compare.imageId === similarity.imageId || compare.imageId === similarity.secondImageId) && (compare.secondImageId === similarity.imageId || compare.secondImageId === similarity.secondImageId)
            }).map((compare: any) => {
                const algorithm = algorithms.find(algorithm => algorithm.id === compare.versionAlgorithmId);
                return { ...compare, algorithm }
            })

            return { ...similarity, image, secondImage, compares }
        });

        this.setState({ similarities });

    }
    render() {
        return (<div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {this.state.similarities.map((similarity: any, index: number) => {
                const { image, secondImage } = similarity;
                console.log(image.path, secondImage.path);
                const img1 = require(`../${image.path}`);
                const img2 = require(`../${secondImage.path}`);
                console.log(similarity);
                return (
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <img key={"a" + index} src={img1} width={image.width} height={image.height} style={{ padding: 10 }} />
                            <img key={"b" + index} src={img2} width={secondImage.width} height={secondImage.height} style={{ padding: 10 }} />
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                            {similarity.compares.map((compare: any, index: number) => {
                                return (
                                    <span style={{ padding: 10, width: 250, color: compare.similarity >= 50 ? "#1B5E20" : "black", fontWeight: compare.similarity >= 50 ? "bold" : "normal", }}>
                                        {`${compare.algorithm.name} ${compare.similarity}%`}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>)
    }
}


