import { observable, action, } from 'mobx'

export class AppStore {
    algorithms = observable([]);
    compares = observable([]);
    images = observable([]);
    similarities = observable([]);

    @action
    setAlgorithms(algorithms: any) {
        this.algorithms = algorithms;
    }

    @action
    setImages(images: any) {
        this.images = images;
    }

    @action
    setCompares(compares: any) {
        this.compares = compares;
    }

    @action
    setSimilarities(similarities: any) {
        this.similarities = similarities;
    }
}

const appStore = new AppStore()
export default appStore;