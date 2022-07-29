import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Hmtransaction } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, hmtransaction

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  hmtransaction = await Hmtransaction.create({})
})

test('POST /hmtransactions 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, date: 'test', type: 'test', description: 'test', status: 'test', sender: 'test', receipient: 'test', hash: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.sender).toEqual('test')
  expect(body.receipient).toEqual('test')
  expect(body.hash).toEqual('test')
})

test('POST /hmtransactions 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /hmtransactions 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /hmtransactions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /hmtransactions 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /hmtransactions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /hmtransactions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${hmtransaction.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(hmtransaction.id)
})

test('GET /hmtransactions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${hmtransaction.id}`)
  expect(status).toBe(401)
})

test('GET /hmtransactions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /hmtransactions/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${hmtransaction.id}`)
    .send({ access_token: masterKey, date: 'test', type: 'test', description: 'test', status: 'test', sender: 'test', receipient: 'test', hash: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(hmtransaction.id)
  expect(body.date).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.sender).toEqual('test')
  expect(body.receipient).toEqual('test')
  expect(body.hash).toEqual('test')
})

test('PUT /hmtransactions/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${hmtransaction.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /hmtransactions/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${hmtransaction.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /hmtransactions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${hmtransaction.id}`)
  expect(status).toBe(401)
})

test('PUT /hmtransactions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, date: 'test', type: 'test', description: 'test', status: 'test', sender: 'test', receipient: 'test', hash: 'test' })
  expect(status).toBe(404)
})

test('DELETE /hmtransactions/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hmtransaction.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /hmtransactions/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hmtransaction.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /hmtransactions/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hmtransaction.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /hmtransactions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hmtransaction.id}`)
  expect(status).toBe(401)
})

test('DELETE /hmtransactions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
