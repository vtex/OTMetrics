import fs from 'fs'
import { resolve } from 'path'
import { dotLine, jumpOneLine, print, showError } from './utils'

export function startExercising(projectPath) {

    jumpOneLine()  
    print(dotLine(2), 'EXECUTANDO')
    jumpOneLine()
    
    print('▹ Mapeando página acessíveis...')
    const pages = getProjectPages(projectPath + '/pages')

    if(pages.length === 0) {
        jumpOneLine()
        showError('Nenhuma página acessível encontrada. Não foi possível execitar o projeto')
        process.exit()
    }

    print('▸ Tudo OK!')
}

function getProjectPages(projectPath, route = '') {
    
    let pages = []
    let completePath = projectPath + route

    let filenames = fs.readdirSync(completePath)

    filenames.forEach((filename) => {
        let file = fs.lstatSync(resolve(completePath, filename))
        
        if(file.isFile() && itsAFileTooSee(filename)) {
            pages.push(route + '/' + filename)
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