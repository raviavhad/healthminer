import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Profile, { schema } from './model'

const router = new Router()
const { name, age, address, contactnumber, startdate, status, fitnesspoints, walletaddress, currentrank, bestrank } = schema.tree

/**
 * @api {post} /profiles Create profile
 * @apiName CreateProfile
 * @apiGroup Profile
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Profile's name.
 * @apiParam age Profile's age.
 * @apiParam address Profile's address.
 * @apiParam contactnumber Profile's contactnumber.
 * @apiParam startdate Profile's startdate.
 * @apiParam status Profile's status.
 * @apiParam fitnesspoints Profile's fitnesspoints.
 * @apiParam walletaddress Profile's walletaddress.
 * @apiParam currentrank Profile's currentrank.
 * @apiParam bestrank Profile's bestrank.
 * @apiSuccess {Object} profile Profile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Profile not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, age, address, contactnumber, startdate, status, fitnesspoints, walletaddress, currentrank, bestrank }),
  create)

/**
 * @api {get} /profiles Retrieve profiles
 * @apiName RetrieveProfiles
 * @apiGroup Profile
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} profiles List of profiles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /profiles/:id Retrieve profile
 * @apiName RetrieveProfile
 * @apiGroup Profile
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} profile Profile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Profile not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /profiles/:id Update profile
 * @apiName UpdateProfile
 * @apiGroup Profile
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Profile's name.
 * @apiParam age Profile's age.
 * @apiParam address Profile's address.
 * @apiParam contactnumber Profile's contactnumber.
 * @apiParam startdate Profile's startdate.
 * @apiParam status Profile's status.
 * @apiParam fitnesspoints Profile's fitnesspoints.
 * @apiParam walletaddress Profile's walletaddress.
 * @apiParam currentrank Profile's currentrank.
 * @apiParam bestrank Profile's bestrank.
 * @apiSuccess {Object} profile Profile's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Profile not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, age, address, contactnumber, startdate, status, fitnesspoints, walletaddress, currentrank, bestrank }),
  update)

/**
 * @api {delete} /profiles/:id Delete profile
 * @apiName DeleteProfile
 * @apiGroup Profile
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Profile not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
