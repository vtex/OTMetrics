import { startCollecting, getFinishedSpans } from './OTCollector.js'
import { startProcessing } from './OTProcessor.js'
import { startExercising } from './OTExecutor.js'
import { jumpLine, print } from './utils/prompt.js'

export async function startOTMetrics(projectPath) {
    
    jumpLine()
    print('Um pacote NodeJs instalável e funcional para aplicações em NextJS. Que, ao ser executado, disponibiliza uma versão local da aplicação para ser exercitada e depois disso monitora o servidor da aplicação para verificar seu funcionamento, o que chega e sai dele.')
    
    const serverUrl = await startCollecting(projectPath)    
    const startDate = Date.now()

    console.log(serverUrl)

    await startExercising(projectPath, serverUrl)

    const endDate = Date.now()

    await startProcessing(
        getFinishedSpans(),
        startDate,
        endDate
    )
}