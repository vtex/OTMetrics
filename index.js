import inquirer from 'inquirer'
import { startCollecting, getFinishedSpans } from "./OTCollector.js"
import { startProcessing } from "./OTProcessor.js"
import { startExercising } from "./OTExecutor.js"
import { dotLine, jumpOneLine, print } from './utils.js'

const { serverIsListening, hostname, port } = await startCollecting()
const startDate = Date.now()    

export function cli(args) {
    console.log(args);
}

if( serverIsListening ) {
    
    jumpOneLine()
    jumpOneLine()
    print(dotLine(4), 'OTMETRICS', dotLine(4))
    jumpOneLine()
    
    print('Um pacote NodeJs instalável e funcional para aplicações em NextJS. Que, ao ser executado, disponibiliza uma versão local da aplicação para ser exercitada e depois disso monitora o servidor da aplicação para verificar seu funcionamento, o que chega e sai dele.')
    jumpOneLine()

    print(dotLine(2), 'EXERCITANDO O PROJETO')
    jumpOneLine()

    let answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'wayToExercise',
            prefix: '•',
            message: 'Como você gostaria de exercitar o seu servidor?',
            choices: [ 'Automaticamente', 'Manualmente' ]
        }
    ])

    if(answers.wayToExercise === 'Automaticamente') {
        await startExercising()
        await startProcessing(
            getFinishedSpans(),
            startDate,
            Date.now()
        )
    }
    
    else if(answers.wayToExercise === 'Manualmente') {
        jumpOneLine()
        print(`Projeto locado em http://${hostname}:${port}`)
        print(`Acesse o projeto e caminhe entre as páginas como o uso de um usuário.`)
        jumpOneLine()

        answers = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'readyToProcess',
                prefix: '•',
                message: 'Jà Podemos te mostrar o que foi capturado?',
            }
        ])

        if(answers.readyToProcess) {
            await startProcessing(
                getFinishedSpans(),
                startDate,
                Date.now()
            )
        }

    }

    process.exit()

}