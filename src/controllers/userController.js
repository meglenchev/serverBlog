import { Router } from "express";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

export const userController = Router();

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);

        res.send(token)

    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).send({
            error: errorMessage,
        });
    }
});

userController.post('/register', async (req, res) => {
    const { email, password, rePassword } = req.body;

    try {
        const token = await userService.register(email, password, rePassword);

        res.send(token)
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).send({
            error: errorMessage,
        });
    }
})

userController.post('/logout', (req, res) => {
    res.send('Logout');
});