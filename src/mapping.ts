import { BigInt, cosmos } from "@graphprotocol/graph-ts";
import { Fantoken } from "../generated/schema";

export function handleIssue(data: cosmos.EventData): void {
  const height = data.block.header.height;

  const denom = data.event.getAttributeValue("denom");

  let fantoken = new Fantoken(`${denom}`)
  fantoken.denom = denom
  fantoken.height = BigInt.fromI64(height);
  fantoken.timestamp = BigInt.fromString(data.block.header.time.seconds.toString())

  fantoken.save();
}
