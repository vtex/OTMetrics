import { startCollecting, getFinishedSpans } from "./OTCollector.js"
import { startProcessing } from "./OTProcessor.js"
import { startExercising } from "./OTExecutor.js"
import { dotLine, jumpOneLine, print } from './utils.js'

export async function startOTMetrics(projectPath) {
    
    jumpOneLine()
    print('Um pacote NodeJs instalável e funcional para aplicações em NextJS. Que, ao ser executado, disponibiliza uma versão local da aplicação para ser exercitada e depois disso monitora o servidor da aplicação para verificar seu funcionamento, o que chega e sai dele.')
    jumpOneLine()
    
    print(dotLine(2), 'INICIANDO')
    jumpOneLine()

    print('▹ Construindo projeto e iniciando coleta...')
    const { serverIsListening } = await startCollecting(projectPath)    
    const startDate = Date.now()
    print('▸ Tudo OK!')
    jumpOneLine()

    if(!serverIsListening) {
        jumpOneLine()
        showError('Por algum motivo o servidor não foi inicializado!')
        process.exit()
    }

    await startExercising(projectPath)
    
    const endDate = Date.now()

    await startProcessing(
        getFinishedSpans(),
        startDate,
        endDate
    )
    
}
