export default class Algorithm {
    public id: string = "0";

    public name: string = "Algorithm";

    public parameters: string = ""


    public Algorithm(name: string = "Algorithm", parameters: string = "") {
        this.name = name;
        this.parameters = parameters;
    }
}