import { faker } from '@faker-js/faker'
import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from 'miragejs'

type User = {
  name: string
  email: string
  created_at: string
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    // generate mass data
    factories: {
      user: Factory.extend({
        name() {
          return faker.name.findName()
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        },
      }),
    },

    seeds(server) {
      server.createList('user', 200)
    },

    routes() {
      this.namespace = 'api'
      // delay
      this.timing = 1500

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        // this is just a metadata (not part of response body)
        const total = schema.all('user').length
        // 1) 0 - 10 > 2) 10 - 20 > 3) 20 - 30
        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        const users = this.serialize(schema.all('user'))
          .users.sort((a: User, b: User) =>
            Math.abs(
              new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )
          )
          .slice(pageStart, pageEnd)

        return new Response(200, { 'x-total-count': String(total) }, { users })
      })
      this.get('/users/:id')
      this.post('/users')

      // avoid bugs with nextjs api routes /api
      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
