export const successResponse = (message: string, data: any) => {
  return {
    message,
    data,
    success: true,
  };
};

export const errorResponse = (errors: string[]) => {
  return {
    errors,
    data: null,
    success: false,
  };
};
