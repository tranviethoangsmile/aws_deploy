import { Router } from 'express';
import usersController from '../../controllers/users.controller';

export const usersRouter = () => {
    const routers = Router();

    // Find All User
    routers.get('/user/findall',usersController.getAllUsers)

    // Get user by id
    routers.get('/user/:id', usersController.getUser)

    // Delete User
    routers.delete('/user/:id',usersController.deleteUser)
    
    return routers;
}

export default usersRouter;

