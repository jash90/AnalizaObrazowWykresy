export default class Similarity {
    public id: string = "0";

    public imageId: string = "0";

    public secondImageId: string = "0";

    public Similarity(imageId: string="0", secondImageId: string="0"){
        this.imageId = imageId;
        this.secondImageId = secondImageId;
    }

}