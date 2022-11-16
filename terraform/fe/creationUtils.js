
const fs = require('fs');
const conversionUtils = require('./conversionUtils');


const dir_name = process.cwd();

let resources = `{
    "TF_WORKSPACE_NAME": "replace_workspace_name",
    "S3_BUCKET_NAME": "replace_s3_bucket_name"

}`;


let dir_data = `{
    "DIR_NAME": "replace_dir_name",
    "DIR_PATH": "replace_dir_path",
    "TF_WORKSPACE_NAME": "replace_workspace_name",
    "S3_BUCKET_NAME": "replace_s3_bucket_name",
    "ENVIRONMENT" : "replace_env"
}`;

// TODO : qa 만 해당 내용 추가
let slack_webhook = `{
  resource "github_actions_environment_secret" "SLACK_WEBHOOK" {
    repository      = local.repo_name
    environment     = local.target_env
    secret_name     = "SLACK_WEBHOOK"
    plaintext_value = local.SLACK_WEBHOOK
    depends_on = [
      github_repository_environment.repo_environment
    ]
  }
}`;
  

const makeResourcefile = (dir_path, s3_name) => {
    resources = resources.replace("replace_s3_bucket_name", s3_name);
    resources = resources.replace("replace_workspace_name", "terraform-environments_service-dev_" + s3_name);
    fs.writeFileSync(dir_path + "/resources.json", resources);
};

const writeDirlist = ( dir,dir_path, dir_env) => {
    let dirlist = fs.readFileSync(dir_name + "/fe-template/dir-list/dirlist.json", 'utf8');
  
    dirlist = dirlist.replace("]","");
  
    fs.writeFileSync(dir_name + "/fe-template/dir-list/dirlist.json",dirlist);
    dir_data = dir_data.replace("replace_dir_name", dir);
    dir_data = dir_data.replace("replace_dir_path", dir_path);
    dir_data = dir_data.replace("replace_s3_bucket_name", dir);
    dir_data = dir_data.replace("replace_workspace_name", "terraform-environments_service-dev_" + dir);
    dir_data = dir_data.replace("replace_env", dir_env);
    if(!dirlist.includes("DIR_NAME")) {
      fs.appendFileSync(dir_name + "/fe-template/dir-list/dirlist.json", "[" +  dir_data + "]"); 
    } else {
      fs.appendFileSync(dir_name + "/fe-template/dir-list/dirlist.json", "," + dir_data + "]"); 
    }
    
};  

const conversionMaintf = (dir_path, project_name, domain_name
  , acl_id, build_path, env, acm_cert, route53_name, team_name, aws_env) => {
  
  let content = fs.readFileSync(dir_path + "/main.tf", 'utf8');
  content = content.replace("replaced_s3_name", project_name + "-" + env)
      .replace('tc_workspace_name', project_name + "-" + env)
      .replace(/replaced_project_name/g, project_name + "-" + env)
      .replace("replaced_repo_name", project_name)
      .replace(/replaced_env/g, aws_env)
      .replace("replaced_target_env", env)
      .replace("replaced_team_name", team_name)
      .replace(/replaced_domain_name/g, domain_name)
      .replace("replaced_acm_cert", acm_cert)
      .replace("replaced_acl_waf", acl_id)
      .replace("replaced_build_path", build_path)
      .replace("replace_zone", route53_name);
      

  return content;
};



const makeMaintf = (dir_path, project_name, domain_name, acl_id, build_path, env
  , acm_cert, route53_name, team_name, aws_env) => {

  const newContent = conversionMaintf(dir_path, project_name, domain_name, acl_id, build_path, env
    , acm_cert, route53_name, team_name, aws_env);
  fs.writeFileSync(dir_path + "/main.tf", newContent);
};



const makeTemplate = (project_name, domain_name
  , acl_id, build_path, env, acm_cert, route53_name, team_name, admin_check) => {

  var dir_path = dir_name + '/service-dev/' + project_name + '-' + env;
  console.log("생성 경로 확인")
  console.log(dir_path);


  const aws_env = conversionUtils.conversionEnv(env);


  acl_id = conversionUtils.conversionAcl(acl_id);
  acm_cert = conversionUtils.conversionAcm(acm_cert);
  

  if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path);
    console.log("디렉토리 생성 완료");
    fs.copyFileSync(dir_name + '/fe-template/provider.tf', dir_path + "/provider.tf");
    fs.copyFileSync(dir_name + '/fe-template/output.tf', dir_path + "/output.tf");
    fs.copyFileSync(dir_name + '/fe-template/main.tf', dir_path + "/main.tf");
    
    
    makeMaintf(dir_path, project_name, domain_name, acl_id, build_path, env
      , acm_cert, route53_name, team_name, aws_env);

    makeResourcefile(dir_path, project_name + "-" + env);
  

    writeDirlist(project_name + "-" + env, 'service-dev/' + project_name + '-' + env, env);

    console.log("terraform template 생성 완료");


  } else {
    console.log("해당 프로젝트가 존재합니다. 다시 입력해주세요");
  }

};



exports.makeTemplate = makeTemplate;


