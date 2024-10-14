const apiUri = process.env.NEXT_PUBLIC_PAYMENTS_API_URL;

type CreatePaymentRequest = {
    orderId: string;
    currency: string;
}

type PaymentResponse = {
    paymentId: string;
    status: string;
    redirectUrl: string;
}

export const makePayment = async (paymentRequest: CreatePaymentRequest): Promise<PaymentResponse> => {
    const response = await fetch(`${apiUri}/api/v1/payments/pay/stripe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
    });

    return await response.json();
};
