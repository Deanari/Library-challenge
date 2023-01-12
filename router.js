const userController = require('./controllers/user.controller.js');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send ({
    message: 'Hello, please specify the resource you are looking for',
  }));

  // _______________________ USERS _______________________
  /**
   *  @swagger
   *  /login:
   *   post:
   *       summary: Creates user
   *       description: Use this endpoint create an user
   *       parameters:
   *          - in: body
   *            name: body
   *            required: true
   *            schema:
   *              type: JSON
   *              properties:
   *                name:
   *                  type: string
   *                email:
   *                  type: string
   *                password:
   *                  type: string
   *       responses:
   *          200: 
   *             description: User created
   */
  app.post('/api/user', userController.create);
};