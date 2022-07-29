import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Hmprofile, { schema } from './model'

const router = new Router()
const { name, age, address, contactnumber, startdate, status, fitnesspoints, walletaddress, currentrank, bestrank } = schema.tree

/**
 * @api {post} /hmprofiles Create hmprofile
 * @apiName CreateHmprofile
 * @apiGroup Hmprofile
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Hmprofile's name.
 * @apiParam age Hmprofile's age.
 * @apiParam address Hmprofile's address.
 * @apiParam contactnumber Hmprofile's contactnumber.
 * @apiParam startdate Hmprofile's startdate.
 * @apiParam status Hmprofile's status.
 * @apiParam fitnesspoints Hmprofile's fitnesspoints.
 * @apiParam walletaddress Hmprofile's walletaddress.
 * @apiParam currentrank Hmprofile's currentrank.
 * @apiParam bestrank Hmprofile's bestrank.
 * @apiSuccess {Object} hmprofile Hmprofile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hmprofile not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, age, address, contactnumber, startdate, status, fitnesspoints, walletaddress, currentrank, bestrank }),
  create)

/**
 * @api {get} /hmprofiles Retrieve hmprofiles
 * @apiName RetrieveHmprofiles
 * @apiGroup Hmprofile
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} hmprofiles List of hmprofiles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /hmprofiles/:id Retrieve hmprofile
 * @apiName RetrieveHmprofile
 * @apiGroup Hmprofile
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} hmprofile Hmprofile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hmprofile not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /hmprofiles/:id Update hmprofile
 * @apiName UpdateHmprofile
 * @apiGroup Hmprofile
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Hmprofile's name.
 * @apiParam age Hmprofile's age.
 * @apiParam address Hmprofile's address.
 * @apiParam contactnumber Hmprofile's contactnumber.
 * @apiParam startdate Hmprofile's startdate.
 * @apiParam status Hmprofile's status.
 * @apiParam fitnesspoints Hmprofile's fitnesspoints.
 * @apiParam walletaddress Hmprofile's walletaddress.
 * @apiParam currentrank Hmprofile's currentrank.
 * @apiParam bestrank Hmprofile's bestrank.
 * @apiSuccess {Object} hmprofile Hmprofile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Hmprofile not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, age, address, contactnumber, startdate, status, fitnesspoints, walletaddress, currentrank, bestrank }),
  update)

/**
 * @api {delete} /hmprofiles/:id Delete hmprofile
 * @apiName DeleteHmprofile
 * @apiGroup Hmprofile
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Hmprofile not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
