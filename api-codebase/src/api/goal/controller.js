import { success, notFound } from '../../services/response/'
import { Goal } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Goal.create(body)
    .then((goal) => goal.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Goal.find(query, select, cursor)
    .then((goals) => goals.map((goal) => goal.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Goal.findById(params.id)
    .then(notFound(res))
    .then((goal) => goal ? goal.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Goal.findById(params.id)
    .then(notFound(res))
    .then((goal) => goal ? Object.assign(goal, body).save() : null)
    .then((goal) => goal ? goal.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Goal.findById(params.id)
    .then(notFound(res))
    .then((goal) => goal ? goal.remove() : null)
    .then(success(res, 204))
    .catch(next)
