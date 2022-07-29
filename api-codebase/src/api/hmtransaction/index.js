import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Hmtransaction, { schema } from './model'

const router = new Router()
const { date, type, description, status, sender, receipient, hash } = schema.tree

/**
 * @api {post} /hmtransactions Create hmtransaction
 * @apiName CreateHmtransaction
 * @apiGroup Hmtransaction
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam date Hmtransaction's date.
 * @apiParam type Hmtransaction's type.
 * @apiParam description Hmtransaction's description.
 * @apiParam status Hmtransaction's status.
 * @apiParam sender Hmtransaction's sender.
 * @apiParam receipient Hmtransaction's receipient.
 * @apiParam hash Hmtransaction's hash.
 * @apiSuccess {Object} hmtransaction Hmtransaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hmtransaction not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ date, type, description, status, sender, receipient, hash }),
  create)

/**
 * @api {get} /hmtransactions Retrieve hmtransactions
 * @apiName RetrieveHmtransactions
 * @apiGroup Hmtransaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} hmtransactions List of hmtransactions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /hmtransactions/:id Retrieve hmtransaction
 * @apiName RetrieveHmtransaction
 * @apiGroup Hmtransaction
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} hmtransaction Hmtransaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hmtransaction not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /hmtransactions/:id Update hmtransaction
 * @apiName UpdateHmtransaction
 * @apiGroup Hmtransaction
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam date Hmtransaction's date.
 * @apiParam type Hmtransaction's type.
 * @apiParam description Hmtransaction's description.
 * @apiParam status Hmtransaction's status.
 * @apiParam sender Hmtransaction's sender.
 * @apiParam receipient Hmtransaction's receipient.
 * @apiParam hash Hmtransaction's hash.
 * @apiSuccess {Object} hmtransaction Hmtransaction's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hmtransaction not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ date, type, description, status, sender, receipient, hash }),
  update)

/**
 * @api {delete} /hmtransactions/:id Delete hmtransaction
 * @apiName DeleteHmtransaction
 * @apiGroup Hmtransaction
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Hmtransaction not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
