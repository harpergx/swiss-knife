import inquirer from 'inquirer';
import * as questions from './constants/questions.js';
import * as options from './constants/lists.js';
import * as validator from './helper/validator.js'
import * as creator from './worker/creator.js'
import * as terminator from './worker/terminator.js'
import * as confirmor from './worker/confirmer.js';
import * as updater from './worker/updater.js'


const create = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'project_name',
      message: questions.create[0],
      default: 'klip-test',
    }, {
      type: 'input',
      name: 'domain_name',
      message: questions.create[1],
      default: 'test.dev.klipwallet.com',
    }, {
      type: 'list',
      name: 'acl_id',
      message: questions.create[2],
      choices: ['klip', 'drops', 'kas', 'multichain'],
    }, {
      type: 'input',
      name: 'build_path',
      message: questions.create[3],
      default: 'dist',
    }, {
      type: 'input',
      name: 'env',
      message: questions.create[4],
      default: 'dev',
    }, {
      type: 'list',
      name: 'acm_cert',
      message: questions.create[5],
      choices: options.acm,
    }, {
      type: 'list',
      name: 'route53_name',
      message: questions.create[6],
      choices: options.route53,
    }, {
      type: 'input',
      name: 'team_name',
      message: questions.create[7],
      default: 'klip-dev',
    }, {
      type: 'confirm',
      name: 'admin_check',
      message: questions.create[8],
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: '생성하시겠습니까?',
    }])
    .then((answers) => {
      if (validator.verifyPath()) {
        if (validator.verifyName(answers.project_name)) {
          if (validator.isNull(answers.project_name
            , answers.domain_name, answers.acl_id, answers.build_path, answers.env
            , answers.acm_cert, answers.route53_name, answers.team_name)) {

            if (validator.verifyEnv(answers.env)) {
              if (answers.confirm) {
                creator.makeTemplate(answers.project_name
                  , answers.domain_name, answers.acl_id, answers.build_path, answers.env
                  , answers.acm_cert, answers.route53_name, answers.team_name, answers.admin_check);
                console.log('작업 완료하였습니다.');
              }
            } else {
              console.log("env 형식이 일치하지 않습니다");
            }


          } else {
            console.log('빈 값이 있습니다. 값을 다시 입력해주세요');
          }
        }
      }
    });
};


const terminate = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'repo_name',
      message: questions.terminate[0],
      default: 'klip-test',
    },
    {
      type: 'input',
      name: 'env',
      message: questions.terminate[1],
      default: 'dev',
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: '삭제하시겠습니까?',
    }])
    .then((answers) => {
      terminator.deleteTemplate(answers.repo_name, answers.env);
    });
};


const confirm = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'repo_name',
      message: questions.confirm[0],
      default: 'klip-test',
    },
    {
      type: 'input',
      name: 'env',
      message: questions.confirm[1],
      default: 'dev',
    }])
    .then((answers) => {
      confirmor.confirmTemplate(answers.repo_name, answers.env);
    });
};



const update = () => {
  const dname = updater.checkUpdateTarget();
  if (dname) {
    inquirer.prompt([
      {
        type: 'list',
        name: 'target_name',
        message: questions.update[0],
        choices: dname,
      }])
      .then((answers) => {
        console.log("아직 해당 기능을 제공하지 않습니다");
        //updateTargetInquirer(answers.target_name);
      });
  }
};

// const updateTarget = (target_name) => {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'domain_name',
//       message: constants.creationQuestions[1],
//       default: 'test.dev.klipwallet.com',
//     }, {
//       type: 'list',
//       name: 'acl_id',
//       message: constants.creationQuestions[2],
//       choices: ['klip', 'drops', 'kas', 'multichain'],
//     }, {
//       type: 'input',
//       name: 'build_path',
//       message: constants.creationQuestions[3],
//       default: 'dist',
//     }, {
//       type: 'list',
//       name: 'acm_cert',
//       message: constants.creationQuestions[5],
//       choices: constants.acmlist,
//     }, {
//       type: 'list',
//       name: 'route53_name',
//       message: constants.creationQuestions[6],
//       choices: constants.route53list,
//     }, {
//       type: 'input',
//       name: 'team_name',
//       message: constants.creationQuestions[7],
//       default: 'klip-dev',
//     }, {
//       type: 'confirm',
//       name: 'admin_check',
//       message: constants.creationQuestions[8],
//     },
//     {
//       type: 'confirm',
//       name: 'confirm',
//       message: '업데이트 하시겠습니까?',
//     }])
//     .then((answers) => {
//       updateUtils.updateTemplate();

//     });
// };


export { create, terminate, update, confirm }
