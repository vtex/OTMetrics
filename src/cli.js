#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const yargs = _yargs(hideBin(process.argv));

import { startOTMetrics } from './OTMain.js'
import { dotLine, jumpLine, print, errorMessage, dot, arrow, quit } from './utils/prompt.js'

yargs.usage(
    `Biblioteca capaz de executar uma aplicação NextJs e gerar um relatório do uso. 
    ${dot()}Passe o comando${arrow()}$ otmetrics [path-do-projeto-nextjs]

    Há um funcionamento automático, mas caso prefira é possível exercitar a aplicação manualmente passando a tag --manual`
).options({
    auto: {
        default: 'auto',
        alias: 'a'
    },
    manual: {
        default: 'manual',
        alias: 'm'
    }
}).describe({
    auto: 'Exercitar a aplicação de forma automática.',
    manual: 'Exercitar a aplicação de forma manual.'
}).boolean(['auto', 'manual'])
.help()
.alias('h', 'help');

jumpLine()
print(dotLine(4), 'OTMETRICS', dotLine(4))

try {

    const args = await yargs.argv

    const methodOfExercising = args.auto ? 'auto' : args.manual ? 'manual' : ''

    const pathReceived = args._[0]
    const pathWasReceived = !!pathReceived
    
    if(!pathWasReceived) {
        jumpLine()
        errorMessage('Passe um argumento com o PATH para um projeto em NextJS!')
        quit()
    }
    
    const isValidDirectory = fs.existsSync(pathReceived) && fs.lstatSync(pathReceived).isDirectory()
    
    if(!isValidDirectory) {
        jumpLine()
        errorMessage('PATH inválido para um diretório de projeto em NextJS!')
        quit()
    }
    
    const absolutePath = path.resolve(pathReceived)
    
    let isValidNextJsProject = true
    const necessaryFilesInNextJsProject = [
        '/next.config.js',
        '/node_modules/next',
        '/node_modules/@next',
        '/node_modules/react',
        '/node_modules/react-dom'
    ]
    
    for( let filePath of necessaryFilesInNextJsProject ) {
        
        let fileExists = fs.existsSync(absolutePath + filePath)

        if(!fileExists) {
            isValidNextJsProject = false
            break
        }
    }

    if(!isValidNextJsProject) {
        jumpLine()
        errorMessage('Diretório passado não é um projeto em NextJS!')
        quit()
    }

    await startOTMetrics(absolutePath)

    quit()

} catch(err) {
    jumpLine()
    errorMessage()
    print(err)
    quit()    
}