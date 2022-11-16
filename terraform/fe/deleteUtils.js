const fs = require('fs');



const dir_name = process.cwd();



const deleteDirlist = (target_name) => {
    let dirlist = fs.readFileSync(dir_name + "/fe-template/dir-list/dirlist.json", 'utf8');
  
    var idx = dirlist.indexOf(target_name);

    var left = dirlist.substring(0, idx);
    left = left.substring(0, left.lastIndexOf("{"));

    var right = dirlist.substring(idx);
    right = right.substring(right.indexOf("}") + 2);
    if(!right.includes(']')) {
      left = left.substring(0, left.lastIndexOf(","));
      if(left.includes('[')) {
        right = "]";
      }
    }

    fs.writeFileSync(dir_name + "/fe-template/dir-list/dirlist.json", left + right);


};  


const deleteTemplate = (project_name, env) =>  {
    var dir_path = dir_name + '/service-dev/' + project_name + '-' + env;
    console.log("삭제 경로 확인")
    console.log(dir_path);

    

    if(fs.existsSync(dir_path)) {
        const files = fs.readdirSync(dir_path);

        if (files.length > 0) {
            files.forEach(filename => {
              if (filename != '.terraform') {
                if (fs.statSync(dir_path + "/" + filename).isDirectory()) {
                  fs.rmdirSync(dir_path + "/" + filename);
                } else {
                  fs.unlinkSync(dir_path + "/" + filename);
                }        
              } else {
                fs.rmSync(dir_path + "/" + filename, { recursive: true, force: true });
              }
            });
        }
        fs.rmdirSync(dir_path);
        deleteDirlist(project_name + '-' + env);
        console.log("디렉토리 삭제 완료");
    } else {
        console.log("해당 경로에 디렉토리가 존재하지 않습니다")
    }
};

exports.deleteTemplate = deleteTemplate;