import { Hmprofile } from '.'

let hmprofile

beforeEach(async () => {
  hmprofile = await Hmprofile.create({ name: 'test', age: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', fitnesspoints: 'test', walletaddress: 'test', currentrank: 'test', bestrank: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = hmprofile.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(hmprofile.id)
    expect(view.name).toBe(hmprofile.name)
    expect(view.age).toBe(hmprofile.age)
    expect(view.address).toBe(hmprofile.address)
    expect(view.contactnumber).toBe(hmprofile.contactnumber)
    expect(view.startdate).toBe(hmprofile.startdate)
    expect(view.status).toBe(hmprofile.status)
    expect(view.fitnesspoints).toBe(hmprofile.fitnesspoints)
    expect(view.walletaddress).toBe(hmprofile.walletaddress)
    expect(view.currentrank).toBe(hmprofile.currentrank)
    expect(view.bestrank).toBe(hmprofile.bestrank)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = hmprofile.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(hmprofile.id)
    expect(view.name).toBe(hmprofile.name)
    expect(view.age).toBe(hmprofile.age)
    expect(view.address).toBe(hmprofile.address)
    expect(view.contactnumber).toBe(hmprofile.contactnumber)
    expect(view.startdate).toBe(hmprofile.startdate)
    expect(view.status).toBe(hmprofile.status)
    expect(view.fitnesspoints).toBe(hmprofile.fitnesspoints)
    expect(view.walletaddress).toBe(hmprofile.walletaddress)
    expect(view.currentrank).toBe(hmprofile.currentrank)
    expect(view.bestrank).toBe(hmprofile.bestrank)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
