import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Profile } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, profile

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  profile = await Profile.create({})
})

test('POST /profiles 201 (master)', async () => {
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

test('POST /profiles 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /profiles 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /profiles 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /profiles 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /profiles 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /profiles 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /profiles/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${profile.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(profile.id)
})

test('GET /profiles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${profile.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /profiles/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${profile.id}`)
  expect(status).toBe(401)
})

test('GET /profiles/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /profiles/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${profile.id}`)
    .send({ access_token: masterKey, name: 'test', age: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', fitnesspoints: 'test', walletaddress: 'test', currentrank: 'test', bestrank: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(profile.id)
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

test('PUT /profiles/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${profile.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /profiles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${profile.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /profiles/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${profile.id}`)
  expect(status).toBe(401)
})

test('PUT /profiles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', age: 'test', address: 'test', contactnumber: 'test', startdate: 'test', status: 'test', fitnesspoints: 'test', walletaddress: 'test', currentrank: 'test', bestrank: 'test' })
  expect(status).toBe(404)
})

test('DELETE /profiles/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${profile.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /profiles/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${profile.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /profiles/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${profile.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /profiles/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${profile.id}`)
  expect(status).toBe(401)
})

test('DELETE /profiles/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
