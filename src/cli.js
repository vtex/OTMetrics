#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { startOTMetrics } from './OTMain.js'
import { dotLine, jumpLine, print, errorMessage } from './utils/prompt.js'

jumpLine()
print(dotLine(4), 'OTMETRICS', dotLine(4))

try {
    const pathReceived = process.argv[2]
    const pathWasReceived = !!pathReceived
    
    if(!pathWasReceived) {
        jumpLine()
        errorMessage('Passe um argumento com o PATH para um projeto em NextJS!')
        process.exit()
    }
    
    const isValidDirectory = fs.existsSync(pathReceived) && fs.lstatSync(pathReceived).isDirectory()
    
    if(!isValidDirectory) {
        jumpLine()
        errorMessage('PATH inválido para um diretório de projeto em NextJS!')
        process.exit()
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
        process.exit()
    }

    await startOTMetrics(absolutePath)

    process.exit()

} catch(err) {
    jumpLine()
    errorMessage()
    print(err)
    process.exit()    
}

