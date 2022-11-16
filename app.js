import commander from 'commander';


import * as gh from './gh-actions/app.js';
import * as fe from './terraform/fe/app.js'
// const version = require('./package.json').version;
//TODO : update
//TODO : tag list


const program = new commander.Command();
program.
    command('gh-actions')
    .option('-p, --profile <profile>', 'aws profile to use')
    .action((ctx) => {
        gh.default((ctx.profile))
    })

program
    .command('create')
    .description('create terraform template')
    .action(() => {
        fe.create();
    });

program.parse(process.argv);
// program
//     .version(version)
//     .command('create')
//     .description('create terraform template')
//     .action(() => {
//         inquirerUtils.createInquirer();
//     });


// program
//     .command('delete')
//     .description('delete terraform template')8
//     .action(() => {
//         inquirerUtils.deleteInquirer();
//     });


// program
//     .command('update')
//     .description('update terraform template')
//     .action(() => {
//         inquirerUtils.updateInquirer();
//     });


// program
//     .command('confirm')
//     .description('confirm terraform template')
//     .action(() => {
//         inquirerUtils.confirmInquirer();
//     });


// program.parse(process.argv);