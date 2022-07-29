import { Hmtransaction } from '.'

let hmtransaction

beforeEach(async () => {
  hmtransaction = await Hmtransaction.create({ date: 'test', type: 'test', description: 'test', status: 'test', sender: 'test', receipient: 'test', hash: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = hmtransaction.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(hmtransaction.id)
    expect(view.date).toBe(hmtransaction.date)
    expect(view.type).toBe(hmtransaction.type)
    expect(view.description).toBe(hmtransaction.description)
    expect(view.status).toBe(hmtransaction.status)
    expect(view.sender).toBe(hmtransaction.sender)
    expect(view.receipient).toBe(hmtransaction.receipient)
    expect(view.hash).toBe(hmtransaction.hash)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = hmtransaction.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(hmtransaction.id)
    expect(view.date).toBe(hmtransaction.date)
    expect(view.type).toBe(hmtransaction.type)
    expect(view.description).toBe(hmtransaction.description)
    expect(view.status).toBe(hmtransaction.status)
    expect(view.sender).toBe(hmtransaction.sender)
    expect(view.receipient).toBe(hmtransaction.receipient)
    expect(view.hash).toBe(hmtransaction.hash)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
