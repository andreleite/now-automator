import expect from 'expect'
import sinon from 'sinon'
import * as cmd from '../lib/cmd'
import { getAliases } from '../lib/aliases-info'

const cmdOutput = `

w3ItLdgE2f9npxRAdgmI   https://ns-vaxreikghp.now.sh   https://test.andre.io   10d ago

dBRyTiNWyJOK1vU3i3C7   https://andreio-gtzcblgmqr.now.sh   https://andre.io   23h ago

`

const getAliasesOutput = [
  ['w3ItLdgE2f9npxRAdgmI', 'https://ns-vaxreikghp.now.sh', 'https://test.andre.io', '10d'],
  ['dBRyTiNWyJOK1vU3i3C7', 'https://andreio-gtzcblgmqr.now.sh', 'https://andre.io', '23h']
]

describe('aliasesInfo', () => {
  describe('#getAliases', () => {
    it('should return aliases', async () => {
      sinon.stub(cmd, 'cmdExtract').returns(cmdOutput)

      expect(await getAliases()).toEqual(getAliasesOutput)
    })
  })
})
