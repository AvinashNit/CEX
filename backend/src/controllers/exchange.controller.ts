import express from  "express";
import  { orderBodySchema } from "../types/orderbody.types";
import type { Request , Response } from "express";


export function createOrder( req: Request, res: Response )
{
    const { symbol , price, qty, side, type } = req.body;
    const orderbody = orderBodySchema.safeParse({ symbol, price, qty, side, type })
}


export function getDepth( req: Request, res: Response )
{

}


export function getBalance()
{

}


export function getOrder( req: Request, res: Response )
{

}


export function getorderBook( req: Request, res: Response)
{

}


export function cancelOrder( req: Request , res: Response)
{

}