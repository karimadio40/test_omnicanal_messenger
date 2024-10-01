import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Omnical Messenger API',
            description: "API endpoints for a mini blog services documented on swagger",
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3500",
                description: "Live server"
            },
        ]
    },
    // looks for configuration in specified directories
    apis: [__dirname + "/../**/*.routes{.ts,.js}"],
}
const swaggerSpec = swaggerJsdoc(options)
export function swaggerDocs(app, port) {
    // Swagger Page

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}