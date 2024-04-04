import express from 'express'
import postRoutes from './postRoutes'

export const routes = (dependencies:any) => {
    const routes = express.Router()
    routes.use('/post',postRoutes(dependencies))
    return routes
}