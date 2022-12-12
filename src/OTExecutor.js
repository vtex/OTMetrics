import fs from 'fs'
import { resolve } from 'path'
import { accessListOfPages } from './utils/browser.js'
import { dotLine, jumpLine, print, errorMessage, quit } from './utils/prompt.js'

export async function startExercising(projectPath, serverUrl) {

    jumpLine()  
    print(dotLine(2), 'EXECUTANDO')
    jumpLine()
    
    print('▹ Mapeando páginas acessíveis...')
    
    let rootPages = fs.existsSync(projectPath + '/pages')
    let srcPages = fs.existsSync(projectPath + '/src/pages')
    
    let pages = []
    if(rootPages) pages = getProjectPages(projectPath + '/pages')
    else if(srcPages) pages = getProjectPages(projectPath + '/src/pages')

    if(pages.length === 0) {
        jumpLine()
        errorMessage('Nenhuma página acessível encontrada. Não foi possível execitar o projeto!')
        quit()
    }

    print('▸ Páginas mapeadas!')

    jumpLine()
    print('▹ Acessando páginas...')

    await accessListOfPages(
        pages.map((page) => serverUrl + page)
    )

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
    
    return true
}

function itsAFileTooSee(filename) {
    if(filename.toLowerCase().includes('_app')) return false
    else if(filename.toLowerCase().includes('_document')) return false
    else if(filename.includes('[') && filename.includes(']')) return false
    else if(!filename.includes('.js') && !filename.includes('.jsx') && !filename.includes('.ts') && !filename.includes('.tsx')) return false
    return true
}