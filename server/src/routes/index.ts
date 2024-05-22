import express from 'express'
import routes from './routes'

export const router = (dependencies:any) => {
    const router = express.Router()
    router.use('/',routes(dependencies))
    return router
}