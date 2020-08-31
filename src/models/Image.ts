export default class Image {
    public id: string = "0";

    public filename: string = "filename";

    public path: string = "path";

    public width: number = 0;

    public height: number = 0;

    public location: string = "";

    public date_created: Date = new Date();

    public Image(filename: string = "filename", path: string = "path", width: number = 0, height: number = 0, location: string = "", date_created: Date = new Date()) {
        this.filename = filename;
        this.path = path;
        this.width = width;
        this.height = height;
        this.location = location;
        this.date_created = date_created;
    }
}