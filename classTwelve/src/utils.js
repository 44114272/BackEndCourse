import { fileURLToPath } from "url";
import { dirname } from "path";
import {PRIVATE_KEY} from './config/constants.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { faker } from '@faker-js/faker/locale/es'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createHash = password => 
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => 
    bcrypt.compareSync(password, user.password);

const generateToken = user => {
    const token = jwt.sign({ user }, PRIVATE_KEY , {expiresIn: '24h'});
    return token;
}

const authToken = (request, response, next) => {
    const authHeader = request.header.authorization;
    if (!authHeader) {
      return response
        .status(401)
        .send({ status: `error`, error: `No autenticado` });
    }
  
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.jwtPrivate, (error, credentials) => {
      if (error)
        return response
          .status(403)
          .send({ status: `error`, error: `Wrong Header Token` });
      request.user = credentials.user;
      next();
    });
};

const generateProduct = () => {
    let numberOfImages = parseInt(faker.random.numeric(1, { bannedDigits: ['0'] }));
    let images = [];
    for (let i = 0; i < numberOfImages; i++) {
      images.push(faker.image.url());
    }

    return { 
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price() ,
      thumbnails: images,
      code: faker.random.alphaNumeric(6),
      stock: faker.random.numeric(2), 
      category: faker.commerce.productAdjective(),
      status: faker.datatype.boolean()
    }
}

export {
    __dirname, 
    createHash, 
    isValidPassword, 
    generateToken, authToken, 
    generateProduct
};