const dir_name = process.cwd();

const isNull = (project_name, domain_name
    , acl_id, build_path, env, acm_cert, route53_name, team_name) => {
    if (!project_name | !domain_name | !acl_id | !build_path | !env | !acm_cert | !route53_name | !team_name) {
        return false;
    }
    return true;
};

const verifyEnv = (env) => {

    if (env.includes("dev")) {
        return true;
    } else if (env.includes("qa")) {
        return true;
    } else if (env.includes("stg")) {
        return true;
    } else if (env.includes("prod")) {
        return true;
    }
    return false;
};

const verifyName = (str) => {
    const regExp = /[a-z0-9]-[a-z0-9]/g;


    if (regExp.test(str)) {
        return true;
    } else {
        console.log("project name 입력 값이 잘못되었습니다");
        console.log("")
        console.log("입력 값 : " + str);
        return false;
    }
};


const verifyPath = () => {

    if (dir_name.substring(dir_name.lastIndexOf("/")) === "/terraform-environments") {
        return true;

    } else {
        console.log("실행 경로를 확인해주세요");
        console.log("terraform-environments 바로 아래 root path에서 실행해야 합니다");
        return false;
    }
};


export { isNull, verifyEnv, verifyName, verifyPath }
