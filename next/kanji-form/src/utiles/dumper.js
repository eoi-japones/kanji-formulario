import FileSaver from 'file-saver'
import Yaml from 'js-yaml'

export default function(data, name){

    var file = new File(

        [
            Yaml.dump(data)
        ], 

        "name", 

        {type: "text/plain;charset=utf-8"}

    );

    FileSaver.saveAs(file);

}
