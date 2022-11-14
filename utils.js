import opentelemetry from '@opentelemetry/sdk-node'

export const milliToSec = ( milliseconds ) => milliseconds / 1000

export const hrTimeToMilliseconds = ( time ) => new opentelemetry.core.hrTimeToMilliseconds(time)

export function translateSpanKind(kind) {
    if( kind == 0 ) return 'INTERNO'
    else if( kind == 1 ) return 'SERVIDOR'
    else if( kind == 2 ) return 'CLIENTE'
    else if( kind == 3 ) return 'PRODUTOR'
    else if( kind == 4 ) return 'CONSUMIDOR'
}

