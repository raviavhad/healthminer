import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Goal } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, goal

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  goal = await Goal.create({})
})

test('POST /goals 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, description: 'test', estimatedachievementdate: 'test', achievementdate: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.description).toEqual('test')
  expect(body.estimatedachievementdate).toEqual('test')
  expect(body.achievementdate).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /goals 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /goals 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /goals 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /goals 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /goals 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /goals 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /goals/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${goal.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(goal.id)
})

test('GET /goals/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${goal.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /goals/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${goal.id}`)
  expect(status).toBe(401)
})

test('GET /goals/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /goals/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${goal.id}`)
    .send({ access_token: masterKey, description: 'test', estimatedachievementdate: 'test', achievementdate: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(goal.id)
  expect(body.description).toEqual('test')
  expect(body.estimatedachievementdate).toEqual('test')
  expect(body.achievementdate).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /goals/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${goal.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /goals/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${goal.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /goals/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${goal.id}`)
  expect(status).toBe(401)
})

test('PUT /goals/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, description: 'test', estimatedachievementdate: 'test', achievementdate: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /goals/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${goal.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /goals/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${goal.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /goals/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${goal.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /goals/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${goal.id}`)
  expect(status).toBe(401)
})

test('DELETE /goals/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
