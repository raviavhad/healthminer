import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Goal, { schema } from './model'

const router = new Router()
const { description, estimatedachievementdate, achievementdate, status } = schema.tree

/**
 * @api {post} /goals Create goal
 * @apiName CreateGoal
 * @apiGroup Goal
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam description Goal's description.
 * @apiParam estimatedachievementdate Goal's estimatedachievementdate.
 * @apiParam achievementdate Goal's achievementdate.
 * @apiParam status Goal's status.
 * @apiSuccess {Object} goal Goal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Goal not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ description, estimatedachievementdate, achievementdate, status }),
  create)

/**
 * @api {get} /goals Retrieve goals
 * @apiName RetrieveGoals
 * @apiGroup Goal
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} goals List of goals.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /goals/:id Retrieve goal
 * @apiName RetrieveGoal
 * @apiGroup Goal
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} goal Goal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Goal not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /goals/:id Update goal
 * @apiName UpdateGoal
 * @apiGroup Goal
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam description Goal's description.
 * @apiParam estimatedachievementdate Goal's estimatedachievementdate.
 * @apiParam achievementdate Goal's achievementdate.
 * @apiParam status Goal's status.
 * @apiSuccess {Object} goal Goal's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Goal not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ description, estimatedachievementdate, achievementdate, status }),
  update)

/**
 * @api {delete} /goals/:id Delete goal
 * @apiName DeleteGoal
 * @apiGroup Goal
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Goal not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
