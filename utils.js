export function nanoToSec(nanoseconds) {
    return nanoseconds / 1000000000
}

export function translateSpanKind(kind) {
    if( kind == 0 ) return 'INTERNO'
    else if( kind == 1 ) return 'SERVIDOR'
    else if( kind == 2 ) return 'CLIENTE'
    else if( kind == 3 ) return 'PRODUTOR'
    else if( kind == 4 ) return 'CONSUMIDOR'
}