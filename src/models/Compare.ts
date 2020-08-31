export default class Compare {
    public id: string = "0";

    public imageId: string = "0";

    public secondImageId: string = "0";

    public similarity: number = 0;

    public correct: boolean = false;

    public versionAlgorithmId: string = "0";


    public Compare(imageId: string = "0", secondImageId: string = "0", similarity: number = 0, correct: boolean = false, versionAlgorithmId: string = "0") {
        this.imageId = imageId;
        this.secondImageId = secondImageId;
        this.similarity = similarity;
        this.correct = correct;
        this.versionAlgorithmId = versionAlgorithmId;
    }
}