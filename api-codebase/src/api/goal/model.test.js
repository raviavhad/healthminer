import { Goal } from '.'

let goal

beforeEach(async () => {
  goal = await Goal.create({ description: 'test', estimatedachievementdate: 'test', achievementdate: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = goal.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(goal.id)
    expect(view.description).toBe(goal.description)
    expect(view.estimatedachievementdate).toBe(goal.estimatedachievementdate)
    expect(view.achievementdate).toBe(goal.achievementdate)
    expect(view.status).toBe(goal.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = goal.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(goal.id)
    expect(view.description).toBe(goal.description)
    expect(view.estimatedachievementdate).toBe(goal.estimatedachievementdate)
    expect(view.achievementdate).toBe(goal.achievementdate)
    expect(view.status).toBe(goal.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
