import { isAfter, isBefore } from 'date-fns'
import { arrow, dot, hrTimeToMilliseconds, hrTimeToTimeStamp, jumpOneLine, milliToSec, print, showDate, tab } from '../utils.js'

export function getRequestsPerSecond(spans) {

    let { firstToHappen, lastToHappen, perSecond } = requestsPerSecond(spans)
    
    jumpOneLine()
    print(arrow() + 'Atividade por segundo:')
    jumpOneLine()

    let name = firstToHappen.name
    let link = firstToHappen.attributes?.['http.url'] ? '- ' + firstToHappen.attributes['http.url'] : ''
    let time = firstToHappen.startTime

    print(tab(2) + 'A primeira atividade a acontecer:')
    print(tab(3) + name, link)
    print(tab(3) + 'Início:', showDate( hrTimeToTimeStamp(time) ))
    jumpOneLine()

    name = lastToHappen.name
    link = lastToHappen.attributes?.['http.url'] ? '- ' + lastToHappen.attributes['http.url'] : ''
    time = lastToHappen.endTime

    print(tab(2) + 'A última a acontecer:')
    print(tab(3) + name, link)
    print(tab(3) + 'Fim:', showDate( hrTimeToTimeStamp(time) ))
    jumpOneLine()

    let fixedPerSecond = perSecond.toFixed(3).replace('.', ',')

    print(tab() + dot() + 'O intervalo somou uma média de', fixedPerSecond, 'atividades por segundo.')

}

function requestsPerSecond( spans ) {
    
    let firstToHappen = spans[0];
    let lastToHappen = spans[0];
    
    spans.forEach((span) => {
        if( isBefore(hrTimeToTimeStamp(span.startTime), hrTimeToTimeStamp(firstToHappen.startTime))) {
            firstToHappen = span
        }

        if( isAfter(hrTimeToTimeStamp(span.endTime), hrTimeToTimeStamp(lastToHappen.endTime))) {
            lastToHappen = span
        }
    })    
    
    let timeLapse = milliToSec(hrTimeToMilliseconds(lastToHappen.endTime)) - milliToSec(hrTimeToMilliseconds(firstToHappen.startTime))
    
    return {
        firstToHappen,
        lastToHappen,
        perSecond: timeLapse / spans.length
    }

}
