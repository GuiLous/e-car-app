export const EXCEPTIONS_MESSAGES = {
  INVALID_CREDENTIALS: 'Credenciais inválidas!',
  IMAGE_REQUIRED: 'No mínimo umaImagem é obrigatória!',
  PRODUCT_NOT_FOUND: 'Produto não encontrado!',
  UNAUTHORIZED: 'Usuário não autorizado!',
  USER_IS_NOT_OWNER: 'Usuário não é o dono do produto!',
}

export type EXCEPTIONS_MESSAGES_KEYS_TYPE = keyof typeof EXCEPTIONS_MESSAGES

export const EXCEPTIONS_MESSAGES_KEYS = Object.keys(EXCEPTIONS_MESSAGES)
