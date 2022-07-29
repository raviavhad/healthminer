import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Hmprofile } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, hmprofile

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  hmprofile = await Hmprofile.create({})
})

test('POST /hmprofiles 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', age: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', fitnesspoints: 'test', walletaddress: 'test', currentrank: 'test', bestrank: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.contactnumber).toEqual('test')
  expect(body.startdate).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.fitnesspoints).toEqual('test')
  expect(body.walletaddress).toEqual('test')
  expect(body.currentrank).toEqual('test')
  expect(body.bestrank).toEqual('test')
})

test('POST /hmprofiles 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /hmprofiles 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /hmprofiles 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /hmprofiles 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /hmprofiles 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /hmprofiles 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /hmprofiles/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${hmprofile.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(hmprofile.id)
})

test('GET /hmprofiles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${hmprofile.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /hmprofiles/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${hmprofile.id}`)
  expect(status).toBe(401)
})

test('GET /hmprofiles/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /hmprofiles/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${hmprofile.id}`)
    .send({ access_token: masterKey, name: 'test', age: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', fitnesspoints: 'test', walletaddress: 'test', currentrank: 'test', bestrank: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(hmprofile.id)
  expect(body.name).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.contactnumber).toEqual('test')
  expect(body.startdate).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.fitnesspoints).toEqual('test')
  expect(body.walletaddress).toEqual('test')
  expect(body.currentrank).toEqual('test')
  expect(body.bestrank).toEqual('test')
})

test('PUT /hmprofiles/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${hmprofile.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /hmprofiles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${hmprofile.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /hmprofiles/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${hmprofile.id}`)
  expect(status).toBe(401)
})

test('PUT /hmprofiles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', age: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', fitnesspoints: 'test', walletaddress: 'test', currentrank: 'test', bestrank: 'test' })
  expect(status).toBe(404)
})

test('DELETE /hmprofiles/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hmprofile.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /hmprofiles/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hmprofile.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /hmprofiles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hmprofile.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /hmprofiles/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${hmprofile.id}`)
  expect(status).toBe(401)
})

test('DELETE /hmprofiles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
