import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import url from 'url'
import { simpleGit, } from 'simple-git';


const git = simpleGit();

/** Templating gh actions envrionments */
const command = (profile = 'default') => {
    git.revparse("--git-dir").then(res => {
        let targetPath = ".github/workflows"
        if (res.split("/").length != 1) {
            targetPath = path.dirname(res) + "/" + targetPath
        }
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true })
        }
        let pwd = url.fileURLToPath(path.dirname(import.meta.url))
        copyTemplate(pwd + '/templates/actions.local.template', (targetPath + "/simulation.yaml"))
        copyTemplate(pwd + '/templates/env.local.template', (targetPath + '/.local-env'))
        let sharedCredObj = new AWS.SharedIniFileCredentials({ profile: profile });
        if (sharedCredObj.accessKeyId === undefined || sharedCredObj.secretAccessKey === undefined || sharedCredObj.sessionToken === undefined) {
            console.log('wrong aws profile')
            return
        }
        fs.readFile(pwd + '/templates/secrets.local.template', (err, data) => {
            if (err === null) {
                let secrets = data.toString()
                secrets = secrets.replace('<<key>>', sharedCredObj.accessKeyId)
                secrets = secrets.replace('<<secret>>', sharedCredObj.secretAccessKey)
                secrets = secrets.replace('<<token>>', sharedCredObj.sessionToken)
                fs.writeFile(targetPath + "/.local-secrets", secrets, (err) => {
                    if (err !== null) {
                        console.log(err)
                    }
                })
            } else {
                console.log(err)
                return
            }
        })
    })
}


const copyTemplate = (src, dst) => {
    // TODO: no template file
    fs.copyFile(src, dst, (err) => {
        if (err !== null) {
            console.log(err)
            return
        }
    })
}





export default command;