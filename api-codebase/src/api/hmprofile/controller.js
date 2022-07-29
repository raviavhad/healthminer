import { success, notFound } from '../../services/response/'
import { Hmprofile } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Hmprofile.create(body)
    .then((hmprofile) => hmprofile.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Hmprofile.find(query, select, cursor)
    .then((hmprofiles) => hmprofiles.map((hmprofile) => hmprofile.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Hmprofile.findById(params.id)
    .then(notFound(res))
    .then((hmprofile) => hmprofile ? hmprofile.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Hmprofile.findById(params.id)
    .then(notFound(res))
    .then((hmprofile) => hmprofile ? Object.assign(hmprofile, body).save() : null)
    .then((hmprofile) => hmprofile ? hmprofile.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Hmprofile.findById(params.id)
    .then(notFound(res))
    .then((hmprofile) => hmprofile ? hmprofile.remove() : null)
    .then(success(res, 204))
    .catch(next)
