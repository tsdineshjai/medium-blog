## This is a clone app of medium blogging site
### An user can register, create a post, update a post and retrieve all the posts.

#### Tech Stack used for backend

 - Cloudfare Worker as serverless backend
 - Hono webframework, typically used for edge networks
 - Prisma ORM, for querying into PostgreSql database
 - Zod for Schema Declaration and validation
 - Jsonwebtoken for authorization of Users

#### Tech Stack used for frontend

 - React 19 
 - Tailwind
 - @tsdjai/common-app, a npm package to share zod types between frontend and backend 
 - TypeScript
