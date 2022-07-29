import { Profile } from '.'

let profile

beforeEach(async () => {
  profile = await Profile.create({ name: 'test', age: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', fitnesspoints: 'test', walletaddress: 'test', currentrank: 'test', bestrank: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = profile.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(profile.id)
    expect(view.name).toBe(profile.name)
    expect(view.age).toBe(profile.age)
    expect(view.address).toBe(profile.address)
    expect(view.contactnumber).toBe(profile.contactnumber)
    expect(view.startdate).toBe(profile.startdate)
    expect(view.status).toBe(profile.status)
    expect(view.fitnesspoints).toBe(profile.fitnesspoints)
    expect(view.walletaddress).toBe(profile.walletaddress)
    expect(view.currentrank).toBe(profile.currentrank)
    expect(view.bestrank).toBe(profile.bestrank)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = profile.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(profile.id)
    expect(view.name).toBe(profile.name)
    expect(view.age).toBe(profile.age)
    expect(view.address).toBe(profile.address)
    expect(view.contactnumber).toBe(profile.contactnumber)
    expect(view.startdate).toBe(profile.startdate)
    expect(view.status).toBe(profile.status)
    expect(view.fitnesspoints).toBe(profile.fitnesspoints)
    expect(view.walletaddress).toBe(profile.walletaddress)
    expect(view.currentrank).toBe(profile.currentrank)
    expect(view.bestrank).toBe(profile.bestrank)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
