import fs from 'fs'
import inquirer from 'inquirer'
import { accessListOfPages } from './utils/browser.js'
import { dotLine, jumpLine, print, errorMessage, quit, dot, delay, arrow, asterisk, clearLastLine, tab } from './utils/prompt.js'

let pages = []

export async function startExercising(projectPath, serverUrl, useManualExercising = false) {
    jumpLine()  
    print(dotLine(2), `EXERCÍCIO ${ useManualExercising ? 'MANUAL' : 'AUTOMATICO' }`)

    if(useManualExercising) await manualExercising(serverUrl)
    else await automaticExercising(serverUrl)
}

async function manualExercising(serverUrl) {
    jumpLine()
    print(dot() + 'No método de execução manual geramos uma url para que você possa acessar páginas da sua aplicação manualmente.')
    print(asterisk() + 'Quando desejar receber os resultados, responsa a pergunta de finalização.')

    await delay(5000)

    jumpLine()
    print(arrow() + 'URL da aplicação:', serverUrl)
    jumpLine()

    async function askIfItsOver(wait = 1) {
        await delay(10000 * wait)

        const answer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'continue',
                message: 'Finalizar execução?',
                default: 'Y'
            }
        ])

        if(answer.continue === true) return;
        
        await clearLastLine()
        await askIfItsOver(wait)
    }

    await askIfItsOver()
}

async function automaticExercising(serverUrl) {
    
    if(pages.length === 0) {
        jumpLine()
        errorMessage('Nenhuma página acessível encontrada. Não foi possível execitar o projeto!')
        quit()
    }
    
    let dynamicPages = pages.filter((page) => page.type === 'dynamic')
    
    if(dynamicPages.length > 0) {
        jumpLine()
        print(asterisk() + 'Encontrada(s)', dynamicPages.length, 'rota(s) dinâmica(s) que não será(ão) exercitada(s). Para testa-la(s) use o exercício manual!')
        dynamicPages.forEach((page) => {
            print(tab(2) + page.path)
        })
    }
    
    jumpLine()
    print('▸ Páginas mapeadas!')

    jumpLine()
    print('▹ Acessando páginas...')

    let staticPages = pages.filter((page) => page.type === 'static')
    let completeRoutes = staticPages.map((page) => serverUrl + page.path)

    await accessListOfPages(completeRoutes)
        
    print('▸ Páginas acessadas!')
}

export function getPagesFromBuild(projectPath) {

    const pathToRoutesManifest = projectPath + '/.next/routes-manifest.json'
        
    const content = fs.readFileSync(pathToRoutesManifest, { encoding: 'utf8' })
    const json = JSON.parse(content)

    if(json?.staticRoutes.length > 0) {
        pages = pages.concat(
            json.staticRoutes.map((object) => {
                return {
                    type: 'static',
                    path: object.page
                }
            })
        )
    }

    if(json?.dynamicRoutes.length > 0) {
        pages = pages.concat(
            json.dynamicRoutes.map((object) => {
                return {
                    type: 'dynamic',
                    path: object.page
                }
            })
        )
    }
}

// function getPagesWithSearching(projectPath) {
//     let pages = []
    
//     let rootPages = fs.existsSync(projectPath + '/pages')
//     let srcPages = fs.existsSync(projectPath + '/src/pages')
    
//     if(rootPages) pages = getPagesInDirectory(projectPath + '/pages')
//     else if(srcPages) pages = getPagesInDirectory(projectPath + '/src/pages')
    
//     function getPagesInDirectory(projectPath, route = '') {
//         let pages = []
//         let completePath = projectPath + route

//         let filenames = fs.readdirSync(completePath)

//         filenames.forEach((filename) => {

//             let file = fs.lstatSync(path.resolve(completePath, filename))

//             if(file.isFile() && itsAFileTooSee(filename)) {
//                 let justName = filename.replace(/\.[^/.]+$/, "")
//                 if (justName === 'index') justName = '' 

//                 pages.push({
//                     path: route + '/' + justName,
//                     type: 'static'
//                 })
//             }
            
//             else if(file.isDirectory() && itsADirectotyToSee(filename)) {
//                 pages = pages.concat(
//                     getPagesInDirectory(projectPath, route + '/' + filename)
//                 )
//             }
//         })

//         pages.forEach((page) => {
//             if(page.path.includes('[') && page.path.includes(']')) {
//                 page.type = 'dynamic'
//             }
//         })

//         return pages
//     }

//     function itsADirectotyToSee(dirname) {
//         if(dirname.toLowerCase() === 'api') return false
        
//         return true
//     }
    
//     function itsAFileTooSee(filename) {
//         if(filename.toLowerCase().includes('_app')) return false
//         else if(filename.toLowerCase().includes('_document')) return false
//         else if(!filename.includes('.js') && !filename.includes('.jsx') && !filename.includes('.ts') && !filename.includes('.tsx')) return false
        
//         return true
//     }

//     return pages
// }