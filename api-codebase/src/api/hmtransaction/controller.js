import { success, notFound } from '../../services/response/'
import { Hmtransaction } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Hmtransaction.create(body)
    .then((hmtransaction) => hmtransaction.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Hmtransaction.find(query, select, cursor)
    .then((hmtransactions) => hmtransactions.map((hmtransaction) => hmtransaction.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Hmtransaction.findById(params.id)
    .then(notFound(res))
    .then((hmtransaction) => hmtransaction ? hmtransaction.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Hmtransaction.findById(params.id)
    .then(notFound(res))
    .then((hmtransaction) => hmtransaction ? Object.assign(hmtransaction, body).save() : null)
    .then((hmtransaction) => hmtransaction ? hmtransaction.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Hmtransaction.findById(params.id)
    .then(notFound(res))
    .then((hmtransaction) => hmtransaction ? hmtransaction.remove() : null)
    .then(success(res, 204))
    .catch(next)
