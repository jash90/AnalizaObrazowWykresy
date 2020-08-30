import { observable, action, } from 'mobx'

export class AppStore {
    algorithms = observable([]);
    compares = observable([]);
    images = observable([]);

    chartsCorrectness: any[] = observable([]);

    @observable
    chartsPairAlgorithms: any;

    @observable
    chartsPair5Algorithms: any;

    @observable
    pairPhotosAlgorithms: any;

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
}

const appStore = new AppStore()
export default appStore;