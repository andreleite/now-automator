import expect from 'expect'
import sinon from 'sinon'
import * as cmd from '../lib/cmd'
import { getAliases } from '../lib/aliases-info'
import aliasesStub from './stubs/aliases'

const cmdOutput = `

w3ItLdgE2f9npxRAdgmI   https://ns-vaxreikghp.now.sh   https://test.andre.io   10d ago

dBRyTiNWyJOK1vU3i3C7   https://andreio-gtzcblgmqr.now.sh   https://andre.io   23h ago

`

describe('aliasesInfo', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#getAliases', () => {
    it('should return aliases', async () => {
      sandbox.stub(cmd, 'cmdExtract').returns(cmdOutput)

      expect(await getAliases()).toEqual(aliasesStub)
    })
  })
})
