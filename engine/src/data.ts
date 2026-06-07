

type AssetBalance = {
    available: number,
    locked: number,
}

class BALANCE  {
    private balance : Map<string, Map<string, AssetBalance>> ;
    constructor()
    {
        this.balance = new Map();

    }

    getBalance(userId: string, asset: string = "USD"): AssetBalance {
        let userBalance = this.balance.get(userId);
    
        if (!userBalance) {
            userBalance = new Map();
    
            this.balance.set(userId, userBalance);
        }
    
        let balance = userBalance.get(asset);
    
        if (!balance) {
            balance = {
                available: 0,
                locked: 0,
            };
    
            userBalance.set(asset, balance);
        }
    
        return balance;
    }
    
    updateBalance(userId: string, assetAmount: number): AssetBalance {
        const balance = this.getBalance(userId, "USD");
    
        balance.available += assetAmount;
    
        this.balance.get(userId)?.set("USD", balance);
    
        return balance;
    
}

}
const balance = new BALANCE();
export { balance }


interface individualOrder  {
    userId: string,
    orderId: number,
    price: number,
    qty: number,
    
}

class ORDER{
    private orderBook : Map< string , {
        bids: {userId:string, orderId: number, qty: number, price: number}[],
        asks: {userId:string, orderId: number, qty: number, price: number}[],
    }> 
    constructor()
    {
        this.orderBook = new Map();
    }
    

    putOnOrderBook(symbol: string, price: number, qty: number, userId: string, orderId: number, side:"BUY"| "SELL")
    {
        if( side === "BUY"){
            this.orderBook.get(symbol)?.bids.push({userId, orderId, qty, price});
            this.orderBook.get(symbol)?.bids.sort((a,b)=> a.price - b.price);
        }
        else{
            this.orderBook.get(symbol)?.asks.push({userId, orderId, qty, price});
            this.orderBook.get(symbol)?.asks.sort((a,b)=> b.price - a.price);
        }
    }

    matchLimitOrder( tempOrder : individualOrder , side:"BUY" | "SELL" , symbol:string){
        
        let filled : undefined | {filled: number, total: number};
            let orders = this.orderBook.get(symbol);
            if(!orders){
                this.orderBook.set(symbol, {
                    bids: [],
                    asks: [],
                })
                this.putOnOrderBook( symbol, tempOrder.price, tempOrder.qty, tempOrder.userId, tempOrder.orderId, side);
                return {filled: 0 , total: 0};
            }
            if( side=== "BUY" && orders.asks )
            {
                 filled = this.buyLimitOrder(tempOrder.price, tempOrder.qty, orders.asks );
                 this.putOnOrderBook(symbol, tempOrder.price, tempOrder.qty - filled.filled , tempOrder.userId, tempOrder.orderId, side)
                 return filled;
            }
            filled = this.sellLimitOrder(tempOrder.price, tempOrder.qty, orders.bids);
            this.putOnOrderBook(symbol,tempOrder.price, tempOrder.qty- filled.filled, tempOrder.userId, tempOrder.orderId, side );
            return filled;
    
    }

   

    buyLimitOrder(price: number , qty: number, asks:individualOrder[])
    {
        let remaining = qty;
        let total = 0;
        //  asks is sorted in decreasing orderBook
        for( let i = asks.length -1 ; i >= 0 && remaining > 0 ; i--)
        {
            if( price < asks[i]!.price)
                break;
            if( remaining >= asks[i]!.qty)
            {
                total += asks[i]!.qty * asks[i]!.price;
                remaining -= asks[i]!.qty;
                asks.splice(i,1);
                

            }
            else{

                total += remaining * asks[i]!.price;
                asks[i]!.qty -= remaining;
                remaining = 0;
            }
        }
        return {filled: qty - remaining , total};
    }


    sellLimitOrder(price: number, qty: number, bids : individualOrder[])
    {
        let remaining = qty;
        let total = 0;
        // bids ares sorted in increasing order
        for( let  i = bids.length -1 ; i >= 0 && remaining > 0 ; i-- )
        {
            if( price > bids[i]!.price)
                break;

            if( remaining > bids[i]!.qty)
            {
                total += bids[i]!.qty * bids[i]!.price;
                remaining -= bids[i]!.qty;
                bids.splice(i,1);
            }
            else{

                total += remaining * bids[i]!.price;
                bids[i]!.qty -= remaining;
                remaining = 0;
            }
            
        }
        return { filled: qty - remaining , total };
    }
    matchMarketOrder(payload: individualOrder, side: "BUY" | "SELL", symbol: string){}


    getDepth(symbol: string)
    {
        const rawOrderBook = this.orderBook.get(symbol);
        if(!rawOrderBook)
            return { bids: [], asks: []};
        const bids = rawOrderBook.bids.slice(0,10).map((a)=> ({price: a.price, qty: a.qty}));
        const asks = rawOrderBook.asks.slice(-10).map((a)=> ({price: a.price, qty: a.qty}));
        return {bids, asks};

    }
    getOrderBook(symbol: string)
    {
        const rawOrderBook =  this.orderBook.get(symbol);
        if(!rawOrderBook)
            return { bids: [], asks: []};
        return rawOrderBook

    }
    cancelOrder( orderId: number, symbol: string)
    {
        const { asks , bids } = this.orderBook.get(symbol)!;
        for( let i = 0 ;i < asks.length ; i++ )
        {
            if(asks[i]?.orderId === orderId)
                asks.splice(i,1);
        }
        for( let i = 0 ;i< bids.length ;i++  )
        {
            if(bids[i]?.orderId === orderId)
                bids.splice(i,1)
        }
        return {orderId, status:"cancelled"}
    }
}


const orderBook =  new ORDER();

export { orderBook };