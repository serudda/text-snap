/* eslint-disable @typescript-eslint/no-unused-vars */

import { ChangeScale, EmojiPosition, FormalityScale, Format, Response, TRPCErrorCode, type Params } from '../common';
import type {
  CondenseInputType,
  DispatchFormatInputType,
  EmojiInputType,
  FormalityInputType,
  GrammarInputType,
  ImproveInputType,
  TranslateInputType,
} from '../schema/ai.schema';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const dispatchFormatHandler = async ({ ctx, input }: Params<DispatchFormatInputType>) => {
  try {
    const { text, selectedFormat } = input;

    const sortedFormat = selectedFormat.slice().sort((a, b) => a.priority - b.priority);

    let formattedText = text;

    for (const format of sortedFormat) {
      switch (format.type) {
        case Format.grammar: {
          const response = await grammarHandler({ ctx, input: { text: formattedText } });
          formattedText = response?.data.result || formattedText;
          break;
        }

        case Format.improve: {
          const response = await improveHandler({
            ctx,
            input: {
              text: formattedText,
              config: {
                scale: format.config?.scale || ChangeScale.subtle,
              },
            },
          });
          formattedText = response?.data.result || formattedText;
          break;
        }

        case Format.formality: {
          const response = await formalityHandler({
            ctx,
            input: {
              text: formattedText,
              config: {
                formalityScale: format.config?.formalityScale || FormalityScale.formal,
              },
            },
          });
          formattedText = response?.data.result || formattedText;
          break;
        }

        case Format.translate: {
          const response = await translateHandler({
            ctx,
            input: {
              text: formattedText,
              config: {
                language: format.config?.language || 'English',
              },
            },
          });
          formattedText = response?.data.result || formattedText;
          break;
        }

        case Format.emoji: {
          const response = await emojiHandler({
            ctx,
            input: {
              text: formattedText,
              config: {
                position: format.config?.position || EmojiPosition.randomly,
                scale: format.config?.scale || ChangeScale.subtle,
              },
            },
          });
          formattedText = response?.data.result || formattedText;
          break;
        }

        case Format.condense: {
          const response = await condenseHandler({
            ctx,
            input: {
              text: formattedText,
              config: {
                length: format.config?.length || 280,
              },
            },
          });
          formattedText = response?.data.result || formattedText;
          break;
        }

        default:
          break;
      }
    }

    console.log('formattedText RESULT SERVER:', formattedText);

    return {
      status: Response.SUCCESS,
      data: {
        formattedText,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const grammarHandler = async ({ ctx, input }: Params<GrammarInputType>) => {
  try {
    const { text } = input;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${process.env.SUPABASE_PROJECT_ANON_KEY as string}`);

    const response = await fetch(`${process.env.SUPABASE_EDGE_FUNCTIONS_URL}/grammar`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text }),
    });

    console.log('response - (grammar)', response);
    const result = (await response.json()) as string;
    console.log('result - (grammar)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    console.log('error catch', error);

    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const improveHandler = async ({ ctx, input }: Params<ImproveInputType>) => {
  try {
    const { text, config } = input;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${process.env.SUPABASE_PROJECT_ANON_KEY as string}`);

    console.log('config - (improve)', config);

    const response = await fetch(`${process.env.SUPABASE_EDGE_FUNCTIONS_URL}/improve`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, config }),
    });

    console.log('response - (improve)', response);
    const result = (await response.json()) as string;
    console.log('result - (improve)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const formalityHandler = async ({ ctx, input }: Params<FormalityInputType>) => {
  try {
    const { text, config } = input;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${process.env.SUPABASE_PROJECT_ANON_KEY as string}`);

    console.log('config - (formality)', config);

    const response = await fetch(`${process.env.SUPABASE_EDGE_FUNCTIONS_URL}/formality`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, config }),
    });

    console.log('response - (formality)', response);
    const result = (await response.json()) as string;
    console.log('result - (formality)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const translateHandler = async ({ ctx, input }: Params<TranslateInputType>) => {
  try {
    const { text, config } = input;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${process.env.SUPABASE_PROJECT_ANON_KEY as string}`);

    const response = await fetch(`${process.env.SUPABASE_EDGE_FUNCTIONS_URL}/translate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, config }),
    });

    console.log('response - (translate)', response);
    const result = (await response.json()) as string;
    console.log('result - (translate)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const emojiHandler = async ({ ctx, input }: Params<EmojiInputType>) => {
  try {
    const { text, config } = input;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${process.env.SUPABASE_PROJECT_ANON_KEY as string}`);

    const response = await fetch(`${process.env.SUPABASE_EDGE_FUNCTIONS_URL}/emoji`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, config }),
    });

    console.log('response - (emoji)', response);
    const result = (await response.json()) as string;
    console.log('result - (emoji)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const condenseHandler = async ({ ctx, input }: Params<CondenseInputType>) => {
  try {
    const { text, config } = input;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${process.env.SUPABASE_PROJECT_ANON_KEY as string}`);

    const response = await fetch(`${process.env.SUPABASE_EDGE_FUNCTIONS_URL}/condense`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, config }),
    });

    console.log('response - (condense)', response);
    const result = (await response.json()) as string;
    console.log('result - (condense)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};
