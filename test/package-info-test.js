import expect from 'expect'
import sinon from 'sinon'
import fs from 'fs'
import packageInfo from '../lib/package-info'

describe('packageInfo', () => {
  describe('#getProjectName()', () => {
    let sandbox

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should return the name of package', () => {
      sandbox.stub(fs, 'existsSync').returns(true)
      sandbox.stub(fs, 'readFileSync').returns(JSON.stringify({
        name: 'example'
      }))

      expect(packageInfo()).toBe('example')
    })

    it('should return "ns" when there isn\'t package.json', () => {
      sandbox.stub(fs, 'existsSync').returns(false)

      expect(packageInfo()).toBe('ns')
    })
  })
})
