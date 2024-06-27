import { Product } from 'Database/entities/product';
import { ic } from 'azle';
import { Response, Request } from 'express';

export default class ProductsController {
  static async search(request: Request, response: Response) {
    try {
      const product = await Product.findOneBy({
        id: parseInt(ic.caller().toText()),
      });

      if (!product) {
        response.status(404);
        return response.json({
          status: 0,
          message: 'Product not found.',
        });
      }

      return response.json({
        status: 1,
        data: product,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async register(request: Request, response: Response) {
    const { name, price } = request.body;

    const productData: Partial<Product> = {
      name,
      price,
    };

    try {
      const isUserExists = await Product.findOne({
        where: [{ name }],
      });

      if (isUserExists) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Product name already taken.',
        });
      }

      await Product.save(productData);

      return response.json({
        status: 1,
        message: 'Registration success!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async edit(request: Request, response: Response) {
    const { name, price } = request.body;

    try {
      const findProduct = await Product.findOneBy({ id: parseInt(ic.caller().toText()) });

      if (!findProduct) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Product not found!',
        });
      }

      if (name) {
        findProduct.name = name;
      }

      if (price) {
        findProduct.price = price;
      }

      await findProduct.save();

      return response.json({
        status: 1,
        message: 'Product updated successfully!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

}