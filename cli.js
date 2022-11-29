#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { startOTMetrics } from './OTMain.js'
import { dotLine, jumpOneLine, print, showError } from './utils.js'

jumpOneLine()
print(dotLine(4), 'OTMETRICS', dotLine(4))

try {
    const pathReceived = process.argv[2]
    const pathWasReceived = !!pathReceived
    
    if(!pathWasReceived) {
        jumpOneLine()
        showError('Passe um argumento com o PATH para um projeto em NextJS!')
        process.exit()
    }
    
    const isValidDirectory = fs.existsSync(pathReceived) && fs.lstatSync(pathReceived).isDirectory()
    
    if(!isValidDirectory) {
        jumpOneLine()
        showError('PATH inválido para um diretório de projeto em NextJS!')
        process.exit()
    }
    
    const absolutePath = path.resolve(pathReceived)
    
    let isValidNextJsProject = true
    const necessaryFilesInNextJsProject = [
        '/pages',
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
        jumpOneLine()
        showError('Diretório passado não é um projeto em NextJS!')
        process.exit()
    }

    await startOTMetrics(absolutePath)

    process.exit()

} catch(error) {
    jumpOneLine()
    showError()
    print(error)
    process.exit()    
}

