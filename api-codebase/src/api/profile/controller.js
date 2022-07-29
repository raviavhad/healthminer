import { success, notFound } from '../../services/response/'
import { Profile } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Profile.create(body)
    .then((profile) => profile.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Profile.find(query, select, cursor)
    .then((profiles) => profiles.map((profile) => profile.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Profile.findById(params.id)
    .then(notFound(res))
    .then((profile) => profile ? profile.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Profile.findById(params.id)
    .then(notFound(res))
    .then((profile) => profile ? Object.assign(profile, body).save() : null)
    .then((profile) => profile ? profile.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Profile.findById(params.id)
    .then(notFound(res))
    .then((profile) => profile ? profile.remove() : null)
    .then(success(res, 204))
    .catch(next)
