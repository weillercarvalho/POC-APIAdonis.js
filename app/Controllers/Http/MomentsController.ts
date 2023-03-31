import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Moment from 'App/Models/Moment'

export default class MomentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const { title, description } = body
    if (!title || !description) {
      return response.status(400)
    }
    try {
      const moment = await Moment.create(body)
      response.status(201)
      return {
        message: '201',
        data: moment,
      }
    } catch (error) {
      return response.status(500)
    }
  }
}
