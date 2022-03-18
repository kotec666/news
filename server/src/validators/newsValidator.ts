import { body, header, query } from 'express-validator'

class NewsValidator {
  checkCreateNews() {
    return [
      body('newsTitle')
        .notEmpty(),
      body('newsBody')
        .notEmpty(),
      body('userId')
          .notEmpty(),
      header('Authorization')
    ]
  }

  checkChangeNews() {
    return [
      body('newsTitle')
        .notEmpty(),
      body('newsBody')
        .notEmpty(),
      body('newsId')
          .notEmpty(),
      header('Authorization')
    ]
  }

  checkDeleteNews() {
    return [
      body('newsId')
        .notEmpty(),
      header('Authorization')
    ]
  }

}

export default new NewsValidator()
