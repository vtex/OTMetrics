import { formatDistance, format } from 'date-fns'
import { ptBR } from 'date-fns/locale/index.js'

export const print = console.log

export function jumpLine() {
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

export function errorMessage( message = 'Aconteceu algum erro inesperado!') {
    print('✕✕✕ ERRO')
    jumpLine()
    print(close() + message)
    jumpLine()
}

export function date(date) {
    return format(date, 'dd/MM/yyyy HH:mm:ss')
}

export function duration(dateLeft, dateRight) {
    return formatDistance(dateLeft, dateRight, { includeSeconds: true, locale: ptBR })
}
