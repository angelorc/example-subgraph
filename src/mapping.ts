import { BigInt, cosmos } from "@graphprotocol/graph-ts";
import { Fantoken } from "../generated/schema";
import { decodeMsgIssue } from "./decoding";

export function handleIssue(data: cosmos.EventData): void {
  const height = data.block.header.height;

  const denom = data.event.getAttributeValue("denom");

  let fantoken = Fantoken.load(`${height}-`)
  if (fantoken !== null) {
    fantoken.denom = denom
    fantoken.save()  
  }
}

export function handleTx(data: cosmos.TransactionData): void {
  const id = `${data.block.header.hash.toHexString()}-${data.tx.index}`;
  const messages = data.tx.tx.body.messages;

  const height = data.block.header.height


  for (let i = 0; i < messages.length; i++) {
    let msgType = messages[i].typeUrl;
    let msgValue = messages[i].value as Uint8Array;

    if (msgType == "/bitsong.fantoken.MsgIssue") {
      const msgData = decodeMsgIssue(msgValue)

      let fantoken = new Fantoken(`${height}-`)
      fantoken.symbol = msgData.symbol
      fantoken.height = BigInt.fromI64(height)
      fantoken.name = msgData.name
      fantoken.max_supply = msgData.max_supply
      fantoken.authority = msgData.authority
      fantoken.minter = msgData.minter
      fantoken.uri = msgData.uri
      fantoken.timestamp = BigInt.fromI64(data.block.header.time.seconds)
      fantoken.save()
    }
  }
}