import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import { router } from './routes'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

//pra acessar imagens
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

//todas as rotas vão passar por esse middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>{
    if(err instanceof Error){
        //se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () => console.log('Servidor online!'))