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
          message: 'User not found!',
        });
      }

      if (bio) {
        findProduct.bio = bio;
      }

      if (name) {
        findUser.name = name;
      }

      if (tiktok) {
        findUser.tiktok = tiktok;
      }

      if (twitter) {
        findUser.twitter = twitter;
      }

      if (instagram) {
        findUser.instagram = instagram;
      }

      if (facebook) {
        findUser.facebook = facebook;
      }

      if (website) {
        findUser.website = website;
      }

      if (profile_photo) {
        findUser.profile_photo = profile_photo;
      }

      if (banner_photo) {
        findUser.banner_photo = banner_photo;
      }

      findUser.updated_at = Date.now();

      await findUser.save();

      return response.json({
        status: 1,
        message: 'User updated successfully!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_info_of_user_by_public(request: Request, response: Response) {
    try {
      const { username } = request.params;

      const user = await User.findOneBy({
        username,
        status: 1,
      });

      if (!user) {
        response.status(404);
        return response.json({
          status: 0,
          message: 'User not found.',
        });
      }

      return response.json({
        status: 1,
        data: user,
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