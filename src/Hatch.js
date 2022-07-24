const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Hatch extends DatabaseObject {
    constructor(multiline, color) {
        super(["AcDbEntity", "AcDbHatch"]);
        this.multiline = multiline;
        this.color = color;
    }

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.addTag(0, "HATCH");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addTag(62, this.color);

        manager.addPointTags(this.multiline[0][0], this.multiline[0][1]);
        manager.addTagsByElements([
            [210, 0.0],
            [220, 0.0],
            [230, 1.0],
            [2, "SOLID"],
            [70, 1],
            [71, 0],
            [91, 1],
            [92, 3],
            [72, 0],
            [73, 1],
            [93, this.multiline.length],
        ]);

        for(let pointsNum = 0; pointsNum < this.multiline.length; ++pointsNum)
            manager.addPointTags(this.multiline[pointsNum][0], this.multiline[pointsNum][1]);

        manager.addTagsByElements([
            [97, 0],
            [75, 0],
            [76, 1],
            [98, 0],
        ]);


        return manager.tags();
    }
}

module.exports = Hatch;
