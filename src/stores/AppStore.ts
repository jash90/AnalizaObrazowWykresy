import { observable, action, } from 'mobx'
import Algorithm from '../models/Algorithm';
import Image from '../models/Image';
import Similarity from '../models/Similarity';
import Compare from '../models/Compare';
export class AppStore {
    algorithms:Algorithm[] = observable([]);
    compares:Compare[] = observable([]);
    images:Image[] = observable([]);
    similarities:Similarity[] = observable([]);

    @action
    setAlgorithms(algorithms:Algorithm[]) {
        this.algorithms = algorithms;
    }

    @action
    setImages(images:Image[]) {
        this.images = images;
    }

    @action
    setCompares(compares: Compare[]) {
        this.compares = compares;
    }

    @action
    setSimilarities(similarities: Similarity[]) {
        this.similarities = similarities;
    }
}

const appStore = new AppStore()
export default appStore;