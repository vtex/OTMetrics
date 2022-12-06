import fs from 'fs'
import { resolve } from 'path'
import { getPageContentHTML } from 'metrics-module2'
import { dotLine, jumpLine, print, error } from './utils/prompt.js'

export function startExercising(projectPath, serverUrl) {

    jumpLine()  
    print(dotLine(2), 'EXECUTANDO')
    jumpLine()
    
    print('▹ Mapeando páginas acessíveis...')
    const pages = getProjectPages(projectPath + '/pages')

    if(pages.length === 0) {
        jumpLine()
        error('Nenhuma página acessível encontrada. Não foi possível execitar o projeto')
        process.exit()
    } 
    print('▸ Páginas mapeadas!')


    jumpLine()
    print('▹ Acessando páginas...')
    
    pages.forEach(async (page) => {
        console.log(await getPageContentHTML(serverUrl + page))
    })

    print('▸ Páginas acessadas!')
}

function getProjectPages(projectPath, route = '') {
    
    let pages = []
    let completePath = projectPath + route

    let filenames = fs.readdirSync(completePath)

    filenames.forEach((filename) => {

        let file = fs.lstatSync(resolve(completePath, filename))

        if(file.isFile() && itsAFileTooSee(filename)) {

            let justName = filename.replace(/\.[^/.]+$/, "")

            if(justName === 'index') pages.push(route + '/') 
            else pages.push(route + '/' + justName)
        }
        
        else if(file.isDirectory() && itsADirectotyToSee(filename)) {
            pages = pages.concat(
                getProjectPages(projectPath, route + '/' + filename)
            )
        }
    })

    return pages
}

function itsADirectotyToSee(dirname) {
    if(dirname.toLowerCase() === 'api') return false
    else if(dirname.includes('[') && dirname.includes(']')) return false
    else if(dirname.includes(':')) return false
    
    return true
}

function itsAFileTooSee(filename) {
    if(filename.toLowerCase().includes('_app')) return false
    else if(filename.toLowerCase().includes('_document')) return false
    else if(filename.includes('[') && filename.includes(']')) return false
    else if(filename.includes(':')) return false
    
    return true
}