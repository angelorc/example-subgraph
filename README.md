# Cosmos Transaction Handler Example Subgraph

This example subgraph stores `Delegation` objects that represent delegations being made in the Cosmos Hub chain. In order to do that, the handler function filters all messages within the transaction and filters them in order to decode and save just the ones that represent a delegation in the chain.

By running this example subgraph, and with the following query you can retrieve all the delegations made to the [Figment](https://atomscan.com/validators/cosmosvaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfdn6m9d) validator, and the amounts of each of the delegations:

```
query FigmentDelegations($validatorAddress: String!) {
  delegations(where: {validatorAddress: $validatorAddress}) {
    validatorAddress,
    delegatorAddress,
    amount {
      amount,
      denom
    }
  }
}
```
```
{
    "validatorAddress": "cosmosvaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfdn6m9d"
}
```
For more information see the docs on https://thegraph.com/docs/.
