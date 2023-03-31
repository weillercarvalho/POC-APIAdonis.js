import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'

export default class MomentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const { title, description, image } = body
    if (!title || !description || !image) {
      return response.status(400)
    }
    try {
      const moment = await Moment.create(body)
      response.status(201)
      return {
        message: '201',
        id: moment.id,
      }
    } catch (error) {
      return response.status(500)
    }
  }
  public async index() {
    const moments = await Moment.all()
    return {
      data: moments,
    }
  }
  public async show({ params, response }: HttpContextContract) {
    try {
      const moment = await Moment.findOrFail(params.id)
      return {
        data: moment,
      }
    } catch (error) {
      return response.status(500)
    }
  }
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const deleteMoment = await Moment.findOrFail(params.id)
      await deleteMoment.delete()
      return {
        message: 'Deleted',
      }
    } catch (error) {
      return response.status(500)
    }
  }
  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()
    if (!body) {
      return response.status(404)
    }
    try {
      const moment = await Moment.findOrFail(params.id)
      moment.merge(body)
      await moment.save()
      return {
        status: '200',
        message: 'updated',
      }
    } catch (error) {
      return response.status(500)
    }
  }
}
