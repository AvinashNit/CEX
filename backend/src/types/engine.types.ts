

type engineCommand = 
        |"create_order"
        |"get_depth"
        |"get_orderbook"
        |"get_user_balance"
        |"cancel_order"


interface engineRequest  {
    correlationId : string ,
    engineCommand : engineCommand,
    payload?: Record<string, unknown>
    

}


interface engineResponse {
    correlationId : string,
    ok: boolean,
    response?: Record<string, unknown>,
    error?: string
}

export type { engineRequest, engineResponse, engineCommand}