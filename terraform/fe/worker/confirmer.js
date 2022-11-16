import fs from 'fs';

const dir_name = process.cwd();


const confirmTemplate = (project_name, env) => {
    var dir_path = dir_name + '/service-dev/' + project_name + '-' + env;
    console.log("확인 경로")
    console.log(dir_path);



    if (fs.existsSync(dir_path)) {
        const contents = fs.readFileSync(dir_path + "/main.tf", 'utf8');
        if (contents.length > 0) {
            console.log(contents);
        }
    } else {
        console.log("해당 경로에 디렉토리가 없습니다.")
    }
};

export default confirmTemplate;
