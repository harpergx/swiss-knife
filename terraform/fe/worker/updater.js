import fs from 'fs';
import * as creator from './creator.js';
import * as convertor from '../helper/convertor.js'


const dir_name = process.cwd();



const updateTemplate = (target_name) => {

};

const checkUpdateTarget = () => {
    let dirlist = fs.readFileSync(dir_name + "/fe-template/dir-list/dirlist.json", 'utf8');

    let dname = [];
    if (dirlist.includes("DIR_NAME")) {

        while (dirlist.includes("DIR_NAME")) {
            var dirname = dirlist.substring(dirlist.indexOf('DIR_NAME'), dirlist.indexOf(','));
            dirname = dirname.substring(dirname.indexOf(":") + 2);
            dname.push(dirname);
            dirlist = dirlist.substring(dirlist.indexOf('}') + 3);
        }
    } else {
        console.log("변경 할 수 있는 디렉토리가 없습니다.")
        return false;
    }
    return dname;
};


const checkTargetData = (target_name) => {
    var dir_path = dir_name + '/service-dev/' + target_name;

    let con = fs.readFileSync(dir_path + "/main.tf", 'utf8');

};

export { updateTemplate, checkUpdateTarget }
