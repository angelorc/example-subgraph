import { Protobuf, Reader } from "as-proto";

export function decodeMsgIssue(a: Uint8Array): MsgIssue {
  return Protobuf.decode<MsgIssue>(a, MsgIssue.decode);
}

export class MsgIssue {
  static decode(reader: Reader, length: i32): MsgIssue {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgIssue()

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbol = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.max_supply = reader.string();
          break;
        case 4:
          message.authority = reader.string();
          break;
        case 5:
          message.minter = reader.string();
          break;
        case 6:
          message.uri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }

  symbol: string;
  name: string;
  max_supply: string;
  authority: string;
  minter: string;
  uri: string;

  constructor(symbol: string = "", name: string = "", max_supply: string = "", authority: string = "", minter: string = "", uri: string = "") {
    this.symbol = symbol
    this.name = name
    this.max_supply = max_supply
    this.authority = authority
    this.minter = minter
    this.uri = uri
  }
}