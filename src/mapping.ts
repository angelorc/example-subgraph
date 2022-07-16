import { BigInt, cosmos } from "@graphprotocol/graph-ts";
import { Reward } from "../generated/schema";

export function handleReward(data: cosmos.EventData): void {
  const height = data.block.header.height;

  const amount = data.event.getAttributeValue("amount");
  const validator = data.event.getAttributeValue("validator");

  let reward = new Reward(`${height}-${validator}`);

  reward.height = BigInt.fromI64(height);
  reward.amount = amount;
  reward.validator = validator;
  reward.timestamp = BigInt.fromString(data.block.header.time.seconds.toString())

  reward.save();
}
