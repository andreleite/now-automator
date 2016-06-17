import expect from 'expect'
import sinon from 'sinon'
import * as cmd from '../lib/cmd'
import { getDeployments } from '../lib/deployments-info'
import deploymentsStub from './stubs/deployments'

const cmdOutput = `

andre.io

  6AzEpySn0rDGbkCCKix9z1XF      https://andreio-cfwkmfpjou.now.sh      2m ago
  HaWD0J1QlyBDWGrxyF8AhNk7      https://andreio-kftxnnijau.now.sh      2m ago
  OJiJ4aDr7jvDXpGO3GqMQspf      https://andreio-srghztpano.now.sh      2m ago
  cbzQV6npENaF5xL16wNFCKMw      https://andreio-gtzcblgmqr.now.sh      1d ago

ns

  8faYHfp9IQPQWmHcVbjiC8jA      https://ns-zqjwbtgoqy.now.sh      10d ago
  ig4AAA2GL2X9BVqFo6opYnMp      https://ns-vaxreikghp.now.sh      10d ago

`

describe('deploymentsInfo', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#getDeployments', () => {
    it('should return deployments', async () => {
      sandbox.stub(cmd, 'cmdExtract').returns(cmdOutput)

      expect(await getDeployments('andre.io')).toEqual(deploymentsStub)
    })
  })
})
