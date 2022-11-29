import { formatDistance, format } from 'date-fns'
import { ptBR } from 'date-fns/locale/index.js'
import opentelemetry from '@opentelemetry/sdk-node'

export const milliToSec = ( milliseconds ) => milliseconds / 1000

export const hrTimeToMilliseconds = ( time ) => opentelemetry.core.hrTimeToMilliseconds(time)

export const hrTimeToTimeStamp = ( time ) => new Date(opentelemetry.core.hrTimeToTimeStamp(time))

export function translateSpanKind(kind) {
    if( kind == 0 ) return 'INTERNO'
    else if( kind == 1 ) return 'SERVIDOR'
    else if( kind == 2 ) return 'CLIENTE'
    else if( kind == 3 ) return 'PRODUTOR'
    else if( kind == 4 ) return 'CONSUMIDOR'
}

export const print = console.log

export function jumpOneLine() {
    print('')
}

export function tab(number = 1) {
    return '   '.repeat(number)
}

export function arrow() {
    return ' ➜ '
}

export function line() {
    return ' - '
}

export function dot() {
    return ' ‧ '
}

export function asterisk() {
    return ' * '
}

export function close() {
    return ' ✕ '
}

export function dotLine(number = 1) {
    return '•••'.repeat(number)
}

export function showError( message = 'Aconteceu algum erro inesperado!') {
    print('✕✕✕ ERRO')
    jumpOneLine()
    print(close() + message)
    jumpOneLine()
}

export function showDate(date) {
    return format(date, 'dd/MM/yyyy HH:mm:ss')
}

export function showDuration(dateLeft, dateRight) {
    return formatDistance(dateLeft, dateRight, { includeSeconds: true, locale: ptBR })
}
